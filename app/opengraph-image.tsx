import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#3B82F6",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 64, fontWeight: 700 }}>AutoPayX</div>
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "#93C5FD", textAlign: "center", maxWidth: 900 }}>
          Recurring USDC subscriptions on Stellar
        </div>
      </div>
    ),
    { ...size }
  );
}
