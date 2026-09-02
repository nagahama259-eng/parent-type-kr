import { TypeKey } from './data';

export interface CardOverlay {
  height: number; // 카드 원본 세로 크기 (가로 420 기준)
  titleTop: number; // 리본 중심 top %
  titleWidth: number; // 리본 폭 %
  fontSize: number; // 유형명 폰트 크기 (420px 기준 px)
  capsuleTop: number; // 키워드 캡슐 중심 top %
  x1: number;
  x2: number;
  x3: number;
}

// 16개 유형 결과 카드 이미지의 텍스트 오버레이 좌표 (이미지별로 실측)
export const CARD_OVERLAY: Record<TypeKey, CardOverlay> = {
  nurturer_guardian: { height: 603, titleTop: 10.8, titleWidth: 60.0, fontSize: 23, capsuleTop: 92.0, x1: 20.3, x2: 49.9, x3: 79.4 },
  nurturer_pioneer: { height: 603, titleTop: 11.5, titleWidth: 58.6, fontSize: 23, capsuleTop: 92.9, x1: 21.4, x2: 50.2, x3: 78.9 },
  nurturer_helper: { height: 581, titleTop: 11.2, titleWidth: 60.2, fontSize: 23, capsuleTop: 93.6, x1: 20.2, x2: 49.8, x3: 79.3 },
  nurturer_companion: { height: 584, titleTop: 11.6, titleWidth: 60.2, fontSize: 23, capsuleTop: 93.9, x1: 20.5, x2: 50.2, x3: 79.9 },
  supporter_cheer: { height: 631, titleTop: 11.6, titleWidth: 60.9, fontSize: 23, capsuleTop: 92.0, x1: 19.8, x2: 50.0, x3: 80.1 },
  supporter_coach: { height: 613, titleTop: 12.5, titleWidth: 57.7, fontSize: 23, capsuleTop: 92.9, x1: 20.7, x2: 49.4, x3: 78.1 },
  supporter_friend: { height: 612, titleTop: 10.9, titleWidth: 58.0, fontSize: 23, capsuleTop: 92.1, x1: 20.8, x2: 49.5, x3: 78.3 },
  supporter_artist: { height: 606, titleTop: 10.6, titleWidth: 56.6, fontSize: 21, capsuleTop: 92.9, x1: 21.6, x2: 49.9, x3: 78.5 },
  planner_architect: { height: 630, titleTop: 10.0, titleWidth: 59.1, fontSize: 23, capsuleTop: 92.8, x1: 19.8, x2: 50.4, x3: 79.5 },
  planner_conductor: { height: 619, titleTop: 10.1, titleWidth: 57.6, fontSize: 23, capsuleTop: 94.0, x1: 20.4, x2: 50.2, x3: 79.5 },
  planner_navigator: { height: 630, titleTop: 10.4, titleWidth: 60.0, fontSize: 23, capsuleTop: 94.7, x1: 19.6, x2: 49.8, x3: 79.9 },
  planner_advisor: { height: 615, titleTop: 10.9, titleWidth: 58.8, fontSize: 22, capsuleTop: 94.5, x1: 19.9, x2: 50.1, x3: 79.8 },
  observer_lighthouse: { height: 628, titleTop: 10.35, titleWidth: 55.95, fontSize: 23, capsuleTop: 93.15, x1: 20.95, x2: 49.6, x3: 78.7 },
  observer_mentor: { height: 630, titleTop: 10.79, titleWidth: 57.86, fontSize: 23, capsuleTop: 92.54, x1: 20.24, x2: 49.4, x3: 78.81 },
  observer_watcher: { height: 626, titleTop: 10.22, titleWidth: 58.1, fontSize: 22, capsuleTop: 91.85, x1: 20.36, x2: 49.29, x3: 78.81 },
  observer_explorer: { height: 630, titleTop: 10.63, titleWidth: 59.29, fontSize: 23, capsuleTop: 93.81, x1: 19.05, x2: 49.05, x3: 79.4 },
};
