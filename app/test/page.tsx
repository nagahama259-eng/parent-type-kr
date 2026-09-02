"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, Weight } from "@/lib/data";
import { calculateResult, Answer } from "@/lib/scoring";

export default function TestPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const q = QUESTIONS[current];
  const progress = useMemo(
    () => Math.round((current / QUESTIONS.length) * 100),
    [current]
  );

  const handleChoose = (weight: Weight) => {
    const nextAnswers = [...answers, { questionId: q.id, weight }];
    setAnswers(nextAnswers);

    if (current + 1 >= QUESTIONS.length) {
      const result = calculateResult(nextAnswers);
      // 결과 페이지로 이동. 4축 점수를 URL 파라미터로 전달
      const params = new URLSearchParams({
        a: String(result.percentA_gamseong),
        b: String(result.percentB_gaeip),
        c: String(result.percentC_wonchik),
        d: String(result.percentD_dojeon),
      });
      router.push(`/result/${result.type}?${params.toString()}`);
    } else {
      setCurrent(current + 1);
    }
  };

  const handleBack = () => {
    if (current === 0) return;
    setAnswers(answers.slice(0, -1));
    setCurrent(current - 1);
  };

  return (
    <main className="min-h-screen flex flex-col px-5 md:px-6 py-8 md:py-10 max-w-2xl mx-auto">
      {/* 진행률 */}
      <div className="mb-10">
        <div className="flex justify-between items-center text-xs font-bold text-[var(--ink-soft)] mb-2">
          <span className="sticker bg-white rounded-full px-3 py-1">
            {String(current + 1).padStart(2, "0")} / {QUESTIONS.length}
          </span>
          <button
            onClick={handleBack}
            disabled={current === 0}
            className="disabled:opacity-30 hover:text-[var(--accent)] transition-colors"
          >
            ← 이전
          </button>
        </div>
        <div className="h-2.5 bg-white rounded-full relative sticker overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "var(--accent)" }}
          />
        </div>
      </div>

      {/* 상황 카드 */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="sticker inline-flex items-center gap-1.5 self-start bg-[var(--butter)] text-[var(--ink)] text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-6">
          질문 {String(current + 1).padStart(2, "0")}
        </div>
        <h2 className="hand text-xl md:text-2xl leading-[1.6] font-bold mb-10">
          {q.situation}
        </h2>

        <div className="flex flex-col gap-4">
          <ChoiceButton
            label={q.choiceA.text}
            onClick={() => handleChoose(q.choiceA.weight)}
          />
          <ChoiceButton
            label={q.choiceB.text}
            onClick={() => handleChoose(q.choiceB.weight)}
          />
        </div>
      </div>
    </main>
  );
}

function ChoiceButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="sticker text-left px-5 md:px-6 py-4 md:py-5 bg-white rounded-2xl hover:bg-[var(--accent-soft)] transition-all"
    >
      <span className="text-base md:text-lg leading-relaxed text-[var(--ink)]">
        {label}
      </span>
    </button>
  );
}
