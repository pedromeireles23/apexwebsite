import { ImageResponse } from "next/og";

export const alt = "Arquivo de Lendas de Apex Legends";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background:
            "linear-gradient(120deg, #050506 0%, #09090b 58%, #180708 100%)",
          color: "#f4f1eb",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            width: 18,
            height: "100%",
            background: "#d71920",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 52,
            right: 58,
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#d8d4ce",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 5,
          }}
        >
          <span
            style={{
              display: "flex",
              width: 11,
              height: 11,
              borderRadius: 999,
              background: "#e1262d",
            }}
          />
          ARQUIVO ONLINE
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            padding: "74px 78px 60px 92px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 92,
                height: 92,
                border: "2px solid #d71920",
                color: "#fff",
                fontSize: 64,
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              A
            </div>
            <div
              style={{
                display: "flex",
                color: "#a7a29c",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 7,
              }}
            >
              SELECIONE SUA LENDA
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 108,
              fontWeight: 900,
              letterSpacing: -5,
              lineHeight: 0.88,
              textTransform: "uppercase",
            }}
          >
            <span>Arquivo</span>
            <span style={{ color: "#e1262d" }}>de Lendas</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 42,
              color: "#c7c2bb",
              fontSize: 22,
              letterSpacing: 3,
            }}
          >
            <span>28 DOSSIÊS</span>
            <span style={{ width: 110, height: 2, background: "#d71920" }} />
            <span>HISTÓRIAS · CLASSES · HABILIDADES</span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 54,
            bottom: 42,
            display: "flex",
            color: "#77736e",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          APX // 28
        </div>
      </div>
    ),
    size
  );
}
