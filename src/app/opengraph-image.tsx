import { ImageResponse } from "next/og";

export const alt = "Anthony Chapman — Rockwall Partners, AI operating partner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#12110e",
          color: "#f3eee4",
          padding: "64px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#d4b483",
          }}
        >
          <span>Rockwall Partners</span>
          <span>Dallas, TX</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, maxWidth: 980 }}>
            Anthony Chapman
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 32,
              color: "#cfc6b6",
              maxWidth: 900,
            }}
          >
            AI operating partner. Top 1% CoreTrust AE (2023–2024). GTM
            automation that puts the right clients in front of you.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 22,
            color: "#d4b483",
          }}
        >
          <span>Top 1% · 2023 and 2024</span>
          <span>$23M quarterly quota</span>
          <span>~60% LLM cost cut</span>
        </div>
      </div>
    ),
    size,
  );
}
