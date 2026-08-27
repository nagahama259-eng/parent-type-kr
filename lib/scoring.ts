import { QUESTIONS, TYPES, TypeKey, Weight } from "./data";

export interface Answer {
  questionId: number;
  weight: Weight;
}

export interface ScoreResult {
  type: TypeKey;
  // 축 A: 감성 vs 이성 (감성 응답 개수 0~10)
  scoreA_gamseong: number;
  scoreA_iseong: number;
  // 축 B: 개입 vs 자율
  scoreB_gaeip: number;
  scoreB_jayul: number;
  // 백분율 (공유 카드용)
  percentA_gamseong: number;
  percentB_gaeip: number;
}

export function calculateResult(answers: Answer[]): ScoreResult {
  const axisAAnswers = answers.filter((a) => {
    const q = QUESTIONS.find((q) => q.id === a.questionId);
    return q?.axis === "A";
  });
  const axisBAnswers = answers.filter((a) => {
    const q = QUESTIONS.find((q) => q.id === a.questionId);
    return q?.axis === "B";
  });

  const scoreA_gamseong = axisAAnswers.filter((a) => a.weight === "감성").length;
  const scoreA_iseong = axisAAnswers.filter((a) => a.weight === "이성").length;
  const scoreB_gaeip = axisBAnswers.filter((a) => a.weight === "개입").length;
  const scoreB_jayul = axisBAnswers.filter((a) => a.weight === "자율").length;

  // 5-5 동점은 감성/개입 쪽으로 (따뜻한 결과 쪽으로 기울임)
  const isGamseong = scoreA_gamseong >= scoreA_iseong;
  const isGaeip = scoreB_gaeip >= scoreB_jayul;

  let type: TypeKey;
  if (isGamseong && isGaeip) type = "nurturer";
  else if (!isGamseong && isGaeip) type = "planner";
  else if (isGamseong && !isGaeip) type = "freeflow";
  else type = "observer";

  const totalA = axisAAnswers.length || 10;
  const totalB = axisBAnswers.length || 10;

  return {
    type,
    scoreA_gamseong,
    scoreA_iseong,
    scoreB_gaeip,
    scoreB_jayul,
    percentA_gamseong: Math.round((scoreA_gamseong / totalA) * 100),
    percentB_gaeip: Math.round((scoreB_gaeip / totalB) * 100),
  };
}

// 유형 키가 유효한지 검증 (동적 라우트 방어)
export function isValidTypeKey(key: string): key is TypeKey {
  return key in TYPES;
}
