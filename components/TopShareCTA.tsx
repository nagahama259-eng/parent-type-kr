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
    const url = window.location.href;
    const title = `저는 ${typeName}이래요`;
    const text = `${hookText}\n\n부모 성향 테스트 결과 확인하기 ↓`;

    // Web Share API 지원 시 (모바일 대부분 + 최신 데스크탑) 네이티브 공유 시트
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, text, url });
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
