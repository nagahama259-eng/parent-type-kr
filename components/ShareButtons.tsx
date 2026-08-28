"use client";

import { useState } from "react";

interface Props {
  hookText: string; // 공유 훅 카피
}

export default function ShareButtons({ hookText }: Props) {
  const [copied, setCopied] = useState(false);

  // 결과 URL이 아니라 랜딩 페이지 URL을 공유 (친구가 자기 테스트 시작하도록)
  const url = typeof window !== "undefined" ? window.location.origin + "/" : "";
  const shareText = `${hookText}\n\n나는 어떤 부모일까? 지금 테스트해보기 ↓`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: legacy
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    hookText
  )}&url=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs tracking-[0.3em] uppercase text-[var(--ink-soft)]">
        Share
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className="px-5 py-3 border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg-elevated)] transition-colors text-sm"
        >
          {copied ? "복사되었어요 ✓" : "링크 복사"}
        </button>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg-elevated)] transition-colors text-sm"
        >
          트위터로 공유
        </a>
      </div>
      <p className="text-xs text-[var(--ink-soft)] mt-2">
        친구가 자기 유형을 확인할 수 있는 테스트 링크가 공유돼요
      </p>
    </div>
  );
}
