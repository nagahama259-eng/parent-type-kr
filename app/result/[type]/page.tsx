import Link from "next/link";
import { notFound } from "next/navigation";
import { TYPES, TypeKey, TYPE_KEYS, THEORETICAL_BASIS, REFERENCES, DISCLAIMER, CATEGORY_ICONS } from "@/lib/data";
import { isValidTypeKey } from "@/lib/scoring";
import QuadrantMap from "@/components/QuadrantMap";
import ShareButtons from "@/components/ShareButtons";

// SEO를 위한 정적 생성
export function generateStaticParams() {
  return TYPE_KEYS.map((key) => ({ type: key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!isValidTypeKey(type)) return {};
  const t = TYPES[type as TypeKey];
  return {
    title: `${t.name_kr} — 부모 성향 테스트 결과`,
    description: t.tagline,
    openGraph: {
      title: `저는 ${t.name_kr}이래요`,
      description: t.tagline,
      type: "website",
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title: `저는 ${t.name_kr}이래요`,
      description: t.tagline,
    },
  };
}

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ a?: string; b?: string }>;
}) {
  const { type } = await params;
  const { a, b } = await searchParams;

  if (!isValidTypeKey(type)) notFound();

  const t = TYPES[type];

  // URL 파라미터로 온 점수. 공유 링크로 들어온 경우 기본값(유형 정중앙)
  const percentA_gamseong = a ? Number(a) : t.coord.a === 1 ? 75 : 25;
  const percentB_gaeip = b ? Number(b) : t.coord.b === 1 ? 75 : 25;

  return (
    <main className="min-h-screen px-5 md:px-6 py-10 md:py-16">
      <div className="max-w-3xl mx-auto">
        {/* 결과 헤더 */}
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--ink-soft)] mb-6">
          Your Result
        </p>
        <h1
          className="serif text-4xl md:text-6xl leading-[1.1] tracking-tight mb-4"
          style={{ color: t.color }}
        >
          {t.name_kr}
        </h1>
        <p className="text-lg md:text-xl text-[var(--ink)] mb-4 max-w-2xl leading-relaxed">
          {t.tagline}
        </p>
        <p className="text-xs text-[var(--ink-soft)] mb-16 tracking-wider">
          · {THEORETICAL_BASIS}
        </p>

        {/* 사분면 지도 */}
        <div className="mb-20">
          <QuadrantMap
            currentType={type}
            percentA_gamseong={percentA_gamseong}
            percentB_gaeip={percentB_gaeip}
          />
        </div>

        {/* 요약 */}
        <section className="mb-12 md:mb-16">
          <SectionLabel>육아 스타일</SectionLabel>
          <p className="text-base md:text-lg leading-relaxed text-[var(--ink)]">
            {t.summary}
          </p>
        </section>

        {/* 강점 */}
        <section className="mb-16">
          <SectionLabel>강점</SectionLabel>
          <ul className="space-y-4">
            {t.strengths.map((s, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span
                  className="serif text-xl md:text-2xl leading-none mt-1 flex-shrink-0"
                  style={{ color: t.color }}
                >
                  0{i + 1}
                </span>
                <span className="text-base md:text-lg text-[var(--ink)] leading-relaxed">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* 유의점 */}
        <section className="mb-16">
          <SectionLabel>유의점</SectionLabel>
          <ul className="space-y-4">
            {t.cautions.map((c, i) => (
              <li key={i} className="text-[var(--ink-soft)] leading-relaxed">
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* 아이 성장 */}
        <section className="mb-12 md:mb-16 bg-[var(--bg-elevated)] p-6 md:p-8 border-l-4" style={{ borderColor: t.color }}>
          <SectionLabel>우리 아이는 이렇게 자라요</SectionLabel>
          <p className="text-base md:text-lg leading-relaxed text-[var(--ink)] mb-6">
            {t.child_growth}
          </p>
          <div className="mt-6 pt-6 border-t border-[var(--line)]">
            <p className="text-xs tracking-wider text-[var(--ink-soft)] mb-3">
              연구 근거
            </p>
            <p className="text-sm leading-relaxed text-[var(--ink-soft)] italic">
              {t.research_basis}
            </p>
          </div>
        </section>

        {/* 케어 팁 */}
        <section className="mb-16">
          <SectionLabel>오늘 해볼 만한 케어</SectionLabel>
          <ol className="space-y-6">
            {t.care_tips.map((tip, i) => (
              <li key={i} className="flex gap-4 md:gap-6 items-start">
                <span
                  className="serif text-3xl md:text-4xl leading-none opacity-40 flex-shrink-0"
                  style={{ color: t.color }}
                >
                  {i + 1}
                </span>
                <span className="text-base md:text-lg text-[var(--ink)] leading-relaxed">
                  {tip}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* 쿠팡 파트너스 상품 - 카테고리별 첫 후보 표시 */}
        <section className="mb-16">
          <SectionLabel>{t.name_kr}에게 어울리는 아이템</SectionLabel>
          <p className="text-sm text-[var(--ink-soft)] mb-8">
            우리 아이 성장 방향과 결이 맞는 아이템을 골라봤어요
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(() => {
              // 카테고리별 첫 후보만 추출 (중복 제거)
              const seen = new Set<string>();
              const primary = t.product_candidates.filter((p) => {
                if (seen.has(p.category)) return false;
                seen.add(p.category);
                return true;
              });
              return primary.map((p, i) => (
                <div
                  key={i}
                  className="border border-[var(--line)] bg-[var(--bg-elevated)] flex flex-col overflow-hidden"
                >
                  {/* 상품 이미지 영역 */}
                  <div className="aspect-square relative overflow-hidden">
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image_url}
                        alt={p.product_name_example}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-7xl"
                        style={{ backgroundColor: t.color + "25" }}
                      >
                        <span className="opacity-70">
                          {CATEGORY_ICONS[p.category] || "🎁"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 콘텐츠 영역 */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-[var(--ink-soft)] tracking-wider mb-3">
                      {p.category}
                    </p>
                    <p className="text-[var(--ink)] font-medium leading-snug mb-3">
                      {p.product_name_example}
                    </p>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-4 flex-1">
                      {p.reason}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[var(--ink-soft)] mb-4">
                      <span>{p.age_target}</span>
                      <span>{p.price_range}</span>
                    </div>
                    {p.coupang_link ? (
                      <a
                        href={p.coupang_link}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="inline-block text-center py-3 border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg-elevated)] transition-colors text-sm"
                      >
                        쿠팡에서 보기 →
                      </a>
                    ) : (
                      <span className="inline-block text-center py-3 border border-[var(--line)] text-[var(--ink-soft)] text-sm">
                        쿠팡 링크 준비 중
                      </span>
                    )}
                  </div>
                </div>
              ));
            })()}
          </div>
          <p className="text-[10px] text-[var(--ink-soft)] mt-6">
            * 본 페이지는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
          </p>
        </section>

        {/* 공유 */}
        <section className="mb-16 pt-16 border-t border-[var(--line)]">
          <ShareButtons hookText={t.share_hook} typeName={t.name_kr} />
        </section>

        {/* 재시작 & 다른 유형 */}
        <section className="flex flex-col gap-4">
          <Link
            href="/test"
            className="inline-block text-center bg-[var(--ink)] text-[var(--bg-elevated)] px-8 py-4 hover:bg-[var(--accent)] transition-colors"
          >
            다시 테스트하기
          </Link>
          <details className="text-sm text-[var(--ink-soft)]">
            <summary className="cursor-pointer hover:text-[var(--ink)]">
              다른 유형이 궁금해요
            </summary>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {TYPE_KEYS.filter((k) => k !== type).map((k) => {
                const other = TYPES[k];
                return (
                  <Link
                    key={k}
                    href={`/result/${k}`}
                    className="p-4 border border-[var(--line)] hover:border-[var(--ink)] transition-colors"
                  >
                    <div
                      className="w-2 h-2 rounded-full mb-2"
                      style={{ backgroundColor: other.color }}
                    />
                    <p className="text-[var(--ink)] font-medium">
                      {other.name_kr}
                    </p>
                    <p className="text-xs mt-1">{other.tagline}</p>
                  </Link>
                );
              })}
            </div>
          </details>
        </section>

        {/* 신중한 톤 문구 + 참고문헌 */}
        <section className="mt-20 pt-8 border-t border-[var(--line)]">
          <p className="text-xs text-[var(--ink-soft)] leading-relaxed mb-6">
            {DISCLAIMER}
          </p>
          <details className="text-xs text-[var(--ink-soft)]">
            <summary className="cursor-pointer hover:text-[var(--ink)] tracking-wider">
              참고문헌 ({REFERENCES.length})
            </summary>
            <ol className="mt-4 space-y-2 pl-4">
              {REFERENCES.map((ref) => (
                <li key={ref.id} className="leading-relaxed">
                  [{ref.id}] {ref.citation}
                </li>
              ))}
            </ol>
          </details>
        </section>

        {/* 서명 */}
        <footer className="mt-16 pt-8 border-t border-[var(--line)] text-xs text-[var(--ink-soft)]">
          made by 259
        </footer>
      </div>
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs tracking-[0.3em] uppercase text-[var(--ink-soft)] mb-6">
      {children}
    </p>
  );
}
