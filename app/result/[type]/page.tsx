import Link from "next/link";
import { notFound } from "next/navigation";
import {
  TYPES,
  TypeKey,
  TYPE_KEYS,
  THEORETICAL_BASIS,
  REFERENCES,
  DISCLAIMER,
  CATEGORY_ICONS,
  PRODUCT_CATALOG,
  COMPATIBILITY_MESSAGES,
} from "@/lib/data";
import { isValidTypeKey } from "@/lib/scoring";
import QuadrantMap from "@/components/QuadrantMap";
import ShareButtons from "@/components/ShareButtons";
import TopShareCTA from "@/components/TopShareCTA";
import ResultCardArt from "@/components/ResultCardArt";

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
  searchParams: Promise<{ a?: string; b?: string; c?: string; d?: string }>;
}) {
  const { type } = await params;
  const { a, b, c, d } = await searchParams;

  if (!isValidTypeKey(type)) notFound();

  const t = TYPES[type];
  const compatible = TYPES[t.compatible_type];
  const clash = TYPES[t.clash_type];

  // URL 파라미터로 온 점수. 공유 링크로 들어온 경우 기본값(유형 좌표 반영)
  const pctA = a ? Number(a) : t.coord.a === 1 ? 75 : 25;
  const pctB = b ? Number(b) : t.coord.b === 1 ? 75 : 25;
  const pctC = c ? Number(c) : t.coord.c === 1 ? 75 : 25;
  const pctD = d ? Number(d) : t.coord.d === 1 ? 75 : 25;

  // 유형의 6개 상품
  const products = t.product_categories
    .map((cat) => PRODUCT_CATALOG[cat])
    .filter(Boolean);

  return (
    <main className="min-h-screen px-5 md:px-6 py-10 md:py-16">
      <div className="max-w-3xl mx-auto">
        {/* 결과 헤더 */}
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--ink-soft)] mb-6">
          Your Result
        </p>

        {/* 결과 카드 일러스트 (리본에 유형명, 캡슐에 키워드) */}
        <div className="mb-8">
          <ResultCardArt type={t} />
        </div>

        <h1
          className="hand text-4xl md:text-6xl leading-[1.15] font-bold mb-4 text-center"
          style={{ color: t.color }}
        >
          {t.name_kr}
        </h1>
        <p className="text-lg md:text-xl text-[var(--ink)] mb-4 max-w-2xl mx-auto text-center leading-relaxed">
          {t.tagline}
        </p>
        <p className="text-xs text-[var(--ink-soft)] mb-16 text-center">
          · {THEORETICAL_BASIS}
        </p>

        {/* 사분면 지도 - 계열 위치 + 4축 백분율 */}
        <div className="mb-12 md:mb-16">
          <QuadrantMap
            currentType={type}
            pctA={pctA}
            pctB={pctB}
            pctC={pctC}
            pctD={pctD}
          />
        </div>

        {/* 상단 공유 CTA */}
        <div className="mb-16 md:mb-20">
          <TopShareCTA typeKey={type} typeName={t.name_kr} color={t.color} />
          <p className="text-xs text-[var(--ink-soft)] text-center mt-3">
            친구가 어떤 유형인지 궁금하지 않으세요?
          </p>
        </div>

        {/* 요약 */}
        <section className="mb-12 md:mb-16">
          <SectionLabel>육아 스타일</SectionLabel>
          <p className="text-base md:text-lg leading-relaxed text-[var(--ink)]">
            {t.summary}
          </p>
        </section>

        {/* 강점 */}
        <section className="mb-12 md:mb-16">
          <SectionLabel>강점</SectionLabel>
          <ul className="space-y-3">
            {t.strengths.map((s, i) => (
              <li
                key={i}
                className="sticker flex gap-4 items-start bg-white rounded-2xl p-4"
              >
                <span
                  className="hand text-xl md:text-2xl leading-none mt-0.5 flex-shrink-0 font-bold"
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
        <section className="mb-12 md:mb-16">
          <SectionLabel>유의점</SectionLabel>
          <ul className="space-y-3">
            {t.cautions.map((c, i) => (
              <li
                key={i}
                className="sticker bg-[var(--butter)] rounded-2xl p-4 text-[var(--ink)] leading-relaxed"
              >
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* 아이 성장 + 논문 근거 */}
        <section
          className="sticker mb-12 md:mb-16 rounded-2xl p-6 md:p-8"
          style={{ background: t.color }}
        >
          <SectionLabel>우리 아이는 이렇게 자라요</SectionLabel>
          <p className="text-base md:text-lg leading-relaxed text-[var(--ink)] mb-6">
            {t.child_growth}
          </p>
          <div className="mt-6 pt-6 border-t-2 border-[var(--ink)]/15">
            <p className="text-xs font-bold text-[var(--ink-soft)] mb-3">
              연구 근거
            </p>
            <p className="text-sm leading-relaxed text-[rgba(39,35,38,0.8)] italic">
              {t.research_basis}
            </p>
          </div>
        </section>

        {/* 케어 팁 */}
        <section className="mb-12 md:mb-16">
          <SectionLabel>오늘 해볼 만한 케어</SectionLabel>
          <ol className="space-y-3">
            {t.care_tips.map((tip, i) => (
              <li
                key={i}
                className="sticker flex gap-4 md:gap-5 items-start bg-white rounded-2xl p-4 md:p-5"
              >
                <span
                  className="hand text-3xl md:text-4xl leading-none flex-shrink-0 font-bold opacity-60"
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

        {/* 육아 동반자 궁합 (배우자 유형) */}
        <section className="mb-12 md:mb-16">
          <SectionLabel>육아 동반자 궁합</SectionLabel>
          <p className="text-sm text-[var(--ink-soft)] mb-6">
            배우자와 함께 테스트해서 어떤 조합인지 확인해보세요
          </p>

          {/* 찰떡궁합 */}
          <div
            className="sticker mb-4 rounded-2xl p-6"
            style={{ background: compatible.color }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="sticker text-xs font-bold bg-white px-2.5 py-1 rounded-full text-[var(--ink)]">
                찰떡궁합
              </span>
              <Link
                href={`/result/${compatible.key}`}
                className="hand text-lg md:text-xl font-bold hover:underline text-[var(--ink)]"
              >
                {compatible.name_kr}
              </Link>
            </div>
            <p className="text-sm text-[rgba(39,35,38,0.75)] mb-3">
              {compatible.tagline}
            </p>
            <p className="text-sm leading-relaxed text-[var(--ink)]">
              {COMPATIBILITY_MESSAGES.match}
            </p>
          </div>

          {/* 노력이 필요한 관계 */}
          <div className="sticker bg-white rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="sticker text-xs font-bold bg-[var(--bg)] px-2.5 py-1 rounded-full text-[var(--ink-soft)]">
                서로 노력이 필요한 관계
              </span>
              <Link
                href={`/result/${clash.key}`}
                className="hand text-lg md:text-xl font-bold hover:underline text-[var(--ink)]"
              >
                {clash.name_kr}
              </Link>
            </div>
            <p className="text-sm text-[var(--ink-soft)] mb-3">
              {clash.tagline}
            </p>
            <p className="text-sm leading-relaxed text-[var(--ink)]">
              {COMPATIBILITY_MESSAGES.clash}
            </p>
          </div>
        </section>

        {/* 쿠팡 상품 */}
        <section className="mb-16">
          <SectionLabel>{t.name_kr}에게 어울리는 아이템</SectionLabel>
          <p className="text-sm text-[var(--ink-soft)] mb-8">
            우리 아이 성장 방향과 결이 맞는 아이템을 골라봤어요
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {products.map((p, i) => (
              <div
                key={i}
                className="sticker rounded-2xl bg-white flex flex-col overflow-hidden"
              >
                {/* 상품 이미지 영역 */}
                <div className="aspect-square relative overflow-hidden border-b-[3px] border-[var(--ink)]">
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
                      style={{ backgroundColor: t.color + "55" }}
                    >
                      <span className="opacity-70">
                        {CATEGORY_ICONS[p.category] || "🎁"}
                      </span>
                    </div>
                  )}
                </div>

                {/* 콘텐츠 영역 */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs font-bold text-[var(--ink-soft)] mb-3">
                    {p.category}
                  </p>
                  <p className="text-[var(--ink)] font-bold leading-snug mb-3">
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
                      className="sticker inline-block text-center py-3 rounded-xl bg-[var(--accent)] text-white hover:brightness-105 transition-all text-sm font-bold"
                    >
                      쿠팡에서 보기 →
                    </a>
                  ) : (
                    <span className="inline-block text-center py-3 rounded-xl border-2 border-dashed border-[var(--line)] text-[var(--ink-soft)] text-sm">
                      쿠팡 링크 준비 중
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[var(--ink-soft)] mt-6">
            * 본 페이지는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
          </p>
        </section>

        {/* 공유 */}
        <section className="mb-16 pt-16 border-t-2 border-dashed border-[var(--line)]">
          <ShareButtons typeKey={type} typeName={t.name_kr} />
        </section>

        {/* 재시작 & 계열 내 다른 유형 */}
        <section className="flex flex-col gap-8">
          <div>
            <SectionLabel>같은 계열의 다른 유형</SectionLabel>
            <p className="text-xs text-[var(--ink-soft)] mb-4">
              같은 색 계열은 비슷한 육아 가치관을 가진 유형들입니다
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {TYPE_KEYS.filter(
                (k) => k !== type && TYPES[k].family === t.family
              ).map((k) => {
                const other = TYPES[k];
                return (
                  <Link
                    key={k}
                    href={`/result/${k}`}
                    className="sticker p-5 rounded-2xl bg-white hover:brightness-95 transition-all flex flex-col"
                  >
                    <div
                      className="sticker w-3.5 h-3.5 rounded-full mb-3"
                      style={{ backgroundColor: other.color }}
                    />
                    <p className="text-[var(--ink)] font-bold mb-2">
                      {other.name_kr}
                    </p>
                    <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                      {other.tagline}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          <Link
            href="/"
            className="sticker inline-block text-center bg-[var(--accent)] text-white px-8 py-4 rounded-2xl font-bold hover:brightness-105 transition-all"
          >
            다시 테스트하기
          </Link>
        </section>

        {/* 신중한 톤 문구 + 참고문헌 */}
        <section className="mt-20 pt-8 border-t-2 border-dashed border-[var(--line)]">
          <p className="text-xs text-[var(--ink-soft)] leading-relaxed mb-6">
            {DISCLAIMER}
          </p>
          <details className="text-xs text-[var(--ink-soft)]">
            <summary className="cursor-pointer hover:text-[var(--ink)] font-bold">
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
        <footer className="mt-16 pt-8 border-t-2 border-dashed border-[var(--line)] text-xs text-[var(--ink-soft)]">
          made by 259
        </footer>
      </div>
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-widest uppercase text-[var(--ink-soft)] mb-6">
      {children}
    </p>
  );
}
