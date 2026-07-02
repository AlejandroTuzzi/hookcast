import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/hookcast-horizontal.png";
import portrait from "@/public/brand/alejandro-tuzzi.jpg";
import characterSheet from "@/public/resources/ficha-personaje-ugc.png";

export const metadata: Metadata = {
  title: "Recursos para crear tu avatar UGC",
  description:
    "Descarga gratis la guía de Alejandro Tuzzi con prompts y una ficha de personaje para crear avatares UGC consistentes.",
  alternates: { canonical: "/regalo-ugc" },
  openGraph: {
    title: "Tu kit para crear avatares UGC | HookCast",
    description: "Prompts, método y ficha de personaje. Un regalo de Alejandro Tuzzi para continuar después de la charla.",
    images: [{ url: "/resources/ficha-personaje-ugc.png", width: 1720, height: 920 }],
  },
};

const guideUrl = "/downloads/kit-avatar-ugc-alejandro-tuzzi.pdf";

export default function UGCResourcePage() {
  return (
    <main className="gift-page">
      <header className="gift-header">
        <Link href="/" aria-label="Ir a HookCast Studio">
          <Image src={logo} alt="HookCast" priority />
        </Link>
        <a href={guideUrl} download className="gift-header-link">Descargar el kit <span>↓</span></a>
      </header>

      <section className="gift-hero">
        <div className="gift-hero-copy">
          <p className="gift-kicker"><span /> Gracias por escuchar mi charla</p>
          <h1>Ahora crea un avatar que la gente <em>quiera mirar.</em></h1>
          <p className="gift-lead">
            Soy Alejandro Tuzzi. Preparé este kit para que lo que vimos hoy no se quede en una buena idea:
            llévatelo, pruébalo y crea tu primer personaje consistente.
          </p>
          <div className="gift-actions">
            <a className="button button-primary" href={guideUrl} download>Descargar recursos <span>↓</span></a>
            <a className="gift-text-link" href="#contenido">Ver qué incluye</a>
          </div>
          <p className="gift-no-form">Gratis · PDF en español · Sin dejar tu email</p>
        </div>

        <figure className="gift-portrait">
          <Image src={portrait} alt="Alejandro Tuzzi" priority sizes="(max-width: 820px) 100vw, 40vw" />
          <figcaption><span>Alejandro Tuzzi</span><strong>Filmmaker + Creative Technologist</strong></figcaption>
        </figure>
      </section>

      <section className="gift-definition">
        <p className="section-label">Un repaso rápido</p>
        <div>
          <h2>¿Qué es un avatar UGC?</h2>
          <p>
            Es un personaje digital diseñado para comunicar como un creador real: mira a cámara, cuenta una
            experiencia y presenta un producto con el lenguaje directo del contenido generado por usuarios.
          </p>
          <p>
            La diferencia no está solo en generar una cara bonita. Está en mantener su identidad, dirigir una
            interpretación creíble y conservar esas pequeñas imperfecciones que hacen humana una pieza.
          </p>
        </div>
      </section>

      <section className="gift-kit" id="contenido">
        <div className="gift-kit-copy">
          <p className="section-label">Tu regalo</p>
          <h2>Un punto de partida. <span>Listo para usar.</span></h2>
          <p>
            El PDF reúne un flujo simple, prompts editables y una ficha visual para fijar la identidad del
            personaje antes de empezar a generar escenas.
          </p>
          <ol className="gift-list">
            <li><span>01</span><div><strong>Prompts reutilizables</strong><p>Para identidad, guion, encuadres, interpretación y variaciones.</p></div></li>
            <li><span>02</span><div><strong>Ficha de personaje</strong><p>Frente, espalda y primer plano en una única referencia visual.</p></div></li>
            <li><span>03</span><div><strong>Checklist de consistencia</strong><p>Qué fijar y qué revisar antes de dar una pieza por terminada.</p></div></li>
          </ol>
          <a className="button button-primary" href={guideUrl} download>Quiero el kit <span>↓</span></a>
        </div>

        <figure className="gift-sheet">
          <Image src={characterSheet} alt="Ficha de personaje UGC con vista frontal, trasera y primer plano" sizes="(max-width: 900px) 100vw, 56vw" />
          <a className="gift-sheet-download" href="/resources/ficha-personaje-ugc.png" download>Descargar ficha PNG <span>↓</span></a>
          <figcaption><span>Ejemplo incluido</span><strong>Ficha de consistencia / 3 vistas</strong></figcaption>
        </figure>
      </section>

      <section className="gift-next">
        <p className="section-label">Cuando quieras ir más lejos</p>
        <h2>La IA genera.<br /><em>Nosotros dirigimos.</em></h2>
        <p>
          En HookCast creamos anuncios UGC con avatares hiperrealistas para marcas. Guion, personaje,
          interpretación y refinamiento, hechos a medida para que el resultado no parezca generado deprisa.
        </p>
        <div className="gift-next-actions">
          <Link className="button button-primary" href="/start-a-project">Solicitar un proyecto <span>↗</span></Link>
          <Link className="button button-ghost" href="/">Conocer HookCast</Link>
        </div>
      </section>

      <section className="gift-socials">
        <div className="gift-socials-heading">
          <p className="section-label">Sigamos conectados</p>
          <h2>Ideas, procesos<br />y experimentos.</h2>
        </div>
        <nav className="gift-social-grid" aria-label="Redes sociales de Alejandro Tuzzi">
          <a href="https://www.instagram.com/alejandrotuzzi" target="_blank" rel="noreferrer">
            <span className="gift-social-number">01</span>
            <div><strong>Instagram</strong><small>@alejandrotuzzi</small></div>
            <span className="gift-social-arrow">↗</span>
          </a>
          <a href="https://www.linkedin.com/in/alejandrotuzzi/" target="_blank" rel="noreferrer">
            <span className="gift-social-number">02</span>
            <div><strong>LinkedIn</strong><small>/in/alejandrotuzzi</small></div>
            <span className="gift-social-arrow">↗</span>
          </a>
          <a href="https://tuzzi.ai" target="_blank" rel="noreferrer">
            <span className="gift-social-number">03</span>
            <div><strong>Tuzzi.ai</strong><small>Mi trabajo y exploraciones</small></div>
            <span className="gift-social-arrow">↗</span>
          </a>
        </nav>
      </section>

      <footer className="gift-footer">
        <span>© {new Date().getFullYear()} HookCast Studio</span>
        <a href="mailto:alejandro@hookcast.studio">alejandro@hookcast.studio</a>
      </footer>
    </main>
  );
}
