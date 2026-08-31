"use client";

import { useState } from "react";

interface Props {
  typeKey: string; // nurturer/planner/freeflow/observer (URL 파라미터용)
  typeName: string; // 감성형 부모 등 (메시지에 표시)
  color: string;
}

export default function TopShareCTA({ typeKey, typeName, color }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // 결과 페이지 URL로 공유 (친구가 결과 확인하며 함께 대화, 쿠팡 링크 노출)
    const url = `${window.location.origin}/result/${typeKey}`;
    const title = `저는 ${typeName}래요`;
    // 유형명을 앞에 배치해 카톡 메시지 첫 줄에서 강조
    const text = `저는 ${typeName}래요 😊\n\n당신은 어떤 유형일까요?\n지금 5분 안에 진단해보세요`;

    // Web Share API 지원 시 (모바일 대부분) 네이티브 공유 시트
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
      // 미지원 브라우저(주로 데스크탑): 링크 복사로 fallback
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
