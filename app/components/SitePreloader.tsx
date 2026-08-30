"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type PreloaderPhase = "running" | "exiting" | "hidden";

const MIN_EXIT_AT_MS = 2550;
const MAX_EXIT_AT_MS = 3080;
const EXIT_DURATION_MS = 920;
const REDUCED_EXIT_AT_MS = 140;
const REDUCED_REMOVE_AT_MS = 460;

function waitForDelay(delay: number, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    if (delay <= 0 || signal.aborted) {
      resolve();
      return;
    }

    const timer = window.setTimeout(resolve, delay);
    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        resolve();
      },
      { once: true }
    );
  });
}

async function waitForPrimaryMedia(signal: AbortSignal) {
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  if (signal.aborted) return;

  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>(
      ".legend-media__layer.is-active img, .legend-logo"
    )
  );

  await Promise.all(
    images.map(async (image) => {
      if (!image.complete) {
        await new Promise<void>((resolve) => {
          const finish = () => resolve();
          image.addEventListener("load", finish, { once: true, signal });
          image.addEventListener("error", finish, { once: true, signal });
          signal.addEventListener("abort", finish, { once: true });
        });
      }

      if (signal.aborted || typeof image.decode !== "function") return;
      await image.decode().catch(() => undefined);
    })
  );
}

export default function SitePreloader() {
  const [phase, setPhase] = useState<PreloaderPhase>("running");

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const controller = new AbortController();
    let removeTimer = 0;
    const siteReveal = document.querySelector<HTMLElement>(".site-reveal");

    siteReveal?.setAttribute("inert", "");
    siteReveal?.setAttribute("aria-hidden", "true");

    document.documentElement.classList.add("is-site-preloading");

    const revealSite = () => {
      siteReveal?.removeAttribute("inert");
      siteReveal?.removeAttribute("aria-hidden");
    };

    const beginExit = () => {
      if (controller.signal.aborted) return;
      document.documentElement.classList.add("is-site-revealing");
      setPhase("exiting");

      removeTimer = window.setTimeout(() => {
        revealSite();
        setPhase("hidden");
        document.documentElement.classList.remove("is-site-preloading");
        document.documentElement.classList.remove("is-site-revealing");
      }, reducedMotion ? REDUCED_REMOVE_AT_MS - REDUCED_EXIT_AT_MS : EXIT_DURATION_MS);
    };

    if (reducedMotion) {
      void waitForDelay(REDUCED_EXIT_AT_MS, controller.signal).then(beginExit);
    } else {
      const navigationElapsed = performance.now();
      const minimumDelay = Math.max(0, MIN_EXIT_AT_MS - navigationElapsed);
      const maximumDelay = Math.max(0, MAX_EXIT_AT_MS - navigationElapsed);
      const contentReady = Promise.race([
        waitForPrimaryMedia(controller.signal),
        waitForDelay(maximumDelay, controller.signal),
      ]);

      void Promise.all([
        waitForDelay(minimumDelay, controller.signal),
        contentReady,
      ]).then(beginExit);
    }

    return () => {
      controller.abort();
      window.clearTimeout(removeTimer);
      revealSite();
      document.documentElement.classList.remove("is-site-preloading");
      document.documentElement.classList.remove("is-site-revealing");
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`site-preloader ${
        phase === "exiting" ? "is-exiting" : ""
      }`}
      role="main"
      aria-live="polite"
      aria-label="Inicializando o Arquivo de Lendas"
    >
      <div className="site-preloader__noise" aria-hidden="true" />
      <div className="site-preloader__scan" aria-hidden="true" />

      <div className="site-preloader__frame" aria-hidden="true">
        <span>APX // SYS.01</span>
        <span>WORLD&apos;S EDGE // ONLINE</span>
      </div>

      <div className="site-preloader__stage" aria-hidden="true">
        <div className="site-preloader__mark-shell">
          <svg
            className="site-preloader__mark"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              className="site-preloader__mark-ghost"
              points="24 20.039 32.714 35.303 26.75 35.303 37.08 42.391 42.5 38.013 24 5.609 5.5 38.013 10.92 42.391 21.25 35.303 15.286 35.303 24 20.039"
            />
            <polygon
              className="site-preloader__mark-draw"
              points="24 20.039 32.714 35.303 26.75 35.303 37.08 42.391 42.5 38.013 24 5.609 5.5 38.013 10.92 42.391 21.25 35.303 15.286 35.303 24 20.039"
            />
            <polygon
              className="site-preloader__mark-fill"
              points="24 20.039 32.714 35.303 26.75 35.303 37.08 42.391 42.5 38.013 24 5.609 5.5 38.013 10.92 42.391 21.25 35.303 15.286 35.303 24 20.039"
            />
          </svg>

          <span className="site-preloader__mark-echo site-preloader__mark-echo--red" />
          <span className="site-preloader__mark-echo site-preloader__mark-echo--white" />
        </div>

        <div className="site-preloader__wordmark">
          <Image
            src="/apex_legends-logo-freelogovectors.net_.svg"
            alt=""
            width={270}
            height={200}
            priority
          />
        </div>

        <div className="site-preloader__fractures">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="site-preloader__status">
          <span>Inicializando arquivo</span>
          <span className="site-preloader__status-line" />
          <strong>01</strong>
        </div>
      </div>

      <div className="site-preloader__impact" aria-hidden="true" />
      <div className="site-preloader__split site-preloader__split--left" aria-hidden="true" />
      <div className="site-preloader__split site-preloader__split--right" aria-hidden="true" />
    </div>
  );
}
