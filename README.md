# 부모 성향 테스트

by 259 · Next.js 15 + Tailwind CSS

## 로컬 실행

```bash
npm install
npm run dev
```

http://localhost:3000

## 배포 (Vercel)

기존 키워드 분석기랑 같은 방식으로:

1. GitHub에 새 저장소 push
2. Vercel에서 Import → 자동 감지 → Deploy

## 구조

```
app/
├── page.tsx                # 랜딩 (미니 사분면 미리보기)
├── test/page.tsx           # 20문항 진행 (클라이언트)
└── result/[type]/page.tsx  # 유형별 결과 페이지 (SSG)

lib/
├── data.ts                 # 문항 20개 + 유형 4개 콘텐츠
└── scoring.ts              # 판정 로직

components/
├── QuadrantMap.tsx         # 시그니처: 2축 심리 지도
└── ShareButtons.tsx        # 카톡·트위터·URL 복사
```

## 다음 스텝

### 1. 쿠팡 파트너스 링크 삽입

`app/result/[type]/page.tsx`에서 "쿠팡 링크 자리" TODO 부분에 쿠팡 파트너스 딥링크 삽입.

각 유형의 `item_categories`(6개)에 매칭되는 쿠팡 상품을 찾아 링크로 감싸면 됨.

```tsx
<a href="https://link.coupang.com/a/xxxxx" target="_blank" rel="nofollow noopener">
  쿠팡에서 보기 →
</a>
```

### 2. OG 이미지 (선택)

카톡 공유 시 결과 카드 이미지 자동 생성. `@vercel/og` 사용.

`app/result/[type]/opengraph-image.tsx`를 만들면 자동 적용.

### 3. 네이버 블로그 유입 글

Vercel 배포 후 URL을 네이버 블로그 소개글에서 연결.
블로그 글은 별도 요청.

## 알려진 제약

- OG 이미지 미구현 (기본 메타태그만 있음)
- 유형별 통계 수집 없음 (필요하면 나중에 Umami나 Plausible 붙임)
- 5-5 동점은 감성/개입 쪽으로 기울임 (`lib/scoring.ts`)

## 판정 로직 요약

- 축 A (감성/이성): 10문항
- 축 B (개입/자율): 10문항
- 각 축에서 우세한 쪽 결정 → 4유형 매핑
  - 감성+개입 → nurturer (감성형)
  - 이성+개입 → planner (계획형)
  - 감성+자율 → freeflow (자유형)
  - 이성+자율 → observer (관찰형)
