"use client";

import { useState } from "react";

interface Props {
  typeKey: string;
  typeName: string;
}

export default function ShareButtons({ typeKey, typeName }: Props) {
  const [copied, setCopied] = useState(false);

  // 결과 페이지 URL로 공유 (친구가 결과 확인하며 함께 대화, 쿠팡 링크 노출)
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/result/${typeKey}`
      : "";
  const shareText = `저는 ${typeName}래요 😊\n\n당신은 어떤 유형일까요?\n지금 5분 안에 진단해보세요`;

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
      <p className="text-xs font-bold tracking-widest uppercase text-[var(--ink-soft)]">
        Share
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className="sticker px-5 py-3 rounded-xl bg-white text-[var(--ink)] font-bold hover:bg-[var(--accent-soft)] transition-colors text-sm"
        >
          {copied ? "복사되었어요 ✓" : "링크 복사"}
        </button>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sticker px-5 py-3 rounded-xl bg-white text-[var(--ink)] font-bold hover:bg-[var(--accent-soft)] transition-colors text-sm"
        >
          트위터로 공유
        </a>
      </div>
      <p className="text-xs text-[var(--ink-soft)] mt-2">
        {typeName} 결과 페이지가 공유돼 친구와 함께 확인할 수 있어요
      </p>
    </div>
  );
}
