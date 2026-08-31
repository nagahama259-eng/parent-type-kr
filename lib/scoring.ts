import { QUESTIONS, TYPES, TypeKey, TYPE_KEYS, Weight } from "./data";

export interface Answer {
  questionId: number;
  weight: Weight;
}

export interface ScoreResult {
  type: TypeKey;
  // 각 축별 점수
  scoreA_gamseong: number; // 감성 응답 수
  scoreA_iseong: number;
  scoreB_gaeip: number;
  scoreB_jayul: number;
  scoreC_wonchik: number; // 원칙
  scoreC_yungtong: number; // 융통
  scoreD_dojeon: number; // 도전
  scoreD_anjeong: number; // 안정
  // 백분율 (첫 옵션 우세도)
  percentA_gamseong: number;
  percentB_gaeip: number;
  percentC_wonchik: number;
  percentD_dojeon: number;
}

export function calculateResult(answers: Answer[]): ScoreResult {
  const axisA = answers.filter((a) => {
    const q = QUESTIONS.find((q) => q.id === a.questionId);
    return q?.axis === "A";
  });
  const axisB = answers.filter((a) => {
    const q = QUESTIONS.find((q) => q.id === a.questionId);
    return q?.axis === "B";
  });
  const axisC = answers.filter((a) => {
    const q = QUESTIONS.find((q) => q.id === a.questionId);
    return q?.axis === "C";
  });
  const axisD = answers.filter((a) => {
    const q = QUESTIONS.find((q) => q.id === a.questionId);
    return q?.axis === "D";
  });

  const scoreA_gamseong = axisA.filter((a) => a.weight === "감성").length;
  const scoreA_iseong = axisA.filter((a) => a.weight === "이성").length;
  const scoreB_gaeip = axisB.filter((a) => a.weight === "개입").length;
  const scoreB_jayul = axisB.filter((a) => a.weight === "자율").length;
  const scoreC_wonchik = axisC.filter((a) => a.weight === "원칙").length;
  const scoreC_yungtong = axisC.filter((a) => a.weight === "융통").length;
  const scoreD_dojeon = axisD.filter((a) => a.weight === "도전").length;
  const scoreD_anjeong = axisD.filter((a) => a.weight === "안정").length;

  // 각 축 우세 판정 (동점은 첫 옵션 - 감성/개입/원칙/도전 쪽으로)
  const isGamseong = scoreA_gamseong >= scoreA_iseong;
  const isGaeip = scoreB_gaeip >= scoreB_jayul;
  const isWonchik = scoreC_wonchik >= scoreC_yungtong;
  const isDojeon = scoreD_dojeon >= scoreD_anjeong;

  // 16 유형 매핑 (family_specific 조합)
  const type = getTypeKey(isGamseong, isGaeip, isWonchik, isDojeon);

  const totalA = axisA.length || 1;
  const totalB = axisB.length || 1;
  const totalC = axisC.length || 1;
  const totalD = axisD.length || 1;

  return {
    type,
    scoreA_gamseong,
    scoreA_iseong,
    scoreB_gaeip,
    scoreB_jayul,
    scoreC_wonchik,
    scoreC_yungtong,
    scoreD_dojeon,
    scoreD_anjeong,
    percentA_gamseong: Math.round((scoreA_gamseong / totalA) * 100),
    percentB_gaeip: Math.round((scoreB_gaeip / totalB) * 100),
    percentC_wonchik: Math.round((scoreC_wonchik / totalC) * 100),
    percentD_dojeon: Math.round((scoreD_dojeon / totalD) * 100),
  };
}

// 4축 boolean → TypeKey
function getTypeKey(
  gamseong: boolean,
  gaeip: boolean,
  wonchik: boolean,
  dojeon: boolean
): TypeKey {
  // nurturer 계열 (감성+개입)
  if (gamseong && gaeip) {
    if (wonchik && !dojeon) return "nurturer_guardian";
    if (wonchik && dojeon) return "nurturer_pioneer";
    if (!wonchik && !dojeon) return "nurturer_helper";
    return "nurturer_companion"; // !wonchik && dojeon
  }
  // supporter 계열 (감성+자율)
  if (gamseong && !gaeip) {
    if (wonchik && !dojeon) return "supporter_cheer";
    if (wonchik && dojeon) return "supporter_coach";
    if (!wonchik && !dojeon) return "supporter_friend";
    return "supporter_artist";
  }
  // planner 계열 (이성+개입)
  if (!gamseong && gaeip) {
    if (wonchik && !dojeon) return "planner_architect";
    if (wonchik && dojeon) return "planner_conductor";
    if (!wonchik && !dojeon) return "planner_navigator";
    return "planner_advisor";
  }
  // observer 계열 (이성+자율)
  if (wonchik && !dojeon) return "observer_lighthouse";
  if (wonchik && dojeon) return "observer_mentor";
  if (!wonchik && !dojeon) return "observer_watcher";
  return "observer_explorer";
}

// 유효한 TypeKey인지 검증
export function isValidTypeKey(key: string): key is TypeKey {
  return TYPE_KEYS.includes(key as TypeKey);
}
