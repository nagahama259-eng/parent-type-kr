"use client";

import { useState } from "react";

interface Props {
  hookText: string; // 공유 훅 카피
  typeName: string;
}

export default function ShareButtons({ hookText, typeName }: Props) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${hookText}\n\n${url}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
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
        {typeName} 결과 카드가 공유돼요
      </p>
    </div>
  );
}
