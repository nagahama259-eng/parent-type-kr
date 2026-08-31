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
          background: "#F7F3EB",
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
              color: "#5C554B",
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
              color: "#2A2620",
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
            <span style={{ color: "#C89934" }}>부모</span>
            <span style={{ color: "#2A2620" }}>인가요?</span>
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#5C554B",
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
                background: "#E8927C",
              }}
            />
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                background: "#5B7A94",
              }}
            />
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                background: "#8FA678",
              }}
            />
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                background: "#9E8AA0",
              }}
            />
          </div>
          <span style={{ fontSize: 22, color: "#5C554B", display: "flex" }}>
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
