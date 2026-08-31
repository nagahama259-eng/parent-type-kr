import { TYPES, TypeKey, FAMILY_COLORS, Family } from "@/lib/data";

interface Props {
  currentType: TypeKey;
  pctA: number; // 감성 %
  pctB: number; // 개입 %
  pctC: number; // 원칙 %
  pctD: number; // 도전 %
}

/**
 * 결과 페이지 시그니처 시각화.
 * 상단: 2축 사분면 지도 (감성/이성 × 개입/자율) - 계열 4개 위치, YOU 마커
 * 하단: C·D 축 백분율 바 (원칙 vs 융통, 도전 vs 안정)
 */
export default function QuadrantMap({
  currentType,
  pctA,
  pctB,
  pctC,
  pctD,
}: Props) {
  const current = TYPES[currentType];
  const currentFamily = current.family;

  // 계열별 좌표 (2축 사분면 위 위치)
  const familyPositions: Record<Family, { top: string; left: string; label: string }> = {
    nurturer: { top: "25%", left: "25%", label: "감성·개입" },
    planner: { top: "25%", left: "75%", label: "이성·개입" },
    supporter: { top: "75%", left: "25%", label: "감성·자율" },
    observer: { top: "75%", left: "75%", label: "이성·자율" },
  };

  // 내 위치 (백분율 기반 정확한 좌표)
  const myLeft = `${100 - pctA}%`;
  const myTop = `${100 - pctB}%`;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* 사분면 지도 */}
      <div className="relative aspect-square bg-[var(--bg-elevated)] border border-[var(--line)]">
        {/* 축 라벨 - 박스 안쪽 배치 */}
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

        {/* 4개 계열 마커 (내 계열 제외한 나머지 흐리게) */}
        {(Object.keys(familyPositions) as Family[]).map((family, i) => {
          const pos = familyPositions[family];
          const isMe = family === currentFamily;
          if (isMe) return null;
          return (
            <div
              key={family}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{
                top: pos.top,
                left: pos.left,
                opacity: 0,
                animation: `typeDotFadeIn 0.5s ease-out ${0.3 + i * 0.15}s both`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full mx-auto mb-1"
                style={{ backgroundColor: FAMILY_COLORS[family] }}
              />
              <span className="text-[10px] text-[var(--ink-soft)] whitespace-nowrap">
                {pos.label}
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
              transform: "translateX(-50%)",
            }}
          >
            {current.name_kr}
          </span>
        </div>
      </div>

      {/* 축 A/B 백분율 */}
      <div className="mt-10 flex justify-between text-xs text-[var(--ink-soft)] tracking-wider">
        <span>
          감성 {pctA}% · 이성 {100 - pctA}%
        </span>
        <span>
          개입 {pctB}% · 자율 {100 - pctB}%
        </span>
      </div>

      {/* 축 C, D 백분율 바 */}
      <div className="mt-8 space-y-5">
        <AxisBar
          leftLabel="원칙"
          rightLabel="융통"
          leftPct={pctC}
          color={current.color}
        />
        <AxisBar
          leftLabel="도전"
          rightLabel="안정"
          leftPct={pctD}
          color={current.color}
        />
      </div>
    </div>
  );
}

function AxisBar({
  leftLabel,
  rightLabel,
  leftPct,
  color,
}: {
  leftLabel: string;
  rightLabel: string;
  leftPct: number;
  color: string;
}) {
  const isLeft = leftPct >= 50;
  return (
    <div>
      <div className="flex justify-between text-xs text-[var(--ink-soft)] tracking-wider mb-2">
        <span
          className={isLeft ? "font-medium" : ""}
          style={isLeft ? { color } : {}}
        >
          {leftLabel} {leftPct}%
        </span>
        <span
          className={!isLeft ? "font-medium" : ""}
          style={!isLeft ? { color } : {}}
        >
          {rightLabel} {100 - leftPct}%
        </span>
      </div>
      <div className="relative h-1.5 bg-[var(--line)] rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: `${leftPct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
