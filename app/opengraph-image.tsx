import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "Logo de Apex Legends";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const apexLogo = await readFile(
  join(process.cwd(), "public/apex_legends-logo-freelogovectors.net_.svg"),
  "utf8"
);

const apexLogoSrc = `data:image/svg+xml;base64,${Buffer.from(
  apexLogo.replace('fill="#000000"', 'fill="#ffffff"')
).toString("base64")}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#000000",
        }}
      >
        <img
          src={apexLogoSrc}
          alt="Apex Legends"
          width={560}
          height={415}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    size
  );
}
