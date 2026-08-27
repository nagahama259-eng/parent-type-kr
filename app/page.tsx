import Link from "next/link";
import { TYPES, THEORETICAL_BASIS } from "@/lib/data";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full">
        {/* 헤더 아이브로우 */}
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--ink-soft)] mb-8">
          Parenting Type Test · 20 Questions
        </p>

        {/* 히어로 */}
        <h1 className="serif text-5xl md:text-6xl leading-[1.15] tracking-tight mb-8">
          당신은 어떤
          <br />
          <span className="text-[var(--accent)]">부모</span>인가요?
        </h1>

        <p className="text-lg text-[var(--ink-soft)] leading-relaxed mb-6 max-w-lg">
          감성과 이성, 개입과 자율 두 축 위에 나의 육아 스타일을 찍어봅니다.
          결과 페이지에서 우리 아이의 성장 방향과 오늘 바로 해볼 만한 케어 팁을 받아보세요.
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
          소요 시간 약 3분 · 20문항
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
      {/* 축 라벨 */}
      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-[var(--ink-soft)]">
        개입
      </span>
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-[var(--ink-soft)]">
        자율
      </span>
      <span className="absolute top-1/2 -left-8 -translate-y-1/2 text-xs text-[var(--ink-soft)] rotate-[-90deg] origin-center">
        감성
      </span>
      <span className="absolute top-1/2 -right-8 -translate-y-1/2 text-xs text-[var(--ink-soft)] rotate-90 origin-center">
        이성
      </span>

      {/* 십자선 */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--line)]" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-[var(--line)]" />

      {/* 4개 유형 점 — 축 A(감성/이성)=가로, 축 B(개입/자율)=세로 */}
      {types.map((t) => {
        const top = t.coord.b === 1 ? "25%" : "75%";
        const left = t.coord.a === 1 ? "25%" : "75%";
        return (
          <div
            key={t.key}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ top, left }}
          >
            <div
              className="w-3 h-3 rounded-full mx-auto mb-2"
              style={{ backgroundColor: t.color }}
            />
            <span className="text-xs text-[var(--ink)] whitespace-nowrap">
              {t.name_kr}
            </span>
          </div>
        );
      })}
    </div>
  );
}
