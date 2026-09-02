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
    <main className="min-h-screen relative overflow-hidden">
      {/* 장식 블롭 */}
      <div
        className="absolute rounded-full opacity-70 pointer-events-none"
        style={{ width: 220, height: 220, top: -80, right: -80, background: "var(--mint)" }}
      />
      <div
        className="absolute rounded-full opacity-55 pointer-events-none"
        style={{ width: 160, height: 160, top: 560, left: -70, background: "var(--butter)" }}
      />

      <div className="relative max-w-2xl mx-auto px-5 md:px-6 py-12 md:py-16">
        {/* 친구 공유 알림 배너 */}
        {fromType && (
          <div className="sticker mb-8 px-5 py-4 rounded-2xl bg-white">
            <p className="text-sm text-[var(--ink-soft)] mb-1">
              친구가 이런 결과를 받았어요
            </p>
            <p className="hand text-xl font-bold" style={{ color: fromType.color }}>
              {fromType.name_kr}
            </p>
            <p className="text-xs text-[var(--ink-soft)] mt-1">
              {fromType.tagline}
            </p>
          </div>
        )}

        {/* 헤더 뱃지 */}
        <div className="sticker inline-flex items-center gap-2 bg-[var(--pink)] text-[var(--ink)] text-xs font-extrabold px-4 py-2 rounded-full mb-6">
          <StarIcon /> 육아 성향 심리테스트
        </div>

        {/* 히어로 */}
        <h1 className="hand text-4xl md:text-6xl leading-[1.2] font-bold mb-6">
          당신은
          <br />
          어떤 <span style={{ color: "var(--accent)" }}>부모</span>인가요?
        </h1>

        <p className="text-base md:text-lg text-[var(--ink-soft)] leading-relaxed mb-2 max-w-lg">
          28문항으로 진단하는 육아 스타일 16유형.
          <br className="hidden md:inline" />
          나의 유형, 우리 아이 성장 방향, 그리고 배우자와의 궁합까지 받아보세요.
        </p>
        <p className="text-xs text-[var(--ink-soft)] mb-10">· {THEORETICAL_BASIS}</p>

        {/* 메타 정보 pill들 */}
        <div className="flex flex-wrap gap-2 mb-10">
          <MetaPill icon={<ClockIcon />} label="약 5분" />
          <MetaPill label="28문항" />
          <MetaPill label="16가지 유형" />
        </div>

        {/* CTA */}
        <Link
          href="/test"
          className="sticker inline-flex items-center gap-2 bg-[var(--accent)] text-white px-10 py-4 rounded-2xl text-lg font-bold hover:brightness-105 transition-all"
        >
          무료로 시작하기 →
        </Link>

        {/* 시그니처 요소: 미니 사분면 지도 */}
        <div className="my-14 max-w-md">
          <MiniQuadrant />
        </div>

        {/* 혜택 카드 3개 */}
        <div className="flex flex-col gap-4 mb-10">
          <BenefitCard
            bg="var(--pink)"
            icon={<HeartIcon />}
            title="나의 부모 유형 진단"
            desc="감성·개입 두 축으로 내 육아 성향을 정확하게 짚어드려요"
          />
          <BenefitCard
            bg="var(--mint)"
            icon={<StarOutlineIcon />}
            title="우리 아이 맞춤 케어 팁"
            desc="내 유형에 맞는 자녀 성장 가이드를 받아보세요"
          />
          <BenefitCard
            bg="var(--butter)"
            icon={<RingIcon />}
            title="배우자와 육아 궁합"
            desc="배우자 유형과 비교해 찰떡궁합인지 확인해보세요"
          />
        </div>

        {/* 4가지 부모 유형 */}
        <div className="mb-9">
          <h2 className="hand text-2xl font-bold mb-1">4가지 부모 유형</h2>
          <p className="text-sm text-[var(--ink-soft)] mb-5">
            두 축이 만나 만드는 나의 육아 좌표
          </p>

          <div className="relative pt-7">
            <span className="absolute top-0 left-0 right-0 text-center text-xs font-extrabold text-[var(--ink-soft)]">
              개입
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[var(--ink-soft)] flex-shrink-0">
                감성
              </span>
              <div className="grid grid-cols-2 gap-2.5 flex-1">
                <FamilyTile bg={FAMILY_COLORS.nurturer} label="따뜻·리드형" />
                <FamilyTile bg={FAMILY_COLORS.planner} label="논리·리드형" />
                <FamilyTile bg={FAMILY_COLORS.supporter} label="따뜻·존중형" />
                <FamilyTile bg={FAMILY_COLORS.observer} label="논리·존중형" />
              </div>
              <span className="text-xs font-extrabold text-[var(--ink-soft)] flex-shrink-0">
                이성
              </span>
            </div>

            <p className="text-center mt-2 text-xs font-extrabold text-[var(--ink-soft)]">
              자율
            </p>
          </div>
        </div>

        {/* 신뢰할 수 있는 근거 */}
        <div className="sticker rounded-2xl p-5 mb-10" style={{ background: "var(--sky)" }}>
          <div className="flex items-center gap-2 mb-2.5">
            <BookIcon />
            <span className="font-extrabold text-sm">신뢰할 수 있는 근거</span>
          </div>
          <p className="text-[13.5px] leading-relaxed text-[rgba(39,35,38,0.8)] font-medium">
            {THEORETICAL_BASIS}으로 설계했어요.
          </p>
        </div>

        {/* 최종 CTA */}
        <div className="sticker rounded-3xl bg-[var(--accent)] text-white text-center px-6 py-10 relative overflow-hidden">
          <StarIcon className="absolute top-4 left-4 opacity-90" />
          <p className="hand text-2xl font-bold mb-2">5분이면 알 수 있어요</p>
          <p className="text-sm opacity-90 mb-6">나는 어떤 부모일까, 지금 확인해보세요</p>
          <Link
            href="/test"
            className="sticker inline-block bg-white text-[var(--ink)] px-8 py-4 rounded-2xl font-bold hover:brightness-95 transition-all"
          >
            테스트 시작하기 →
          </Link>
        </div>
      </div>
    </main>
  );
}

function MetaPill({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return (
    <span className="sticker inline-flex items-center gap-1.5 bg-white rounded-full px-3.5 py-1.5 text-xs font-bold text-[var(--ink)]">
      {icon}
      {label}
    </span>
  );
}

function BenefitCard({
  bg,
  icon,
  title,
  desc,
}: {
  bg: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="sticker rounded-2xl bg-white p-5 flex gap-4 items-start">
      <div
        className="sticker flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: bg }}
      >
        {icon}
      </div>
      <div>
        <p className="font-extrabold text-[var(--ink)] mb-1">{title}</p>
        <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function FamilyTile({ bg, label }: { bg: string; label: string }) {
  return (
    <div
      className="sticker rounded-2xl py-4.5 px-2.5 text-center"
      style={{ background: bg }}
    >
      <span className="font-extrabold text-[13.5px] text-[var(--ink)]">{label}</span>
    </div>
  );
}

// 4사분면에 유형 배치한 미리보기 (시그니처 요소)
function MiniQuadrant() {
  return (
    <div className="sticker relative aspect-square rounded-2xl bg-white">
      {/* 축 라벨 - 박스 안쪽 배치 */}
      <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[var(--ink-soft)] bg-white px-1.5 z-10">
        개입
      </span>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[var(--ink-soft)] bg-white px-1.5 z-10">
        자율
      </span>
      <span className="absolute top-1/2 left-2 -translate-y-1/2 text-[10px] font-bold text-[var(--ink-soft)] bg-white px-1.5 z-10">
        감성
      </span>
      <span className="absolute top-1/2 right-2 -translate-y-1/2 text-[10px] font-bold text-[var(--ink-soft)] bg-white px-1.5 z-10">
        이성
      </span>

      {/* 십자선 */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--line)]" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-[var(--line)]" />

      {/* 4개 계열 점 */}
      {(
        [
          { family: "nurturer", top: "25%", left: "25%", label: "따뜻·리드형" },
          { family: "planner", top: "25%", left: "75%", label: "논리·리드형" },
          { family: "supporter", top: "75%", left: "25%", label: "따뜻·존중형" },
          { family: "observer", top: "75%", left: "75%", label: "논리·존중형" },
        ] as const
      ).map((f) => (
        <div
          key={f.family}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ top: f.top, left: f.left }}
        >
          <div
            className="sticker w-3.5 h-3.5 rounded-full mx-auto mb-2"
            style={{ backgroundColor: FAMILY_COLORS[f.family] }}
          />
          <span className="text-[11px] font-bold text-[var(--ink)] whitespace-nowrap">
            {f.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="#272326">
      <path d="M12 2l2.6 7.3H22l-6 4.6 2.3 7.4L12 16.9 5.7 21.3 8 13.9 2 9.3h7.4z" />
    </svg>
  );
}

function StarOutlineIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#272326" strokeWidth="2" strokeLinejoin="round">
      <path d="M12 2l2.6 7.3H22l-6 4.6 2.3 7.4L12 16.9 5.7 21.3 8 13.9 2 9.3h7.4z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#272326" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function RingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#272326" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="16" r="4" />
      <circle cx="16" cy="16" r="4" />
      <path d="M12 4v6" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#272326" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M5 6l7-3 7 3M5 6v11l7 3 7-3V6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#272326" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
