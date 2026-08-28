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
          background: "#F7F3EB",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 상단 두 사분면 */}
        <div style={{ display: "flex", flex: 1 }}>
          <div
            style={{
              flex: 1,
              borderRight: "1px solid #E4DDD0",
              borderBottom: "1px solid #E4DDD0",
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
                background: "#E8927C",
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              borderBottom: "1px solid #E4DDD0",
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
                background: "#5B7A94",
              }}
            />
          </div>
        </div>
        {/* 하단 두 사분면 */}
        <div style={{ display: "flex", flex: 1 }}>
          <div
            style={{
              flex: 1,
              borderRight: "1px solid #E4DDD0",
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
                background: "#8FA678",
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
                background: "#9E8AA0",
              }}
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}
