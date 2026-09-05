"use client";

import Image from "next/image";
import "./late-special-motion.css";

function BangaloreMotionPoster({ isActive }: { isActive: boolean }) {
  return (
    <div className="bangalore-motion" aria-hidden="true">
      <div className="bangalore-motion__backdrop">
        <Image
          src="/motion/bangalore-keyart.jpg"
          alt=""
          fill
          loading={isActive ? "eager" : "lazy"}
          sizes="100vw"
        />
      </div>

      <div className="bangalore-motion__heat" />
      <div className="bangalore-motion__smoke bangalore-motion__smoke--rear" />

      <div className="bangalore-motion__portrait">
        <div className="legend-wraith-asset">
          <Image
            src="/motion/bangalore-portrait-v2.webp"
            alt=""
            fill
            quality={90}
            loading={isActive ? "eager" : "lazy"}
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) min(82vw, 1080px), min(73vw, 1200px)"
          />
        </div>
      </div>

      <div className="bangalore-motion__echo">
        <div className="legend-wraith-asset">
          <Image
            src="/motion/bangalore-portrait-v2.webp"
            alt=""
            fill
            quality={90}
            loading={isActive ? "eager" : "lazy"}
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) min(82vw, 1080px), min(73vw, 1200px)"
          />
        </div>
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

function BloodhoundMotionPoster({ isActive }: { isActive: boolean }) {
  return (
    <div className="bloodhound-motion" aria-hidden="true">
      <div className="bloodhound-motion__backdrop">
        <Image
          src="/motion/bloodhound-keyart.jpg"
          alt=""
          fill
          loading={isActive ? "eager" : "lazy"}
          sizes="100vw"
        />
      </div>

      <div className="bloodhound-motion__haze" />
      <div className="bloodhound-motion__pulse" />

      <div className="bloodhound-motion__portrait">
        <div className="legend-wraith-asset">
          <Image
            src="/motion/bloodhound-portrait-v3.webp"
            alt=""
            fill
            quality={90}
            loading={isActive ? "eager" : "lazy"}
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) min(82vw, 1080px), min(73vw, 1200px)"
          />
        </div>
      </div>

      <div className="bloodhound-motion__echo">
        <div className="legend-wraith-asset">
          <Image
            src="/motion/bloodhound-portrait-v3.webp"
            alt=""
            fill
            quality={90}
            loading={isActive ? "eager" : "lazy"}
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) min(82vw, 1080px), min(73vw, 1200px)"
          />
        </div>
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
  isActive,
}: {
  name: "Bangalore" | "Bloodhound";
  isActive: boolean;
}) {
  return name === "Bangalore"
    ? <BangaloreMotionPoster isActive={isActive} />
    : <BloodhoundMotionPoster isActive={isActive} />;
}

