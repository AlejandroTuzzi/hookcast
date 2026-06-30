#!/usr/bin/env bash
set -Eeuo pipefail

cd "$(dirname "$0")"

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Error: the server checkout has local changes. Deployment stopped."
  exit 1
fi

echo "==> Pulling HookCast from GitHub..."
git pull --ff-only

echo "==> Building the production image..."
docker compose -f docker-compose.prod.yml build --pull

echo "==> Starting HookCast..."
docker compose -f docker-compose.prod.yml up -d --remove-orphans

echo "==> Waiting for the healthcheck..."
for attempt in $(seq 1 30); do
  if curl --fail --silent http://127.0.0.1:3011/api/health >/dev/null; then
    echo "HookCast is healthy."
    docker image prune -f >/dev/null 2>&1 || true
    docker compose -f docker-compose.prod.yml ps
    exit 0
  fi
  sleep 2
done

echo "Error: HookCast did not become healthy in time."
docker compose -f docker-compose.prod.yml logs --tail=100 app
exit 1
