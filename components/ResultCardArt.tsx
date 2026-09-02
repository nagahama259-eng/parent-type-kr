import { TypeContent } from "@/lib/data";
import { CARD_OVERLAY } from "@/lib/cardOverlay";

interface Props {
  type: TypeContent;
  className?: string;
}

// 결과 카드 일러스트 위에 유형명(리본)과 4축 키워드(캡슐 3개, D축은 생략)를
// 이미지별 실측 좌표로 오버레이하는 컴포넌트
export default function ResultCardArt({ type, className }: Props) {
  const overlay = CARD_OVERLAY[type.key];
  const kw1 = type.coord.a === 1 ? "감성적" : "이성적";
  const kw2 = type.coord.b === 1 ? "개입형" : "자율형";
  const kw3 = type.coord.c === 1 ? "원칙형" : "융통형";

  return (
    <div
      className={`sticker relative w-full max-w-[340px] mx-auto rounded-2xl overflow-hidden ${className ?? ""}`}
      style={{ aspectRatio: `420 / ${overlay.height}`, containerType: "inline-size" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={type.image}
        alt={type.name_kr}
        className="w-full h-full object-cover block"
      />

      <div
        className="hand absolute font-bold flex items-center justify-center text-center leading-none"
        style={{
          left: "50%",
          top: `${overlay.titleTop}%`,
          transform: "translate(-50%, -50%)",
          width: `${overlay.titleWidth}%`,
          height: "6%",
          fontSize: `${(overlay.fontSize / 420) * 100}cqw`,
          color: "#272326",
        }}
      >
        {type.name_kr}
      </div>

      <Keyword left={overlay.x1} top={overlay.capsuleTop} label={kw1} />
      <Keyword left={overlay.x2} top={overlay.capsuleTop} label={kw2} />
      <Keyword left={overlay.x3} top={overlay.capsuleTop} label={kw3} />
    </div>
  );
}

function Keyword({ left, top, label }: { left: number; top: number; label: string }) {
  return (
    <div
      className="absolute font-extrabold text-center"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: "translate(-50%, -50%)",
        width: "22%",
        fontSize: "3.1cqw",
        color: "#272326",
      }}
    >
      {label}
    </div>
  );
}
