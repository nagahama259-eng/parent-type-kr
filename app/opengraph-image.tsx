import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "부모 성향 테스트 — 당신은 어떤 부모인가요?";

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OGImage() {
  const [fontBold, fontRegular] = await Promise.all([
    loadFont(
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf"
    ),
    loadFont(
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Regular.otf"
    ),
  ]);

  const fonts: Array<{
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
  }> = [];
  if (fontBold) fonts.push({ name: "Pretendard", data: fontBold, weight: 700 });
  if (fontRegular)
    fonts.push({ name: "Pretendard", data: fontRegular, weight: 400 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px 100px",
          background: "#FFFDF8",
          fontFamily: "Pretendard",
        }}
      >
        {/* 상단 라벨 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: "rgba(39,35,38,0.65)",
              letterSpacing: 6,
              fontWeight: 400,
            }}
          >
            PARENTING TYPE TEST
          </span>
        </div>

        {/* 중앙 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 120,
              color: "#272326",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 32,
              letterSpacing: -3,
              display: "flex",
            }}
          >
            당신은 어떤
          </div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 40,
              letterSpacing: -3,
              display: "flex",
            }}
          >
            <span style={{ color: "#FF8273" }}>부모</span>
            <span style={{ color: "#272326" }}>인가요?</span>
          </div>
          <div
            style={{
              fontSize: 36,
              color: "rgba(39,35,38,0.65)",
              fontWeight: 400,
              display: "flex",
            }}
          >
            28문항으로 진단하는 육아 스타일 16유형
          </div>
        </div>

        {/* 하단 - 4색 유형 점 + URL */}
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                background: "#FF9EDF",
              }}
            />
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                background: "#91DDF7",
              }}
            />
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                background: "#CDB7FF",
              }}
            />
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                background: "#A7F0D1",
              }}
            />
          </div>
          <span style={{ fontSize: 22, color: "rgba(39,35,38,0.65)", display: "flex" }}>
            parent-type-kr.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );
}
