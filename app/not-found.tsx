import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 md:px-6 py-16">
      <div className="max-w-lg w-full text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--ink-soft)] mb-8">
          404 · Not Found
        </p>

        <h1 className="serif text-4xl md:text-5xl leading-tight tracking-tight mb-6">
          이 페이지는
          <br />
          아직 없어요
        </h1>

        <p className="text-base md:text-lg text-[var(--ink-soft)] leading-relaxed mb-10">
          찾으시는 유형이나 페이지가 존재하지 않아요.
          <br />
          부모 성향 테스트를 처음부터 시작해보세요.
        </p>

        <Link
          href="/"
          className="inline-block bg-[var(--ink)] text-[var(--bg-elevated)] px-10 py-4 text-base md:text-lg tracking-wide hover:bg-[var(--accent)] transition-colors"
        >
          테스트 시작하기 →
        </Link>
      </div>
    </main>
  );
}
