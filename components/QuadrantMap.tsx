import { TYPES, TypeKey } from "@/lib/data";

interface Props {
  currentType: TypeKey;
  // 나의 정확한 좌표 (백분율 기반)
  percentA_gamseong: number; // 0-100
  percentB_gaeip: number; // 0-100
}

/**
 * 결과 페이지의 시그니처 요소.
 * 4사분면에 각 유형이 배치되고, 나의 실제 좌표에 큰 점이 찍힘.
 * MBTI 아류 배지와 차별화되는 심리 지도 시각화.
 */
export default function QuadrantMap({
  currentType,
  percentA_gamseong,
  percentB_gaeip,
}: Props) {
  const types = Object.values(TYPES);
  const current = TYPES[currentType];

  // 백분율 → 화면 좌표
  // 축A(감성/이성)는 가로. 감성 100% = 왼쪽 끝, 감성 0% = 오른쪽 끝
  const myLeft = `${100 - percentA_gamseong}%`;
  // 축B(개입/자율)는 세로. 개입 100% = 위쪽 끝, 개입 0% = 아래쪽 끝
  const myTop = `${100 - percentB_gaeip}%`;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-square bg-[var(--bg-elevated)] border border-[var(--line)]">
        {/* 축 라벨 - 박스 안쪽 배치 (모바일 오버플로우 방지) */}
        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-[var(--ink-soft)] tracking-wider bg-[var(--bg-elevated)] px-1.5 z-10">
          개입
        </span>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-[var(--ink-soft)] tracking-wider bg-[var(--bg-elevated)] px-1.5 z-10">
          자율
        </span>
        <span className="absolute top-1/2 left-2 -translate-y-1/2 text-[10px] text-[var(--ink-soft)] tracking-wider bg-[var(--bg-elevated)] px-1.5 z-10">
          감성
        </span>
        <span className="absolute top-1/2 right-2 -translate-y-1/2 text-[10px] text-[var(--ink-soft)] tracking-wider bg-[var(--bg-elevated)] px-1.5 z-10">
          이성
        </span>

        {/* 십자선 */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--line)]" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-[var(--line)]" />

        {/* 4개 유형 마커 (내 유형 제외한 나머지는 흐리게) */}
        {types.map((t, i) => {
          const top = t.coord.b === 1 ? "25%" : "75%";
          const left = t.coord.a === 1 ? "25%" : "75%";
          const isMe = t.key === currentType;
          if (isMe) return null; // 내 유형은 YOU 마커가 대신
          return (
            <div
              key={t.key}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{
                top,
                left,
                opacity: 0,
                animation: `typeDotFadeIn 0.5s ease-out ${0.3 + i * 0.15}s both`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full mx-auto mb-1"
                style={{ backgroundColor: t.color }}
              />
              <span className="text-[10px] text-[var(--ink-soft)] whitespace-nowrap">
                {t.name_kr}
              </span>
            </div>
          );
        })}

        {/* 나의 위치 마커 (백분율 기반 정확한 좌표) */}
        <div
          className="absolute"
          style={{
            top: myTop,
            left: myLeft,
            transform: "translate(-50%, -50%)",
            animation: "youMarkerPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 1.0s both",
          }}
        >
          {/* 펄스 링 */}
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              backgroundColor: current.color,
              opacity: 0.3,
              width: "24px",
              height: "24px",
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
              animationDelay: "1.7s",
            }}
          />
          {/* 실제 점 */}
          <div
            className="w-6 h-6 rounded-full border-2 border-white shadow-md relative z-10"
            style={{ backgroundColor: current.color }}
          />
          <span
            className="absolute top-full mt-2 left-1/2 text-xs font-medium whitespace-nowrap"
            style={{
              color: current.color,
              opacity: 0,
              animation: "youLabelSlideIn 0.4s ease-out 1.7s both",
            }}
          >
            YOU
          </span>
        </div>
      </div>

      {/* 축별 백분율 */}
      <div className="mt-10 flex justify-between text-xs text-[var(--ink-soft)] tracking-wider">
        <span>
          감성 {percentA_gamseong}% · 이성 {100 - percentA_gamseong}%
        </span>
        <span>
          개입 {percentB_gaeip}% · 자율 {100 - percentB_gaeip}%
        </span>
      </div>
    </div>
  );
}
