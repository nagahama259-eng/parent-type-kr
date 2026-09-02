import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFFDF8",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 상단 두 사분면 */}
        <div style={{ display: "flex", flex: 1 }}>
          <div
            style={{
              flex: 1,
              borderRight: "2px solid #272326",
              borderBottom: "2px solid #272326",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#FF9EDF",
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              borderBottom: "2px solid #272326",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#91DDF7",
              }}
            />
          </div>
        </div>
        {/* 하단 두 사분면 */}
        <div style={{ display: "flex", flex: 1 }}>
          <div
            style={{
              flex: 1,
              borderRight: "2px solid #272326",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#CDB7FF",
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#A7F0D1",
              }}
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}
