"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import "./archive-motion.css";

const archiveMotionPosters = {
  axle: {
    backdrop: "/motion/axle-overclocked-keyart.webp",
    portrait: "/motion/axle-heat-sync-transparent.png",
    primary: "236 72 153",
    secondary: "192 132 252",
    position: "50% 50%",
    backdropPosition: "46% 50%",
    mobileBackdropPosition: "43% 50%",
    telemetry: ["REDLINE // 03", "NITRO // OPEN"],
  },
  ballistic: {
    backdrop: "/motion/ballistic-cinematic.webp",
    portrait: "/motion/ballistic-portrait.webp",
    primary: "214 173 98",
    secondary: "80 196 220",
    position: "58% 50%",
    backdropPosition: "32% 50%",
    mobileBackdropPosition: "36% 50%",
    telemetry: ["ARMS // 04", "TEMPEST // READY"],
  },
  catalyst: {
    backdrop: "/motion/catalyst-cinematic.webp",
    portrait: "/motion/catalyst-portrait.webp",
    primary: "168 85 247",
    secondary: "34 211 238",
    position: "54% 50%",
    backdropPosition: "64% 50%",
    mobileBackdropPosition: "68% 50%",
    telemetry: ["FERRO // 07", "BARRIER // FORMED"],
  },
  caustic: {
    backdrop: "/motion/caustic-art.webp",
    portrait: "/motion/caustic-portrait.webp",
    primary: "183 213 42",
    secondary: "237 255 152",
    position: "53% 50%",
    backdropPosition: "30% 50%",
    mobileBackdropPosition: "25% 50%",
    telemetry: ["NOX // 08", "TOXIN // ARMED"],
  },
  conduit: {
    backdrop: "/motion/conduit-art.webp",
    portrait: "/motion/conduit-portrait.webp",
    primary: "34 211 238",
    secondary: "250 204 21",
    position: "50% 50%",
    backdropPosition: "55% 50%",
    mobileBackdropPosition: "55% 50%",
    telemetry: ["RAD // 09", "SHIELD // LINKED"],
  },
  crypto: {
    backdrop: "/motion/crypto-art.webp",
    portrait: "/motion/crypto-portrait.webp",
    primary: "87 227 137",
    secondary: "250 204 21",
    position: "51% 50%",
    backdropPosition: "50% 50%",
    mobileBackdropPosition: "52% 50%",
    telemetry: ["DRONE // 10", "NETWORK // EXPOSED"],
  },
  fuse: {
    backdrop: "/motion/fuse-art.webp",
    portrait: "/motion/fuse-portrait.webp",
    primary: "255 122 24",
    secondary: "255 214 102",
    position: "52% 50%",
    backdropPosition: "70% 50%",
    mobileBackdropPosition: "73% 50%",
    telemetry: ["SALVO // 11", "ORDNANCE // LIVE"],
  },
  gibraltar: {
    backdrop: "/motion/gibraltar-art.webp",
    portrait: "/motion/gibraltar-portrait-clean.webp",
    primary: "245 158 11",
    secondary: "56 189 248",
    position: "58% 42%",
    backdropPosition: "48% 50%",
    mobileBackdropPosition: "52% 50%",
    telemetry: ["SARAS // 12", "DOME // SECURE"],
  },
  horizon: {
    backdrop: "/motion/horizon-art.webp",
    portrait: "/motion/horizon-portrait-v2.webp",
    primary: "34 211 238",
    secondary: "248 113 113",
    position: "50% 45%",
    backdropPosition: "48% 45%",
    mobileBackdropPosition: "48% 50%",
    telemetry: ["BRANTHIUM // 13", "GRAVITY // LIFT"],
  },
  lifeline: {
    backdrop: "/motion/lifeline-art.jpg",
    portrait: "/motion/lifeline-portrait-clean.webp",
    primary: "56 189 248",
    secondary: "250 204 21",
    position: "50% 48%",
    backdropPosition: "60% 50%",
    mobileBackdropPosition: "45% 50%",
    telemetry: ["D.O.C. // 14", "HALO // READY"],
  },
  loba: {
    backdrop: "/motion/loba-art.jpg",
    portrait: "/motion/loba-portrait-clean.webp",
    primary: "225 29 72",
    secondary: "251 191 36",
    position: "50% 46%",
    backdropPosition: "72% 50%",
    mobileBackdropPosition: "70% 50%",
    telemetry: ["JUMP // 15", "MARKET // OPEN"],
  },
  "mad-maggie": {
    backdrop: "/motion/mad-maggie-art.jpg",
    portrait: "/motion/mad-maggie-portrait.webp",
    primary: "228 255 39",
    secondary: "239 68 68",
    position: "50% 45%",
    backdropPosition: "68% 50%",
    mobileBackdropPosition: "70% 50%",
    telemetry: ["SALVO // 16", "RIOT // ARMED"],
  },
  mirage: {
    backdrop: "/motion/mirage-art.webp",
    portrait: "/motion/mirage-portrait-v2.webp",
    primary: "250 204 21",
    secondary: "74 222 128",
    position: "50% 46%",
    backdropPosition: "65% 50%",
    mobileBackdropPosition: "70% 50%",
    telemetry: ["HOLO // 17", "DECOY // LIVE"],
  },
  newcastle: {
    backdrop: "/motion/newcastle-art.webp",
    portrait: "/motion/newcastle-portrait.webp",
    primary: "245 158 11",
    secondary: "56 189 248",
    position: "50% 46%",
    backdropPosition: "64% 50%",
    mobileBackdropPosition: "70% 50%",
    telemetry: ["CASTLE // 18", "WALL // SECURE"],
  },
  octane: {
    backdrop: "/motion/octane-art.webp",
    portrait: "/motion/octane-portrait.webp",
    primary: "163 230 53",
    secondary: "249 115 22",
    position: "50% 46%",
    backdropPosition: "68% 50%",
    mobileBackdropPosition: "72% 50%",
    telemetry: ["STIM // 19", "VELOCITY // PEAK"],
  },
  pathfinder: {
    backdrop: "/motion/pathfinder-art.webp",
    portrait: "/motion/pathfinder-portrait.webp",
    primary: "56 189 248",
    secondary: "250 204 21",
    position: "50% 46%",
    backdropPosition: "66% 50%",
    mobileBackdropPosition: "72% 50%",
    telemetry: ["MRVN // 20", "ZIPLINE // READY"],
  },
  rampart: {
    backdrop: "/motion/rampart-art.webp",
    portrait: "/motion/rampart-portrait.webp",
    primary: "59 130 246",
    secondary: "239 68 68",
    position: "50% 46%",
    backdropPosition: "66% 50%",
    mobileBackdropPosition: "72% 50%",
    telemetry: ["MOD // 21", "SHEILA // LIVE"],
  },
  revenant: {
    backdrop: "/motion/revenant-art.webp",
    portrait: "/motion/revenant-portrait.webp",
    primary: "220 38 38",
    secondary: "249 115 22",
    position: "50% 46%",
    backdropPosition: "69% 50%",
    mobileBackdropPosition: "73% 50%",
    telemetry: ["DEATH // 22", "SHADOW // FORGED"],
  },
  seer: {
    backdrop: "/motion/seer-art.webp",
    portrait: "/motion/seer-portrait.webp",
    primary: "56 189 248",
    secondary: "212 175 55",
    position: "50% 46%",
    backdropPosition: "70% 50%",
    mobileBackdropPosition: "74% 50%",
    telemetry: ["HEART // 23", "EXHIBIT // ACTIVE"],
  },
  sparrow: {
    backdrop: "/motion/sparrow-art.webp",
    portrait: "/motion/sparrow-portrait.webp",
    primary: "239 68 68",
    secondary: "56 189 248",
    position: "50% 46%",
    backdropPosition: "69% 50%",
    mobileBackdropPosition: "73% 50%",
    telemetry: ["BOLT // 24", "TRACKER // LOCKED"],
  },
  valkyrie: {
    backdrop: "/motion/valkyrie-art.webp",
    portrait: "/motion/valkyrie-portrait.webp",
    primary: "249 115 22",
    secondary: "56 189 248",
    position: "50% 46%",
    backdropPosition: "69% 50%",
    mobileBackdropPosition: "73% 50%",
    telemetry: ["VIPER // 25", "VTOL // READY"],
  },
  vantage: {
    backdrop: "/motion/vantage-art.webp",
    portrait: "/motion/vantage-portrait.webp",
    primary: "239 68 68",
    secondary: "56 189 248",
    position: "50% 46%",
    backdropPosition: "72% 50%",
    mobileBackdropPosition: "76% 50%",
    telemetry: ["SCOPE // 26", "ECHO // LOCKED"],
  },
  wattson: {
    backdrop: "/motion/wattson-art.webp",
    portrait: "/motion/wattson-portrait.webp",
    primary: "56 189 248",
    secondary: "249 115 22",
    position: "50% 46%",
    backdropPosition: "72% 50%",
    mobileBackdropPosition: "76% 50%",
    telemetry: ["ARC // 27", "PYLON // ACTIVE"],
  },
  wraith: {
    backdrop: "/motion/wraith-art.webp",
    portrait: "/motion/wraith-portrait.webp",
    primary: "139 92 246",
    secondary: "56 189 248",
    position: "50% 46%",
    backdropPosition: "72% 50%",
    mobileBackdropPosition: "76% 50%",
    telemetry: ["PHASE // 28", "VOID // LISTENING"],
  },
} as const;

export type ArchiveMotionSlug = keyof typeof archiveMotionPosters;

export default function ArchiveMotionPoster({
  slug,
}: {
  slug: ArchiveMotionSlug;
}) {
  const poster = archiveMotionPosters[slug];

  return (
    <div
      className={`archive-motion archive-motion--${slug}`}
      aria-hidden="true"
      style={
        {
          "--motion-primary": poster.primary,
          "--motion-secondary": poster.secondary,
          "--motion-position": poster.position,
          "--motion-backdrop-position": poster.backdropPosition,
          "--motion-backdrop-mobile-position": poster.mobileBackdropPosition,
        } as CSSProperties
      }
    >
      <div className="archive-motion__backdrop">
        <Image src={poster.backdrop} alt="" fill sizes="100vw" />
      </div>

      <div className="archive-motion__wash" />
      <div className="archive-motion__rings">
        <span />
        <span />
        <span />
      </div>

      <div className="archive-motion__echo">
        <Image
          src={poster.portrait}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) min(82vw, 1080px), min(73vw, 1200px)"
        />
      </div>

      <div className="archive-motion__portrait">
        <Image
          src={poster.portrait}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) min(82vw, 1080px), min(73vw, 1200px)"
        />
      </div>

      <div className="archive-motion__scan" />
      <div className="archive-motion__particles" />
      <div className="archive-motion__reticle">
        <span />
      </div>

      <div className="archive-motion__telemetry">
        <span>{poster.telemetry[0]}</span>
        <span>{poster.telemetry[1]}</span>
      </div>
    </div>
  );
}
