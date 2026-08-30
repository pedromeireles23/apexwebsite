import type { Metadata } from "next";

type LegendMetadataInput = {
  name: string;
  slug: string;
  description: string;
};

export function createLegendMetadata({
  name,
  slug,
  description,
}: LegendMetadataInput): Metadata {
  const title = `${name} | Arquivo de Lendas`;
  const url = `/lendas/${slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url,
      siteName: "Arquivo de Lendas",
      title,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${name} no Arquivo de Lendas de Apex Legends`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
