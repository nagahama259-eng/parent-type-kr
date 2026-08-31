import Link from "next/link";
import { TYPES, THEORETICAL_BASIS, TypeKey, FAMILY_COLORS } from "@/lib/data";
import { isValidTypeKey } from "@/lib/scoring";

// 공유 링크(/?from=[type])로 방문 시: 해당 유형의 OG 이미지·문구로 카톡 미리보기 커스터마이징
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  if (from && isValidTypeKey(from)) {
    const t = TYPES[from as TypeKey];
    return {
      title: `친구가 ${t.name_kr}래요 — 당신은?`,
      description: `친구가 '${t.tagline}' 결과를 받았어요. 당신은 어떤 부모일까요?`,
      openGraph: {
        title: `친구가 ${t.name_kr}래요`,
        description: t.tagline,
        images: [
          {
            url: `/result/${from}/opengraph-image`,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image" as const,
        title: `친구가 ${t.name_kr}래요`,
        description: t.tagline,
        images: [`/result/${from}/opengraph-image`],
      },
    };
  }

  return {}; // 기본 메타데이터 (layout.tsx)로 fallback
}

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const fromType =
    from && isValidTypeKey(from) ? TYPES[from as TypeKey] : null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 md:px-6 py-12 md:py-16">
      <div className="max-w-2xl w-full">
        {/* 친구 공유 알림 배너 (from 파라미터 있을 때) */}
        {fromType && (
          <div
            className="mb-8 px-5 py-4 border-l-4 bg-[var(--bg-elevated)]"
            style={{ borderColor: fromType.color }}
          >
            <p className="text-sm text-[var(--ink-soft)] mb-1">
              친구가 이런 결과를 받았어요
            </p>
            <p
              className="text-lg font-medium"
              style={{ color: fromType.color }}
            >
              {fromType.name_kr}
            </p>
            <p className="text-xs text-[var(--ink-soft)] mt-1">
              {fromType.tagline}
            </p>
          </div>
        )}

        {/* 헤더 아이브로우 */}
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--ink-soft)] mb-8">
          Parenting Type Test · 28 Questions · 16 Types
        </p>

        {/* 히어로 */}
        <h1 className="serif text-4xl md:text-6xl leading-[1.15] tracking-tight mb-8">
          당신은 어떤
          <br />
          <span className="text-[var(--accent)]">부모</span>인가요?
        </h1>

        <p className="text-base md:text-lg text-[var(--ink-soft)] leading-relaxed mb-6 max-w-lg">
          28문항으로 진단하는 육아 스타일 16유형.
          <br className="hidden md:inline" />
          나의 유형, 우리 아이 성장 방향, 그리고 배우자와의 궁합까지 받아보세요.
        </p>
        <p className="text-xs text-[var(--ink-soft)] mb-12 tracking-wider">
          · {THEORETICAL_BASIS}
        </p>

        {/* 시그니처 요소: 미니 사분면 지도 */}
        <div className="mb-14 max-w-md">
          <MiniQuadrant />
        </div>

        {/* CTA */}
        <Link
          href="/test"
          className="inline-block bg-[var(--ink)] text-[var(--bg-elevated)] px-10 py-4 text-lg tracking-wide hover:bg-[var(--accent)] transition-colors"
        >
          시작하기 →
        </Link>

        <p className="mt-6 text-sm text-[var(--ink-soft)]">
          소요 시간 약 5분 · 28문항 · 16유형
        </p>
      </div>
    </main>
  );
}

// 4사분면에 유형 배치한 미리보기 (시그니처 요소)
function MiniQuadrant() {
  const types = Object.values(TYPES);
  return (
    <div className="relative aspect-square border border-[var(--line)] bg-[var(--bg-elevated)]">
      {/* 축 라벨 - 박스 안쪽 배치 */}
      <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-[var(--ink-soft)] bg-[var(--bg-elevated)] px-1.5 z-10">
        개입
      </span>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-[var(--ink-soft)] bg-[var(--bg-elevated)] px-1.5 z-10">
        자율
      </span>
      <span className="absolute top-1/2 left-2 -translate-y-1/2 text-[10px] text-[var(--ink-soft)] bg-[var(--bg-elevated)] px-1.5 z-10">
        감성
      </span>
      <span className="absolute top-1/2 right-2 -translate-y-1/2 text-[10px] text-[var(--ink-soft)] bg-[var(--bg-elevated)] px-1.5 z-10">
        이성
      </span>

      {/* 십자선 */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--line)]" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-[var(--line)]" />

      {/* 4개 계열 점 - 계열 대표만 표시 (16 유형 세부는 결과 페이지에서) */}
      {(
        [
          { family: "nurturer", top: "25%", left: "25%", label: "따뜻·이끄는" },
          { family: "planner", top: "25%", left: "75%", label: "논리·이끄는" },
          { family: "supporter", top: "75%", left: "25%", label: "따뜻·존중하는" },
          { family: "observer", top: "75%", left: "75%", label: "논리·존중하는" },
        ] as const
      ).map((f) => (
        <div
          key={f.family}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ top: f.top, left: f.left }}
        >
          <div
            className="w-3 h-3 rounded-full mx-auto mb-2"
            style={{ backgroundColor: FAMILY_COLORS[f.family] }}
          />
          <span className="text-[11px] text-[var(--ink)] whitespace-nowrap">
            {f.label}
          </span>
        </div>
      ))}
    </div>
  );
}
