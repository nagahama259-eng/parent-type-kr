import { ImageResponse } from "next/og";
import { TYPES, TYPE_KEYS, TypeKey } from "@/lib/data";
import { isValidTypeKey } from "@/lib/scoring";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "부모 성향 테스트 결과";

// 4개 유형 정적 생성
export function generateStaticParams() {
  return TYPE_KEYS.map((type) => ({ type }));
}

// Pretendard 폰트 안전 로드 (CDN 실패 시에도 크래시 방지)
async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  // 유효하지 않은 유형이면 기본 이미지
  if (!isValidTypeKey(type)) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F7F3EB",
            fontSize: 60,
            color: "#2A2620",
          }}
        >
          부모 성향 테스트
        </div>
      ),
      size
    );
  }

  const t = TYPES[type as TypeKey];

  // Pretendard 로드 (Bold, Regular)
  const [fontBold, fontRegular] = await Promise.all([
    loadFont(
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf"
    ),
    loadFont(
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Regular.otf"
    ),
  ]);

  // 폰트 설정 (로드 실패한 것은 제외)
  const fonts: Array<{
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style?: "normal";
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
          background: `linear-gradient(135deg, ${t.color}22 0%, ${t.color}44 100%)`,
          fontFamily: "Pretendard",
        }}
      >
        {/* 상단 */}
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
              fontSize: 44,
              color: "#5C554B",
              marginBottom: 20,
              fontWeight: 400,
              display: "flex",
            }}
          >
            저는
          </div>
          <div
            style={{
              fontSize: 180,
              color: t.color,
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: 36,
              letterSpacing: -4,
              display: "flex",
            }}
          >
            {t.name_kr}
          </div>
          <div
            style={{
              fontSize: 42,
              color: "#2A2620",
              lineHeight: 1.4,
              fontWeight: 400,
              display: "flex",
            }}
          >
            {t.tagline}
          </div>
        </div>

        {/* 하단 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#5C554B",
            fontSize: 22,
          }}
        >
          <span style={{ display: "flex" }}>parent-type-kr.vercel.app</span>
          <span style={{ display: "flex", opacity: 0.6 }}>
            20문항 부모 성향 테스트
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
