import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";

const dataDirectory = process.env.HOOKCAST_DATA_DIR ?? path.join(process.cwd(), "data");
const adminPath = path.join(dataDirectory, "admin.json");
const cookieName = "hookcast_admin";
const sessionLifetime = 60 * 60 * 12;

type AdminRecord = {
  passwordHash: string;
  sessionSecret: string;
};

async function readAdmin(): Promise<AdminRecord | null> {
  try {
    return JSON.parse(await fs.readFile(adminPath, "utf8")) as AdminRecord;
  } catch {
    return null;
  }
}

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function passwordMatches(password: string, stored: string) {
  const [salt, expectedHex] = stored.split(":");
  if (!salt || !expectedHex) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export async function hasAdmin() {
  return Boolean(await readAdmin());
}

export async function createAdmin(password: string) {
  if (await readAdmin()) throw new Error("An administrator already exists.");
  const record: AdminRecord = {
    passwordHash: hashPassword(password),
    sessionSecret: randomBytes(32).toString("hex"),
  };
  await fs.mkdir(path.dirname(adminPath), { recursive: true });
  await fs.writeFile(adminPath, `${JSON.stringify(record, null, 2)}\n`, {
    encoding: "utf8",
    mode: 0o600,
  });
}

export async function verifyPassword(password: string) {
  const admin = await readAdmin();
  return Boolean(admin && passwordMatches(password, admin.passwordHash));
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const admin = await readAdmin();
  if (!admin || !passwordMatches(currentPassword, admin.passwordHash)) return false;
  admin.passwordHash = hashPassword(newPassword);
  admin.sessionSecret = randomBytes(32).toString("hex");
  await fs.writeFile(adminPath, `${JSON.stringify(admin, null, 2)}\n`, "utf8");
  return true;
}

export async function createSession() {
  const admin = await readAdmin();
  if (!admin) throw new Error("Administrator not configured.");
  const expires = Math.floor(Date.now() / 1000) + sessionLifetime;
  const payload = String(expires);
  const token = `${payload}.${sign(payload, admin.sessionSecret)}`;
  const store = await cookies();
  store.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionLifetime,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(cookieName);
}

export async function isAuthenticated() {
  const admin = await readAdmin();
  if (!admin) return false;
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now() / 1000) return false;
  const expected = sign(expires, admin.sessionSecret);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}
