"use client";

import { useState } from "react";

interface Props {
  typeName: string;
  hookText: string;
  color: string;
}

export default function TopShareCTA({ typeName, hookText, color }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // 결과 URL이 아니라 랜딩 페이지 URL을 공유
    // → 친구가 소개글부터 보고 자기 테스트 진행하도록 유도
    const url = window.location.origin + "/";
    const title = `저는 ${typeName}이래요`;
    const text = `${hookText}\n\n나는 어떤 부모일까? 지금 테스트해보기 ↓`;

    // Web Share API 지원 시 (모바일 대부분 + 최신 데스크탑) 네이티브 공유 시트
    const nav = navigator as Navigator & {
      share?: (data: ShareData) => Promise<void>;
    };

    if (typeof nav.share === "function") {
      try {
        await nav.share({ title, text, url });
      } catch {
        // 사용자 취소 시 아무것도 안 함
      }
    } else {
      // 미지원 브라우저: 링크 복사로 fallback
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // 클립보드도 실패 시 조용히 무시
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full py-4 md:py-5 text-white font-medium text-base md:text-lg hover:opacity-90 transition-opacity"
      style={{ backgroundColor: color }}
    >
      {copied ? "링크가 복사되었어요 ✓" : "친구에게 결과 공유하기 →"}
    </button>
  );
}
