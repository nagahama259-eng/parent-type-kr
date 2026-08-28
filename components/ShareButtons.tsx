"use client";

import { useState } from "react";

interface Props {
  typeKey: string;
  typeName: string;
}

export default function ShareButtons({ typeKey, typeName }: Props) {
  const [copied, setCopied] = useState(false);

  // 랜딩 URL + from 파라미터 → 유형별 미리보기 이미지 자동 매칭
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/?from=${typeKey}`
      : "";
  const shareText = `저는 ${typeName}래요 😊\n\n당신은 어떤 유형일까요?\n지금 3분 안에 진단해보세요 ↓`;

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
    shareText
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
        친구가 클릭하면 {typeName} 결과 이미지가 카톡 미리보기로 뜹니다
      </p>
    </div>
  );
}
