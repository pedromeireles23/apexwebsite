"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { ArchiveMotionSlug } from "./ArchiveMotionPoster";

const legends = [
  {
    name: "Alter",
    role: "Combate",
    code: "01 / VOID",
    image: "/legends/alter.svg",
    classIcon: "/classes/skirmisher.svg",
    accent: "#d946ef",
  },
  {
    name: "Ash",
    role: "Combate",
    code: "02 / SIM",
    image: "/legends/ash.svg",
    classIcon: "/classes/skirmisher.svg",
    accent: "#ef4444",
  },
  {
    name: "Axle",
    role: "Combate",
    code: "03 / REDLINE",
    image: "/motion/axle-heat-sync-transparent.png",
    classIcon: "/classes/skirmisher.svg",
    accent: "#ec4899",
  },
  {
    name: "Ballistic",
    role: "Assalto",
    code: "04 / ARMS",
    image: "/motion/ballistic-portrait.webp",
    classIcon: "/classes/assault.svg",
    accent: "#d6ad62",
  },
  {
    name: "Bangalore",
    role: "Assalto",
    code: "05 / IMC",
    image: "/legends/bangalore.svg",
    classIcon: "/classes/assault.svg",
    accent: "#f97316",
  },
  {
    name: "Bloodhound",
    role: "Batedor",
    code: "06 / HUNT",
    image: "/legends/bloodhound.svg",
    classIcon: "/classes/recon.svg",
    accent: "#dc2626",
  },
  {
    name: "Catalyst",
    role: "Controle",
    code: "07 / FERRO",
    image: "/motion/catalyst-portrait.webp",
    classIcon: "/classes/controller.svg",
    accent: "#a855f7",
  },
  {
    name: "Caustic",
    role: "Controle",
    code: "08 / NOX",
    image: "/motion/caustic-portrait.webp",
    classIcon: "/classes/controller.svg",
    accent: "#b7d52a",
  },
  {
    name: "Conduit",
    role: "Suporte",
    code: "09 / RAD",
    image: "/motion/conduit-portrait.webp",
    classIcon: "/classes/support.svg",
    accent: "#22d3ee",
  },
  {
    name: "Crypto",
    role: "Batedor",
    code: "10 / DRONE",
    image: "/motion/crypto-portrait.webp",
    classIcon: "/classes/recon.svg",
    accent: "#57e389",
  },
  {
    name: "Fuse",
    role: "Assalto",
    code: "11 / SALVO",
    image: "/motion/fuse-portrait.webp",
    classIcon: "/classes/assault.svg",
    accent: "#ff7a18",
  },
  {
    name: "Gibraltar",
    role: "Suporte",
    code: "12 / SARAS",
    image: "/motion/gibraltar-portrait-clean.webp",
    classIcon: "/classes/support.svg",
    accent: "#f59e0b",
  },
  {
    name: "Horizon",
    role: "Combate",
    code: "13 / GRAV",
    image: "/motion/horizon-portrait-v2.webp",
    classIcon: "/classes/skirmisher.svg",
    accent: "#22d3ee",
  },
  {
    name: "Lifeline",
    role: "Suporte",
    code: "14 / D.O.C.",
    image: "/motion/lifeline-portrait-clean.webp",
    classIcon: "/classes/support.svg",
    accent: "#38bdf8",
  },
  {
    name: "Loba",
    role: "Suporte",
    code: "15 / JUMP",
    image: "/motion/loba-portrait-clean.webp",
    classIcon: "/classes/support.svg",
    accent: "#e11d48",
  },
  {
    name: "Mad Maggie",
    role: "Assalto",
    code: "16 / SALVO",
    image: "/motion/mad-maggie-portrait.webp",
    classIcon: "/classes/assault.svg",
    accent: "#e4ff27",
  },
  {
    name: "Mirage",
    role: "Suporte",
    code: "17 / HOLO",
    image: "/motion/mirage-portrait-v2.webp",
    classIcon: "/classes/support.svg",
    accent: "#facc15",
  },
  {
    name: "Newcastle",
    role: "Suporte",
    code: "18 / CASTLE",
    image: "/motion/newcastle-portrait.webp",
    classIcon: "/classes/support.svg",
    accent: "#f59e0b",
  },
  {
    name: "Octane",
    role: "Combate",
    code: "19 / STIM",
    image: "/motion/octane-portrait.webp",
    classIcon: "/classes/skirmisher.svg",
    accent: "#a3e635",
  },
  {
    name: "Pathfinder",
    role: "Combate",
    code: "20 / MRVN",
    image: "/motion/pathfinder-portrait.webp",
    classIcon: "/classes/skirmisher.svg",
    accent: "#38bdf8",
  },
  {
    name: "Rampart",
    role: "Controle",
    code: "21 / MOD",
    image: "/motion/rampart-portrait.webp",
    classIcon: "/classes/controller.svg",
    accent: "#3b82f6",
  },
  {
    name: "Revenant",
    role: "Combate",
    code: "22 / DEATH",
    image: "/motion/revenant-portrait.webp",
    classIcon: "/classes/skirmisher.svg",
    accent: "#dc2626",
  },
  {
    name: "Seer",
    role: "Batedor",
    code: "23 / HEART",
    image: "/motion/seer-portrait.webp",
    classIcon: "/classes/recon.svg",
    accent: "#38bdf8",
  },
  {
    name: "Sparrow",
    role: "Batedor",
    code: "24 / BOLT",
    image: "/motion/sparrow-portrait.webp",
    classIcon: "/classes/recon.svg",
    accent: "#ef4444",
  },
  {
    name: "Valkyrie",
    role: "Batedor",
    code: "25 / VIPER",
    image: "/motion/valkyrie-portrait.webp",
    classIcon: "/classes/recon.svg",
    accent: "#f97316",
  },
  {
    name: "Vantage",
    role: "Batedor",
    code: "26 / SCOPE",
    image: "/motion/vantage-portrait.webp",
    classIcon: "/classes/recon.svg",
    accent: "#ef4444",
  },
  {
    name: "Wattson",
    role: "Controle",
    code: "27 / ARC",
    image: "/motion/wattson-portrait.webp",
    classIcon: "/classes/controller.svg",
    accent: "#38bdf8",
  },
  {
    name: "Wraith",
    role: "Combate",
    code: "28 / PHASE",
    image: "/motion/wraith-portrait.webp",
    classIcon: "/classes/skirmisher.svg",
    accent: "#8b5cf6",
  },
] as const;

const detailPaths: Partial<Record<(typeof legends)[number]["name"], string>> = {
  Alter: "/lendas/alter",
  Ash: "/lendas/ash",
  Axle: "/lendas/axle",
  Ballistic: "/lendas/ballistic",
  Bangalore: "/lendas/bangalore",
  Bloodhound: "/lendas/bloodhound",
  Catalyst: "/lendas/catalyst",
  Caustic: "/lendas/caustic",
  Conduit: "/lendas/conduit",
  Crypto: "/lendas/crypto",
  Fuse: "/lendas/fuse",
  Gibraltar: "/lendas/gibraltar",
  Horizon: "/lendas/horizon",
  Lifeline: "/lendas/lifeline",
  Loba: "/lendas/loba",
  "Mad Maggie": "/lendas/mad-maggie",
  Mirage: "/lendas/mirage",
  Newcastle: "/lendas/newcastle",
  Octane: "/lendas/octane",
  Pathfinder: "/lendas/pathfinder",
  Rampart: "/lendas/rampart",
  Revenant: "/lendas/revenant",
  Seer: "/lendas/seer",
  Sparrow: "/lendas/sparrow",
  Valkyrie: "/lendas/valkyrie",
  Vantage: "/lendas/vantage",
  Wattson: "/lendas/wattson",
  Wraith: "/lendas/wraith",
};

const detailSlugsByPath = {
  "/lendas/alter": "alter",
  "/lendas/ash": "ash",
  "/lendas/axle": "axle",
  "/lendas/ballistic": "ballistic",
  "/lendas/bangalore": "bangalore",
  "/lendas/bloodhound": "bloodhound",
  "/lendas/catalyst": "catalyst",
  "/lendas/caustic": "caustic",
  "/lendas/conduit": "conduit",
  "/lendas/crypto": "crypto",
  "/lendas/fuse": "fuse",
  "/lendas/gibraltar": "gibraltar",
  "/lendas/horizon": "horizon",
  "/lendas/lifeline": "lifeline",
  "/lendas/loba": "loba",
  "/lendas/mad-maggie": "mad-maggie",
  "/lendas/mirage": "mirage",
  "/lendas/newcastle": "newcastle",
  "/lendas/octane": "octane",
  "/lendas/pathfinder": "pathfinder",
  "/lendas/rampart": "rampart",
  "/lendas/revenant": "revenant",
  "/lendas/seer": "seer",
  "/lendas/sparrow": "sparrow",
  "/lendas/valkyrie": "valkyrie",
  "/lendas/vantage": "vantage",
  "/lendas/wattson": "wattson",
  "/lendas/wraith": "wraith",
} as const;

type LegendDetailSlug =
  (typeof detailSlugsByPath)[keyof typeof detailSlugsByPath];

type ArchivePhase =
  | "index"
  | "index-exit"
  | "index-enter"
  | "detail-enter"
  | "detail"
  | "detail-exit";

const DynamicArchiveMotionPoster = dynamic(
  () => import("./ArchiveMotionPoster"),
  {
    loading: () => <div className="archive-motion archive-motion--loading" />,
  }
);

const DynamicLegendDetail = dynamic(() => import("./LegendDetailPanel"), {
  loading: () => <div className="legend-detail legend-detail--loading" />,
});

const DynamicLateSpecialMotionPoster = dynamic(
  () => import("./LateSpecialMotionPosters"),
  {
    loading: () => <div className="late-special-motion--loading" />,
  }
);

const preloadLegendDetail = () => {
  void import("./LegendDetailPanel");
};

const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

const DISCRETE_WHEEL_MIN_DELTA = 48;
const PRECISION_WHEEL_GRACE_MS = 180;
const DISCRETE_WHEEL_TAIL_MS = 80;
const MOBILE_SHOWCASE_QUERY = "(max-width: 767px)";

const usesMobileShowcaseScroller = () =>
  window.matchMedia(MOBILE_SHOWCASE_QUERY).matches;

const getMobileActiveAnchor = () =>
  Math.min(172, Math.max(136, window.innerHeight * 0.2));

const getItemCenterWithinShowcase = (
  item: HTMLElement,
  showcase: HTMLElement
) => {
  let itemCenter = item.offsetHeight / 2;
  let offsetElement: HTMLElement | null = item;

  while (offsetElement && offsetElement !== showcase) {
    itemCenter += offsetElement.offsetTop;
    offsetElement = offsetElement.offsetParent as HTMLElement | null;
  }

  return itemCenter;
};

const getShowcaseScrollRange = (
  showcase: HTMLElement,
  scrollSurface: HTMLElement | null
) => {
  if (usesMobileShowcaseScroller() && scrollSurface) {
    return {
      start: 0,
      end: Math.max(0, scrollSurface.scrollHeight - scrollSurface.clientHeight),
      position: scrollSurface.scrollTop,
    };
  }

  const documentMaxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const showcaseStart = Math.max(
    0,
    window.scrollY + showcase.getBoundingClientRect().top
  );
  const showcaseEnd = Math.min(
    documentMaxScroll,
    showcaseStart + Math.max(0, showcase.offsetHeight - window.innerHeight)
  );

  return {
    start: showcaseStart,
    end: Math.max(showcaseStart, showcaseEnd),
    position: window.scrollY,
  };
};

const getLegendScrollPosition = (
  showcase: HTMLElement,
  scrollSurface: HTMLElement | null,
  items: Array<HTMLElement | null>,
  targetIndex: number
) => {
  const firstItem = items[0];
  const targetItem = items[targetIndex];
  const lastItem = items[items.length - 1];

  if (!firstItem || !targetItem || !lastItem) return null;

  if (usesMobileShowcaseScroller() && scrollSurface) {
    const surfaceRect = scrollSurface.getBoundingClientRect();
    const targetRect = targetItem.getBoundingClientRect();
    const targetCenter = targetRect.top + targetRect.height / 2;
    const targetScroll =
      scrollSurface.scrollTop +
      targetCenter -
      (surfaceRect.top + getMobileActiveAnchor());

    return Math.min(
      Math.max(0, targetScroll),
      Math.max(0, scrollSurface.scrollHeight - scrollSurface.clientHeight)
    );
  }

  const firstCenter = getItemCenterWithinShowcase(firstItem, showcase);
  const targetCenter = getItemCenterWithinShowcase(targetItem, showcase);
  const lastCenter = getItemCenterWithinShowcase(lastItem, showcase);
  const itemRange = lastCenter - firstCenter;
  const progress =
    itemRange > 0
      ? clampProgress((targetCenter - firstCenter) / itemRange)
      : 0;
  const scrollRange = getShowcaseScrollRange(showcase, scrollSurface);

  return scrollRange.start + (scrollRange.end - scrollRange.start) * progress;
};

const scrollToShowcasePosition = (
  scrollSurface: HTMLElement | null,
  top: number
) => {
  if (usesMobileShowcaseScroller() && scrollSurface) {
    scrollSurface.scrollTo({ top, behavior: "auto" });
    return;
  }

  window.scrollTo({ top, behavior: "auto" });
};

function AlterMotionPoster() {
  return (
    <div className="alter-motion" aria-hidden="true">
      <div className="alter-motion__backdrop">
        <Image
          src="/motion/alter-keyart.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className="alter-motion__void" />
      <div className="alter-motion__rift alter-motion__rift--one" />
      <div className="alter-motion__rift alter-motion__rift--two" />

      <div className="alter-motion__portrait">
        <Image
          src="/motion/alter-portrait.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 100vw, min(64vw, 1050px)"
        />
      </div>

      <div className="alter-motion__echo alter-motion__echo--magenta">
        <Image
          src="/motion/alter-portrait.jpg"
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, min(64vw, 1050px)"
        />
      </div>

      <div className="alter-motion__echo alter-motion__echo--green">
        <Image
          src="/motion/alter-portrait.jpg"
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, min(64vw, 1050px)"
        />
      </div>

      <div className="alter-motion__shards" />
      <div className="alter-motion__scan" />

      <div className="alter-motion__sigil">
        <span />
      </div>

      <div className="alter-motion__telemetry">
        <span>VOID // 21</span>
        <span>PASSAGE OPEN</span>
      </div>
    </div>
  );
}

function AshMotionPoster() {
  return (
    <div className="ash-motion" aria-hidden="true">
      <div className="ash-motion__backdrop">
        <Image
          src="/motion/ash-keyart.jpg"
          alt=""
          fill
          sizes="100vw"
        />
      </div>

      <div className="ash-motion__atmosphere" />
      <div className="ash-motion__portal" />

      <div className="ash-motion__portrait">
        <Image
          src="/motion/ash-portrait.jpg"
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, min(68vw, 1120px)"
        />
      </div>

      <div className="ash-motion__echo" aria-hidden="true">
        <Image
          src="/motion/ash-portrait.jpg"
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, min(68vw, 1120px)"
        />
      </div>

      <div className="ash-motion__scan" />
      <div className="ash-motion__particles" />

      <div className="ash-motion__reticle">
        <span />
      </div>

      <div className="ash-motion__telemetry">
        <span>SIM // 122</span>
        <span>PHASE BREACH</span>
      </div>
    </div>
  );
}

function LegendMotionPoster({
  name,
}: {
  name: (typeof legends)[number]["name"];
}) {
  if (name === "Alter") return <AlterMotionPoster />;
  if (name === "Ash") return <AshMotionPoster />;
  if (name === "Bangalore" || name === "Bloodhound") {
    return <DynamicLateSpecialMotionPoster name={name} />;
  }

  const archiveSlug = name.toLowerCase().replaceAll(" ", "-") as ArchiveMotionSlug;

  return <DynamicArchiveMotionPoster slug={archiveSlug} />;
}

export default function LegendShowcase() {
  const pathname = usePathname();
  const router = useRouter();
  const detailSlug =
    (detailSlugsByPath as Record<string, LegendDetailSlug>)[pathname] ?? null;
  const detailIndex = detailSlug
    ? legends.findIndex((legend) =>
        detailPaths[legend.name]?.endsWith(`/${detailSlug}`)
      )
    : -1;
  const activeDetailIndex = detailIndex >= 0 ? detailIndex : null;
  const isLegendDetail = activeDetailIndex !== null;
  const [scrollIndex, setScrollIndex] = useState(
    activeDetailIndex ?? 0
  );
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [archivePhase, setArchivePhase] = useState<ArchivePhase>(
    isLegendDetail ? "detail" : "index"
  );
  const showcaseRef = useRef<HTMLElement | null>(null);
  const scrollSurfaceRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const transitionTimerRef = useRef<number | null>(null);
  const scrollIdleTimerRef = useRef<number | null>(null);
  const scrollIndexRef = useRef(activeDetailIndex ?? 0);
  const isScrollingRef = useRef(false);
  const hasMountedRef = useRef(false);
  const lastDetailIndexRef = useRef(activeDetailIndex ?? 0);
  const wasLegendDetailRef = useRef(isLegendDetail);

  useEffect(() => {
    scrollIndexRef.current = scrollIndex;
  }, [scrollIndex]);

  useEffect(() => {
    const shouldRestoreFocus =
      activeDetailIndex === null && wasLegendDetailRef.current;
    wasLegendDetailRef.current = isLegendDetail;

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    if (activeDetailIndex !== null) {
      lastDetailIndexRef.current = activeDetailIndex;
    }

    const targetIndex = activeDetailIndex ?? lastDetailIndexRef.current;
    let innerFrame = 0;
    let alignmentFrame = 0;
    let alignmentTimer = 0;
    const frame = requestAnimationFrame(() => {
      scrollIndexRef.current = targetIndex;
      setScrollIndex(targetIndex);
      setHoverIndex(null);

      if (activeDetailIndex !== null) {
        setArchivePhase("detail-enter");
        innerFrame = requestAnimationFrame(() => setArchivePhase("detail"));
        return;
      }

      setArchivePhase("index-enter");
      innerFrame = requestAnimationFrame(() => {
        setArchivePhase("index");

        alignmentTimer = window.setTimeout(() => {
          alignmentFrame = requestAnimationFrame(() => {
            const showcase = showcaseRef.current;
            const scrollSurface = scrollSurfaceRef.current;
            const item = itemRefs.current[targetIndex];

            if (!showcase || !item) return;

            const nextScroll = getLegendScrollPosition(
              showcase,
              scrollSurface,
              itemRefs.current,
              targetIndex
            );

            if (nextScroll === null) return;

            scrollIndexRef.current = targetIndex;
            setScrollIndex(targetIndex);
            setHoverIndex(null);
            scrollToShowcasePosition(scrollSurface, nextScroll);

            if (shouldRestoreFocus) {
              item.focus({ preventScroll: true });
            }
          });
        }, 80);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(innerFrame);
      cancelAnimationFrame(alignmentFrame);
      window.clearTimeout(alignmentTimer);
    };
  }, [activeDetailIndex, isLegendDetail]);

  useEffect(
    () => () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      if (scrollIdleTimerRef.current) {
        window.clearTimeout(scrollIdleTimerRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (isLegendDetail) return;

    let frame = 0;
    let precisionWheelUntil = 0;
    let discreteWheelTailUntil = 0;
    let discreteWheelDirection = 0;
    const visibleItemIndices = new Set<number>();
    const scrollSurface = scrollSurfaceRef.current;

    const commitScrollIndex = (index: number) => {
      scrollIndexRef.current = index;
      setScrollIndex((currentIndex) =>
        currentIndex === index ? currentIndex : index
      );
    };

    const getItemRects = (includeAll = false) => {
      const rects = Array<DOMRect | null>(legends.length).fill(null);
      const indices = includeAll
        ? itemRefs.current.map((_, index) => index)
        : Array.from(
            new Set([
              ...visibleItemIndices,
              scrollIndexRef.current - 1,
              scrollIndexRef.current,
              scrollIndexRef.current + 1,
            ])
          ).filter((index) => index >= 0 && index < legends.length);

      indices.forEach((index) => {
        rects[index] = itemRefs.current[index]?.getBoundingClientRect() ?? null;
      });

      return rects;
    };

    const findNearestIndex = (
      itemCenters: Array<number | null>,
      targetCenter: number
    ) => {
      let nearestIndex = scrollIndexRef.current;
      let nearestDistance = Number.POSITIVE_INFINITY;

      itemCenters.forEach((itemCenter, index) => {
        if (itemCenter === null) return;
        const distance = Math.abs(itemCenter - targetCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      return nearestIndex;
    };

    const updateActiveLegend = (forceNearest = false) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const showcase = showcaseRef.current;
        if (!showcase) return;

        const showcaseRect = showcase.getBoundingClientRect();
        if (
          showcaseRect.bottom <= 0 ||
          showcaseRect.top >= window.innerHeight
        ) {
          return;
        }

        const showcaseStyles = window.getComputedStyle(showcase);
        const isMobileScroller = usesMobileShowcaseScroller();
        const topFadeStart = Number.parseFloat(
          showcaseStyles.getPropertyValue("--legend-fade-top-start")
        );
        const topFadeEnd = Number.parseFloat(
          showcaseStyles.getPropertyValue("--legend-fade-top-end")
        );
        const bottomFadeSize = Number.parseFloat(
          showcaseStyles.getPropertyValue("--legend-fade-bottom-size")
        );
        const rects = getItemRects(forceNearest);

        rects.forEach((rect, index) => {
          const item = itemRefs.current[index];
          if (!item || !rect) return;

          if (isMobileScroller) {
            item.style.removeProperty("--edge-mask");
            return;
          }

          const topTransparentStop = topFadeStart - rect.top;
          const topSolidStop = topFadeEnd - rect.top;
          const bottomSolidStop =
            window.innerHeight - bottomFadeSize - rect.top;
          const bottomTransparentStop = window.innerHeight - rect.top;

          item.style.setProperty(
            "--edge-mask",
            `linear-gradient(to bottom,
            transparent ${topTransparentStop}px,
            #000 ${topSolidStop}px,
            #000 ${bottomSolidStop}px,
            transparent ${bottomTransparentStop}px)`
          );
        });

        const firstItem = itemRefs.current[0];
        const lastItem = itemRefs.current[legends.length - 1];

        if (!firstItem || !lastItem) return;

        if (isMobileScroller && scrollSurface) {
          const surfaceTop = scrollSurface.getBoundingClientRect().top;
          const itemCenters = rects.map((rect) =>
            rect ? rect.top + rect.height / 2 : null
          );

          commitScrollIndex(
            findNearestIndex(
              itemCenters,
              surfaceTop + getMobileActiveAnchor()
            )
          );
          return;
        }

        const itemCenters = itemRefs.current.map((item) =>
          item ? getItemCenterWithinShowcase(item, showcase) : null
        );
        const firstCenter = itemCenters[0];
        const lastCenter = itemCenters[itemCenters.length - 1];

        if (firstCenter === null || lastCenter === null) return;

        const scrollRange = getShowcaseScrollRange(showcase, scrollSurface);
        const scrollLength = scrollRange.end - scrollRange.start;
        const progress =
          scrollLength > 0
            ? clampProgress(
                (scrollRange.position - scrollRange.start) / scrollLength
              )
            : 0;
        const targetCenter =
          firstCenter + (lastCenter - firstCenter) * progress;

        commitScrollIndex(findNearestIndex(itemCenters, targetCenter));
      });
    };

    const visibilityObserver =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                const index = Number(
                  (entry.target as HTMLElement).dataset.legendIndex
                );
                if (!Number.isInteger(index)) return;

                if (usesMobileShowcaseScroller()) {
                  (entry.target as HTMLElement).style.removeProperty(
                    "--edge-mask"
                  );

                  if (entry.isIntersecting) {
                    visibleItemIndices.add(index);
                  } else {
                    visibleItemIndices.delete(index);
                  }
                  return;
                }

                if (entry.isIntersecting) {
                  visibleItemIndices.add(index);
                  return;
                }

                visibleItemIndices.delete(index);
                (entry.target as HTMLElement).style.setProperty(
                  "--edge-mask",
                  "linear-gradient(transparent, transparent)"
                );
              });
            },
            { rootMargin: "160px 0px" }
          );

    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      if (visibilityObserver) {
        visibilityObserver.observe(item);
      } else {
        visibleItemIndices.add(index);
      }
    });

    const handleScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        setHoverIndex(null);
      }

      updateActiveLegend();

      if (scrollIdleTimerRef.current) {
        window.clearTimeout(scrollIdleTimerRef.current);
      }

      scrollIdleTimerRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 130);
    };

    const handleWheel = (event: WheelEvent) => {
      if (usesMobileShowcaseScroller()) return;

      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.deltaY === 0 ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ) {
        return;
      }

      const now = performance.now();
      const absoluteDelta = Math.abs(event.deltaY);
      const isPixelDelta = event.deltaMode === WheelEvent.DOM_DELTA_PIXEL;
      const isFinePixelInput =
        isPixelDelta && absoluteDelta < DISCRETE_WHEEL_MIN_DELTA;
      const direction = event.deltaY > 0 ? 1 : -1;

      if (isFinePixelInput) {
        if (
          now < discreteWheelTailUntil &&
          direction === discreteWheelDirection
        ) {
          event.preventDefault();
          discreteWheelTailUntil = now + DISCRETE_WHEEL_TAIL_MS;
          return;
        }

        precisionWheelUntil = now + PRECISION_WHEEL_GRACE_MS;
        return;
      }

      if (isPixelDelta && now < precisionWheelUntil) return;

      const showcase = showcaseRef.current;
      if (!showcase) return;

      const scrollRange = getShowcaseScrollRange(showcase, scrollSurface);
      const isInsideShowcaseScroll =
        scrollRange.position >= scrollRange.start - 1 &&
        scrollRange.position <= scrollRange.end + 1;

      if (!isInsideShowcaseScroll) return;

      const targetIndex = Math.min(
        legends.length - 1,
        Math.max(0, scrollIndexRef.current + direction)
      );
      const targetScroll = getLegendScrollPosition(
        showcase,
        scrollSurface,
        itemRefs.current,
        targetIndex
      );

      if (targetScroll === null) return;

      event.preventDefault();
      discreteWheelDirection = direction;
      discreteWheelTailUntil = now + DISCRETE_WHEEL_TAIL_MS;
      isScrollingRef.current = true;
      scrollIndexRef.current = targetIndex;
      setScrollIndex(targetIndex);
      setHoverIndex(null);
      scrollToShowcasePosition(scrollSurface, targetScroll);

      if (scrollIdleTimerRef.current) {
        window.clearTimeout(scrollIdleTimerRef.current);
      }

      scrollIdleTimerRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 130);
    };

    const handleResize = () => updateActiveLegend(true);

    updateActiveLegend(true);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    scrollSurface?.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      if (scrollIdleTimerRef.current) {
        window.clearTimeout(scrollIdleTimerRef.current);
        scrollIdleTimerRef.current = null;
      }
      isScrollingRef.current = false;
      visibilityObserver?.disconnect();
      visibleItemIndices.clear();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      scrollSurface?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLegendDetail]);

  const openLegendDetail = (index: number, path: string) => {
    if (isLegendDetail || archivePhase !== "index") return;

    preloadLegendDetail();
    lastDetailIndexRef.current = index;
    setScrollIndex(index);
    setHoverIndex(null);
    setArchivePhase("index-exit");

    transitionTimerRef.current = window.setTimeout(() => {
      router.push(path, { scroll: false });
    }, 320);
  };

  const closeLegendDetail = () => {
    if (!isLegendDetail || archivePhase === "detail-exit") return;

    lastDetailIndexRef.current = 0;
    scrollIndexRef.current = 0;
    setScrollIndex(0);
    setHoverIndex(null);
    setArchivePhase("detail-exit");

    transitionTimerRef.current = window.setTimeout(() => {
      router.push("/", { scroll: false });
    }, 280);
  };

  const focusLegendItem = (targetIndex: number) => {
    const showcase = showcaseRef.current;
    const scrollSurface = scrollSurfaceRef.current;
    const item = itemRefs.current[targetIndex];

    if (!showcase || !item) return;

    const targetScroll = getLegendScrollPosition(
      showcase,
      scrollSurface,
      itemRefs.current,
      targetIndex
    );

    if (targetScroll === null) return;

    scrollIndexRef.current = targetIndex;
    setScrollIndex(targetIndex);
    setHoverIndex(targetIndex);
    scrollToShowcasePosition(scrollSurface, targetScroll);
    item.focus({ preventScroll: true });
  };

  const activeIndex = activeDetailIndex ?? hoverIndex ?? scrollIndex;
  const activeLegend = legends[activeIndex];
  const renderLegendItem = (
    legend: (typeof legends)[number],
    index: number
  ) => (
    <button
      className={`legend-item ${
        index === activeIndex ? "is-active" : ""
      } ${index === hoverIndex ? "is-hovered" : ""}`}
      key={legend.name}
      data-legend-index={index}
      ref={(element) => {
        itemRefs.current[index] = element;
      }}
      type="button"
      aria-pressed={index === activeIndex}
      tabIndex={index === activeIndex ? 0 : -1}
      onPointerMove={(event) => {
        if (event.pointerType === "mouse" && !isScrollingRef.current) {
          preloadLegendDetail();
          setHoverIndex((currentIndex) =>
            currentIndex === index ? currentIndex : index
          );
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHoverIndex(null);
      }}
      onFocus={() => {
        preloadLegendDetail();
        setHoverIndex(index);
      }}
      onBlur={() => setHoverIndex(null)}
      onKeyDown={(event) => {
        let targetIndex: number | null = null;

        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          targetIndex = Math.min(legends.length - 1, index + 1);
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          targetIndex = Math.max(0, index - 1);
        } else if (event.key === "Home") {
          targetIndex = 0;
        } else if (event.key === "End") {
          targetIndex = legends.length - 1;
        }

        if (targetIndex === null || targetIndex === index) return;

        event.preventDefault();
        focusLegendItem(targetIndex);
      }}
      onClick={() => {
        const detailPath = detailPaths[legend.name];

        if (detailPath) {
          openLegendDetail(index, detailPath);
          return;
        }

        setScrollIndex(index);
      }}
      style={
        {
          "--legend-accent": legend.accent,
        } as CSSProperties
      }
    >
      <span className="legend-item__name">{legend.name}</span>
      <span className="legend-item__role">
        <span
          className="legend-class-icon"
          aria-hidden="true"
          style={
            {
              "--class-icon": `url("${legend.classIcon}")`,
            } as CSSProperties
          }
        />
        {legend.role}
      </span>
    </button>
  );

  const mountedPosterIndices = [activeIndex - 1, activeIndex, activeIndex + 1]
    .filter((index) => index >= 0 && index < legends.length)
    .filter((index, position, indices) => indices.indexOf(index) === position);

  return (
    <section
      className={`legend-showcase ${isLegendDetail ? "is-detail" : "is-index"} archive-phase--${archivePhase}`}
      aria-label="Lendas de Apex Legends"
      ref={showcaseRef}
    >
      <header className="legend-header">
        <button
          className="legend-logo-button"
          type="button"
          aria-label="Voltar à página inicial"
          onClick={closeLegendDetail}
          disabled={!isLegendDetail}
        >
          <Image
            src="/apex_legends-logo-freelogovectors.net_.svg"
            alt="Apex Legends"
            width={72}
            height={48}
            className="legend-logo"
          />
        </button>
        <div className="legend-header__label">
          <span>Arquivo de Lendas</span>
        </div>
      </header>

      <div className="legend-stage" aria-hidden="true">
        <div className="legend-media">
          {mountedPosterIndices.map((index) => {
            const legend = legends[index];

            return (
            <div
              className={`legend-media__layer legend-media__layer--${legend.name.toLowerCase()} ${
                index === activeIndex ? "is-active" : ""
              }`}
              key={legend.name}
            >
              <LegendMotionPoster name={legend.name} />
            </div>
            );
          })}
        </div>

        <div className="legend-stage__shade" />
        <div className="legend-stage__grid" />

        <div className="legend-readout">
          <span>{activeLegend.code}</span>
          <span className="legend-readout__role">
            <span
              className="legend-class-icon"
              aria-hidden="true"
              style={
                {
                  "--class-icon": `url("${activeLegend.classIcon}")`,
                } as CSSProperties
              }
            />
            {activeLegend.role}
          </span>
        </div>

        <div className="legend-counter">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="legend-counter__line" />
          <span>{String(legends.length).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="legend-scroll-surface" ref={scrollSurfaceRef}>
        <div
          className="legend-interface"
          key={isLegendDetail ? "detail-interface" : "index-interface"}
          aria-hidden={isLegendDetail}
          inert={isLegendDetail ? true : undefined}
        >
          <p className="legend-eyebrow">Selecione sua Lenda</p>

          <nav className="legend-list" aria-label="Seleção de Lendas">
            {legends.map((legend, index) => renderLegendItem(legend, index))}
          </nav>
        </div>
      </div>

      {detailSlug ? (
        <DynamicLegendDetail
          key={detailSlug}
          detailSlug={detailSlug}
          onBack={closeLegendDetail}
        />
      ) : null}
    </section>
  );
}
