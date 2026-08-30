const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
);

export const SITE_NAME = "Arquivo de Lendas | Apex Legends";

export const SITE_DESCRIPTION =
  "Explore as 28 Lendas de Apex Legends em um arquivo visual interativo com histórias, classes e habilidades.";

export const LEGEND_SLUGS = [
  "alter",
  "ash",
  "axle",
  "ballistic",
  "bangalore",
  "bloodhound",
  "catalyst",
  "caustic",
  "conduit",
  "crypto",
  "fuse",
  "gibraltar",
  "horizon",
  "lifeline",
  "loba",
  "mad-maggie",
  "mirage",
  "newcastle",
  "octane",
  "pathfinder",
  "rampart",
  "revenant",
  "seer",
  "sparrow",
  "valkyrie",
  "vantage",
  "wattson",
  "wraith",
] as const;
