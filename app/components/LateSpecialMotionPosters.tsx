"use client";

import Image from "next/image";
import "./late-special-motion.css";

function BangaloreMotionPoster() {
  return (
    <div className="bangalore-motion" aria-hidden="true">
      <div className="bangalore-motion__backdrop">
        <Image
          src="/motion/bangalore-keyart.jpg"
          alt=""
          fill
          sizes="100vw"
        />
      </div>

      <div className="bangalore-motion__heat" />
      <div className="bangalore-motion__smoke bangalore-motion__smoke--rear" />

      <div className="bangalore-motion__portrait">
        <Image
          src="/motion/bangalore-portrait.jpg"
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, min(61vw, 1010px)"
        />
      </div>

      <div className="bangalore-motion__echo">
        <Image
          src="/motion/bangalore-portrait.jpg"
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, min(61vw, 1010px)"
        />
      </div>

      <div className="bangalore-motion__smoke bangalore-motion__smoke--front" />
      <div className="bangalore-motion__tracers">
        <span />
        <span />
        <span />
      </div>
      <div className="bangalore-motion__flash" />

      <div className="bangalore-motion__target">
        <span />
      </div>

      <div className="bangalore-motion__telemetry">
        <span>IMC // 05</span>
        <span>SMOKE DEPLOYED</span>
      </div>
    </div>
  );
}

function BloodhoundMotionPoster() {
  return (
    <div className="bloodhound-motion" aria-hidden="true">
      <div className="bloodhound-motion__backdrop">
        <Image
          src="/motion/bloodhound-keyart.jpg"
          alt=""
          fill
          sizes="100vw"
        />
      </div>

      <div className="bloodhound-motion__haze" />
      <div className="bloodhound-motion__pulse" />

      <div className="bloodhound-motion__portrait">
        <Image
          src="/motion/bloodhound-portrait.jpg"
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, min(63vw, 1040px)"
        />
      </div>

      <div className="bloodhound-motion__echo">
        <Image
          src="/motion/bloodhound-portrait.jpg"
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, min(63vw, 1040px)"
        />
      </div>

      <div className="bloodhound-motion__eyes">
        <span />
        <span />
      </div>

      <div className="bloodhound-motion__ravens">
        <span />
        <span />
        <span />
      </div>

      <div className="bloodhound-motion__particles" />

      <div className="bloodhound-motion__sigil">
        <span />
      </div>

      <div className="bloodhound-motion__telemetry">
        <span>HUNT // 06</span>
        <span>ALLFATHER // SCAN</span>
      </div>
    </div>
  );
}

export default function LateSpecialMotionPoster({
  name,
}: {
  name: "Bangalore" | "Bloodhound";
}) {
  return name === "Bangalore"
    ? <BangaloreMotionPoster />
    : <BloodhoundMotionPoster />;
}

