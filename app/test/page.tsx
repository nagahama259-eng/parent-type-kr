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
      // 결과 페이지로 이동. 점수는 URL 파라미터로 전달 (공유 시 사라져도 결과 유형은 유지)
      const params = new URLSearchParams({
        a: String(result.percentA_gamseong),
        b: String(result.percentB_gaeip),
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
    <main className="min-h-screen flex flex-col px-6 py-10 max-w-2xl mx-auto">
      {/* 진행률 */}
      <div className="mb-12">
        <div className="flex justify-between text-xs text-[var(--ink-soft)] mb-2 tracking-wider">
          <span>
            {String(current + 1).padStart(2, "0")} / {QUESTIONS.length}
          </span>
          <button
            onClick={handleBack}
            disabled={current === 0}
            className="disabled:opacity-30 hover:text-[var(--ink)] transition-colors"
          >
            ← 이전
          </button>
        </div>
        <div className="h-px bg-[var(--line)] relative">
          <div
            className="absolute inset-y-0 left-0 bg-[var(--accent)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 상황 카드 */}
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--ink-soft)] mb-6">
          Situation {String(current + 1).padStart(2, "0")}
        </p>
        <h2 className="serif text-xl md:text-2xl leading-[1.6] mb-12">
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
      className="text-left px-6 py-5 bg-[var(--bg-elevated)] border border-[var(--line)] hover:border-[var(--accent)] hover:bg-white transition-all group"
    >
      <span className="text-base md:text-lg leading-relaxed group-hover:text-[var(--accent)] transition-colors">
        {label}
      </span>
    </button>
  );
}
