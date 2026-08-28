// 부모 성향 테스트 - 확정 데이터 v2
// - 문항 20개 감각 디테일·대사 리라이트 (Q3, Q12는 Claude 리라이트, 나머지 18개는 GPT 리라이트)
// - 유형별 논문 근거 추가 (김도희 2022, 이준배 등 2024)
// - 참고문헌 목록 추가

export type Axis = "A" | "B";
export type WeightA = "감성" | "이성";
export type WeightB = "개입" | "자율";
export type Weight = WeightA | WeightB;
export type TypeKey = "nurturer" | "planner" | "freeflow" | "observer";

export interface Question {
  id: number;
  axis: Axis;
  situation: string;
  choiceA: { text: string; weight: Weight };
  choiceB: { text: string; weight: Weight };
}

export interface TypeContent {
  key: TypeKey;
  name_kr: string;
  tagline: string;
  summary: string;
  strengths: string[];
  cautions: string[];
  child_growth: string;
  research_basis: string; // 논문 근거 (child_growth 뒤에 표시)
  care_tips: string[];
  product_candidates: Product[]; // 18개 (6 카테고리 × 3 후보). 결과 페이지엔 카테고리별 첫 후보만 표시
  share_hook: string;
  coord: { a: 1 | -1; b: 1 | -1 };
  color: string;
}

export interface Product {
  category: string; // 카테고리명 (같은 카테고리 3개가 후보로 그룹핑됨)
  search_query: string; // 쿠팡 검색 키워드 (259님이 실제 상품 찾을 때 사용)
  product_name_example: string; // 예시 상품명
  reason: string; // 이 유형에 어울리는 이유
  age_target: string; // 추천 연령
  price_range: string; // 가격대
  coupang_link?: string; // 쿠팡 파트너스 딥링크 (아직 없으면 "쿠팡 링크 준비 중" 표시)
  image_url?: string; // 상품 이미지 URL (없으면 카테고리 이모지 표시)
}

// 카테고리별 대표 이모지 (image_url 없을 때 fallback)
export const CATEGORY_ICONS: Record<string, string> = {
  "유아 감정 카드": "💭",
  "애착 인형": "🧸",
  "감정 표현 그림책": "📖",
  "역할놀이 인형 세트": "👨‍👩‍👧",
  "수면 무드등": "🌙",
  "부모 자녀 대화 카드": "💬",
  "유아 루틴 차트": "📋",
  "어린이 타이머": "⏱️",
  "자석 스케줄 보드": "📅",
  "유아 정리함": "📦",
  "생활 습관 스티커북": "✨",
  "어린이 학습 달력": "🗓️",
  "오픈엔디드 블록": "🧱",
  "유아 미술 재료 세트": "🎨",
  "역할놀이 소품": "🎭",
  "촉감 놀이 세트": "👐",
  "자연 관찰 키트": "🌱",
  "붙였다 뗐다 스티커북": "🌈",
  "유아 퍼즐": "🧩",
  "과학 실험 키트": "🧪",
  "어린이 보드게임": "🎲",
  "몬테소리 교구": "🎯",
  "자연 관찰 돋보기": "🔍",
  "유아 문제 해결 워크북": "📝",
};

export interface Reference {
  id: number;
  citation: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    axis: "A",
    situation: `주말 오후 놀이터에서 아이가 꼭 쥐고 놀던 자동차를 친구에게 빼앗기자 입술을 떨며 울기 시작합니다. 빈손을 내민 채 "내가 먼저 갖고 있었는데…"라고 말하며 부모 품으로 달려옵니다.`,
    choiceA: {
      text: `"많이 속상했지? 아빠한테 와" 하며 아이를 안고 등을 천천히 토닥입니다`,
      weight: "감성",
    },
    choiceB: {
      text: `"처음부터 어떤 일이 있었는지 아빠한테 말해줄래?" 하며 아이와 함께 상황을 차분히 확인합니다`,
      weight: "이성",
    },
  },
  {
    id: 2,
    axis: "A",
    situation: `아침 식탁에서 아이가 컵을 건드려 우유가 식탁과 바닥으로 쏟아집니다. 아이는 그대로 얼어붙어 부모의 얼굴을 살피며 작은 목소리로 "일부러 그런 거 아니야"라고 말합니다.`,
    choiceA: {
      text: `"괜찮아, 누구나 쏟을 수 있어" 하며 놀란 아이의 어깨를 먼저 감싸줍니다`,
      weight: "감성",
    },
    choiceB: {
      text: `"괜찮아, 우선 휴지를 가져와서 여기부터 닦아보자" 하며 정리하는 순서를 알려줍니다`,
      weight: "이성",
    },
  },
  {
    id: 3,
    axis: "A",
    situation: `잠자기 전 이불 속에서 이야기를 나누던 아이가 갑자기 목소리를 낮추며 "아빠, 나 내일 유치원 안 가면 안 돼?"라고 말합니다. 낮에는 별말 없이 잘 다녀왔는데 눈빛이 조금 흔들립니다.`,
    choiceA: {
      text: `"오늘 마음이 좀 어땠어?" 하며 이불을 끌어당겨 옆에 눕고 이야기를 들어봅니다`,
      weight: "감성",
    },
    choiceB: {
      text: `"무슨 일 있었어? 어떤 부분이 가기 싫은지 하나씩 얘기해볼까?" 하고 차분히 물어봅니다`,
      weight: "이성",
    },
  },
  {
    id: 4,
    axis: "A",
    situation: `거실 바닥에서 한참 쌓아 올린 블록 성이 아이의 손끝에 걸려 와르르 무너집니다. 아이는 흩어진 블록을 멍하니 바라보다가 "진짜 오래 만들었는데…"라며 어깨를 축 늘어뜨립니다.`,
    choiceA: {
      text: `"열심히 만들었는데 한순간에 무너져서 정말 속상하겠다" 하며 아이 곁에 바짝 앉습니다`,
      weight: "감성",
    },
    choiceB: {
      text: `"어디가 흔들렸는지 같이 찾아볼까? 다음에는 더 튼튼하게 만들 수 있을 거야" 하며 블록을 살펴봅니다`,
      weight: "이성",
    },
  },
  {
    id: 5,
    axis: "A",
    situation: `저녁 식사 중 아이가 밥은 한 숟갈도 먹지 않고 반찬만 젓가락으로 이리저리 밀어냅니다. 평소 좋아하던 반찬에도 손을 대지 않은 채 "오늘은 아무것도 먹기 싫어"라고 중얼거립니다.`,
    choiceA: {
      text: `"오늘은 입맛도 없고 마음도 좀 그런가 보네" 하며 아이의 표정과 기분을 살핍니다`,
      weight: "감성",
    },
    choiceB: {
      text: `"배가 안 고픈 건지, 반찬이 싫은 건지 하나씩 말해줄래?" 하며 먹지 않는 이유를 확인합니다`,
      weight: "이성",
    },
  },
  {
    id: 6,
    axis: "A",
    situation: `거실에서 장난감을 가지고 놀던 형제가 갑자기 서로 밀치며 큰 소리로 다툽니다. 한 아이는 "쟤가 먼저 그랬어!"라고 외치고, 다른 아이는 눈물을 글썽이며 억울하다고 매달립니다.`,
    choiceA: {
      text: `"둘 다 많이 화나고 속상했구나. 한 명씩 아빠한테 이야기해줄래?" 하며 각자의 마음을 들어줍니다`,
      weight: "감성",
    },
    choiceB: {
      text: `"누가 먼저 장난감을 가지고 있었는지 처음부터 차례대로 말해보자" 하며 사건의 순서를 정리합니다`,
      weight: "이성",
    },
  },
  {
    id: 7,
    axis: "A",
    situation: `유치원 발표회가 끝난 뒤 아이가 무대에서 대사를 잊었던 장면을 떠올리며 고개를 숙입니다. 다른 가족들이 사진을 찍는 사이 "나만 틀렸어"라고 말하며 손가락을 꼼지락거립니다.`,
    choiceA: {
      text: `"사람들이 보고 있어서 많이 떨렸지? 그래도 끝까지 서 있던 게 아빠는 참 대단해 보여" 하며 꼭 안아줍니다`,
      weight: "감성",
    },
    choiceB: {
      text: `"처음 인사는 정말 잘했어. 다음에는 헷갈린 부분만 한 번 더 연습해보자" 하며 잘한 점과 보완할 점을 짚어줍니다`,
      weight: "이성",
    },
  },
  {
    id: 8,
    axis: "A",
    situation: `어린이집에 늦을 것 같은 아침, 현관 앞에서 아이가 입고 있던 옷자락을 잡아당기며 갑자기 울먹입니다. 어젯밤 직접 골랐던 옷인데도 "이거 입고 가기 싫어"라며 방으로 돌아가려 합니다.`,
    choiceA: {
      text: `"어제는 좋았는데 지금은 마음이 달라졌구나. 뭐가 불편한지 말해줄래?" 하며 아이 눈높이에 앉습니다`,
      weight: "감성",
    },
    choiceB: {
      text: `"옷이 까슬거리는지, 색이 싫은지 하나씩 확인해보자" 하며 싫어진 이유를 구체적으로 짚어봅니다`,
      weight: "이성",
    },
  },
  {
    id: 9,
    axis: "A",
    situation: `어린이집에서 돌아온 아이가 가방도 내려놓지 않은 채 "친구가 나랑 안 논다고 했어"라고 말합니다. 애써 아무렇지 않은 척하지만 평소보다 목소리가 작고 눈가가 금세 붉어집니다.`,
    choiceA: {
      text: `"그 말을 들으니까 마음이 많이 서운했겠다" 하며 아이 옆에 앉아 이야기를 충분히 들어줍니다`,
      weight: "감성",
    },
    choiceB: {
      text: `"다음에 또 그런 일이 생기면 친구에게 어떻게 말하면 좋을지 같이 생각해볼까?" 하며 대응 방법을 찾아봅니다`,
      weight: "이성",
    },
  },
  {
    id: 10,
    axis: "A",
    situation: `저녁 8시, 정리하기로 약속한 알람이 울렸는데도 아이는 거실 매트에서 자동차 놀이를 멈추지 않습니다. "이것만 만들면 끝인데, 조금만 더 놀면 안 돼?"라며 자동차를 품에 꼭 끌어안습니다.`,
    choiceA: {
      text: `"재미있는 걸 만들던 중이라 지금 멈추기가 정말 아쉽구나" 하며 더 놀고 싶은 마음부터 알아줍니다`,
      weight: "감성",
    },
    choiceB: {
      text: `"얼마나 더 하면 완성되는지 보고, 정리 시간을 몇 분 조정할지 정해보자" 하며 필요한 시간을 구체적으로 확인합니다`,
      weight: "이성",
    },
  },
  {
    id: 11,
    axis: "B",
    situation: `처음 찾아간 큰 놀이터에서 아이가 입구 근처에 멈춰 서서 미끄럼틀과 그네를 번갈아 바라봅니다. 뛰어노는 아이들 틈으로 들어가지 못한 채 부모의 손을 꼭 잡고 "뭐부터 하지?"라고 묻습니다.`,
    choiceA: {
      text: `"저기 낮은 미끄럼틀부터 아빠랑 같이 가볼까?" 하며 손을 잡고 놀이를 골라줍니다`,
      weight: "개입",
    },
    choiceB: {
      text: `"천천히 둘러보고 하고 싶은 게 생기면 알려줘" 하며 아이가 먼저 움직일 때까지 곁에서 기다립니다`,
      weight: "자율",
    },
  },
  {
    id: 12,
    axis: "B",
    situation: `거실 매트에 엎드려 퍼즐을 맞추던 아이가 같은 조각을 세 번째 뒤집으며 미간을 찌푸립니다. 나머지 조각들이 흩어져 있고 손이 자꾸 멈춥니다.`,
    choiceA: {
      text: `"이거 이 색깔이랑 붙여보면 어때?" 하고 옆에 앉아 힌트를 슬쩍 건넵니다`,
      weight: "개입",
    },
    choiceB: {
      text: `"혼자 해볼래?" 하며 조금 떨어져서 다른 일을 하는 척 지켜봅니다`,
      weight: "자율",
    },
  },
  {
    id: 13,
    axis: "B",
    situation: `느긋한 주말 아침, 거실에는 장난감이 놓여 있고 창밖으로 햇빛이 들어옵니다. 특별한 일정은 없는데 아이가 소파에 기대어 "오늘 뭐 해?"라고 묻습니다.`,
    choiceA: {
      text: `"오전에 공원에 갔다가 점심 먹고 그림 그리는 건 어때?" 하며 하루 활동을 함께 정합니다`,
      weight: "개입",
    },
    choiceB: {
      text: `"오늘은 네가 하고 싶은 걸 생각해봐. 정해지면 아빠한테 알려줘" 하며 아이의 선택을 기다립니다`,
      weight: "자율",
    },
  },
  {
    id: 14,
    axis: "B",
    situation: `등원 준비를 하던 아이가 방바닥에 앉아 양말을 혼자 신지만 뒤꿈치 부분이 자꾸 발등으로 돌아갑니다. 몇 번을 다시 당기던 아이가 "왜 자꾸 이상하게 되지?"라며 양말을 내려다봅니다.`,
    choiceA: {
      text: `"뒤꿈치 표시를 아래로 놓고 발가락부터 넣어보자" 하며 옆에서 순서대로 알려줍니다`,
      weight: "개입",
    },
    choiceB: {
      text: `"신어보고 불편한 곳이 있는지 걸어볼까?" 하며 아이가 스스로 차이를 알아차리도록 기다립니다`,
      weight: "자율",
    },
  },
  {
    id: 15,
    axis: "B",
    situation: `식탁에 앉아 색칠하던 아이가 파란 크레파스 대신 초록색으로 하늘을 가득 채웁니다. 완성한 그림을 높이 들고 "여기는 초록색 하늘이야!"라며 신난 얼굴로 보여줍니다.`,
    choiceA: {
      text: `"멋진 초록 하늘이네. 우리가 밖에서 본 하늘에는 어떤 색이 있었는지도 같이 찾아볼까?" 하며 다른 색을 살펴보자고 제안합니다`,
      weight: "개입",
    },
    choiceB: {
      text: `"초록색 하늘이라니 신기하다! 이곳에서는 어떤 일이 생기는지 더 그려볼래?" 하며 아이의 표현을 그대로 이어가게 합니다`,
      weight: "자율",
    },
  },
  {
    id: 16,
    axis: "B",
    situation: `키즈카페에서 아이가 친구와 같은 장난감 자동차를 붙잡고 서로 놓지 않습니다. 친구가 "나도 할 거야"라고 말하자 아이는 자동차를 품 쪽으로 당기며 부모를 힐끗 바라봅니다.`,
    choiceA: {
      text: `"한 번씩 타이머를 맞춰서 놀아보자. 네가 먼저 하고 다음은 친구 차례야" 하며 나누는 방법을 정해줍니다`,
      weight: "개입",
    },
    choiceB: {
      text: `"두 사람이 모두 놀고 싶은데 어떻게 하면 좋을까?"라고만 묻고 아이들이 방법을 찾을 시간을 줍니다`,
      weight: "자율",
    },
  },
  {
    id: 17,
    axis: "B",
    situation: `또래 친구들이 하나둘 새로운 체육 수업이나 미술 활동을 시작했다는 이야기가 들립니다. 아이는 전단지 속 사진을 잠깐 바라보지만 먼저 하고 싶다는 말은 꺼내지 않습니다.`,
    choiceA: {
      text: `"네가 몸 쓰는 걸 좋아하니까 수영이랑 축구 중에서 한번 체험해볼까?" 하며 잘 맞을 만한 선택지를 추려줍니다`,
      weight: "개입",
    },
    choiceB: {
      text: `"나중에 해보고 싶은 게 생기면 말해줘. 그때 같이 알아보자" 하며 아이가 관심을 표현할 때까지 기다립니다`,
      weight: "자율",
    },
  },
  {
    id: 18,
    axis: "B",
    situation: `아이 방에서 정리를 시작한 아이가 자동차를 책장에 올리고 그림책은 장난감 상자에 차곡차곡 넣습니다. 익숙한 자리가 아닌 곳으로 물건을 옮기면서도 "내가 찾기 쉽게 하는 거야"라며 꽤 진지한 표정을 짓습니다.`,
    choiceA: {
      text: `"자동차는 이 칸, 책은 책장에 두면 다음에도 찾기 쉽지 않을까? 같이 자리를 정해보자" 하며 정리 위치를 잡아줍니다`,
      weight: "개입",
    },
    choiceB: {
      text: `"네가 찾기 좋은 방식으로 끝까지 해봐. 다 하고 나면 아빠한테 알려줘" 하며 아이 방식대로 맡겨봅니다`,
      weight: "자율",
    },
  },
  {
    id: 19,
    axis: "B",
    situation: `공원 자전거 길에서 아이가 두 번 넘어져 무릎에 흙이 묻었지만 다시 안장에 올라갑니다. 입술을 꾹 다문 채 페달을 밟으면서도 앞바퀴가 흔들리고 부모가 있는 쪽을 자꾸 돌아봅니다.`,
    choiceA: {
      text: `"아빠가 뒤를 잡아줄게. 앞을 보고 페달을 천천히 밟아보자" 하며 자세와 방향을 함께 잡아줍니다`,
      weight: "개입",
    },
    choiceB: {
      text: `"아빠가 여기서 보고 있을게. 네 속도로 다시 해봐" 하며 스스로 균형을 찾을 수 있도록 몇 걸음 물러섭니다`,
      weight: "자율",
    },
  },
  {
    id: 20,
    axis: "B",
    situation: `잠자기 전 아이가 책장에서 그림책을 여섯 권이나 꺼내 이불 위에 펼쳐놓습니다. 표지를 하나씩 넘겨보며 "이것도 읽고 싶고, 저것도 읽고 싶은데…"라고 말한 채 좀처럼 고르지 못합니다.`,
    choiceA: {
      text: `"오늘은 동물책이랑 자동차책 중에서 한 권 골라볼까?" 하며 선택지를 좁혀 함께 정합니다`,
      weight: "개입",
    },
    choiceB: {
      text: `"천천히 골라봐. 정해지면 아빠를 불러줘" 하며 아이가 결정할 때까지 기다립니다`,
      weight: "자율",
    },
  },
];

export const TYPES: Record<TypeKey, TypeContent> = {
  nurturer: {
    key: "nurturer",
    name_kr: "감성형 부모",
    tagline: "아이 마음의 날씨를 가장 먼저 알아채는 부모",
    summary:
      "아이의 표정이 조금만 달라져도 마음에 무슨 일이 생겼는지 먼저 살핍니다. 아이가 힘들 때 곁으로 다가가 감정을 함께 풀어주며 든든한 안전기지가 되어줍니다. 사랑을 표현하는 데 주저함이 없어 아이가 부모의 애정을 온몸으로 느끼게 합니다.",
    strengths: [
      "아이의 작은 감정 변화도 빠르게 알아챕니다.",
      "따뜻한 공감으로 아이에게 안정감을 줍니다.",
      "어려운 순간에도 아이가 혼자가 아니라고 느끼게 합니다.",
    ],
    cautions: [
      "아이의 불편함을 너무 빨리 해결해주면 스스로 감정을 다뤄볼 기회가 줄어들 수 있습니다.",
      "아이 마음을 챙기느라 부모 자신의 감정을 뒤로 미루지 않아도 괜찮습니다.",
    ],
    child_growth:
      "우리 아이는 자신의 감정을 자연스럽게 표현하고 다른 사람의 마음에도 공감할 줄 아는 아이로 자랍니다. 힘든 일이 생겨도 언제든 돌아갈 안전한 품이 있다는 믿음을 갖게 됩니다. 충분히 사랑받은 경험은 새로운 관계와 도전을 시작하는 든든한 바탕이 됩니다.",
    research_basis:
      "Maccoby & Martin(1983)의 authoritative parenting(반응성·요구성 모두 높음)에 가장 가까운 유형입니다. 지난 40여 년의 국내외 연구에서 이 조합이 자녀의 자존감, 학업성취, 사회적 유능감, 정신건강에 가장 유리한 것으로 반복 확인되었습니다. 국내 연구에서도 자율성 지지와 구조 제공이 동시에 제공될 때 청소년의 삶의 만족도와 학교적응이 가장 높았고(윤초희·최옥주, 2020), 두 요소가 결합될 때 시너지 효과가 나타났습니다(염혜선·이은주, 2020). 부모의 따뜻함은 자녀 자아존중감에 세 요소 중 가장 큰 영향(β=.32)을 미쳤습니다(김도희, 2022).",
    care_tips: [
      "아이의 문제를 해결하기 전 '속상했구나'라고 감정을 한 문장으로 확인해줍니다.",
      "아이가 울거나 화낼 때 10초만 기다린 뒤 도움이 필요한지 물어봅니다.",
      "잠들기 전 오늘 가장 좋았던 감정과 힘들었던 감정을 하나씩 나눠봅니다.",
    ],
    product_candidates: [
      { category: "유아 감정 카드", search_query: "유아 표정 감정카드 한글", product_name_example: "다양한 얼굴 표정과 감정 단어가 담긴 유아용 감정 카드", reason: "아이의 미묘한 감정을 함께 찾아 이름 붙이며 정서 표현을 도와줍니다.", age_target: "3~7세", price_range: "1~2만원", coupang_link: "https://link.coupang.com/a/gzwvJNlay4", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/ce6a/f8a25d2e73651a15d3a9eccd3e8d99f981d67fee2bd5984d2e754becb7fa.png" },
      { category: "유아 감정 카드", search_query: "유아 감정카드 상황 그림", product_name_example: "생활 상황별 감정을 이야기하는 그림 감정 카드", reason: "일상 속 사건과 마음을 연결해 아이와 자연스럽게 대화를 시작할 수 있습니다.", age_target: "4~7세", price_range: "1~2만원" },
      { category: "유아 감정 카드", search_query: "감정카드 자석 유아", product_name_example: "오늘의 기분을 골라 붙이는 자석형 감정 표현 카드", reason: "말로 설명하기 어려운 마음도 아이가 직접 고르고 보여줄 수 있게 해줍니다.", age_target: "3~6세", price_range: "1~3만원" },
      { category: "애착 인형", search_query: "유아 애착인형 부드러운 봉제", product_name_example: "세탁 가능한 부드러운 동물 봉제 애착 인형", reason: "부모와 떨어져 있거나 잠들기 전 아이에게 포근한 정서적 안정감을 줍니다.", age_target: "3~7세", price_range: "1~3만원", coupang_link: "https://link.coupang.com/a/gzwBpMCtQO", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/a0b4/de26e0ee38e7c3f136371cfcef95a00901ebca39acf5ec0330ee2dc3ec8c.jpg" },
      { category: "애착 인형", search_query: "유아 수면 애착인형 미니", product_name_example: "아이가 안고 자기 편한 소형 수면 애착 인형", reason: "잠자리에서 아이의 외로움과 긴장을 달래주는 다정한 친구가 되어줍니다.", age_target: "3~6세", price_range: "1~2만원" },
      { category: "애착 인형", search_query: "역할놀이 애착인형 옷입히기", product_name_example: "옷을 갈아입히고 돌볼 수 있는 역할놀이 애착 인형", reason: "인형을 돌보는 놀이를 통해 애정과 공감 표현을 자연스럽게 연습할 수 있습니다.", age_target: "4~7세", price_range: "2~4만원" },
      { category: "감정 표현 그림책", search_query: "유아 감정 그림책 세트", product_name_example: "기쁨·슬픔·화·두려움을 다룬 유아 감정 그림책 세트", reason: "아이의 다양한 마음을 이야기 속에서 편안하게 이해하고 표현하도록 돕습니다.", age_target: "3~7세", price_range: "2~5만원", coupang_link: "https://link.coupang.com/a/gzwDif0y0y", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2022/01/17/10/1/e7c8f52a-6ba6-427d-a78f-97ead379dae2.jpg" },
      { category: "감정 표현 그림책", search_query: "유아 화 조절 감정 그림책", product_name_example: "화가 날 때 몸과 마음을 진정시키는 감정 조절 그림책", reason: "아이의 화를 억누르기보다 인정하고 건강하게 다루는 방법을 함께 배울 수 있습니다.", age_target: "4~7세", price_range: "1만원대" },
      { category: "감정 표현 그림책", search_query: "유아 마음 표현 플랩북", product_name_example: "장면을 열어보며 주인공의 마음을 맞히는 감정 플랩북", reason: "놀이하듯 표정과 상황을 살펴보며 아이의 공감 능력을 키워줍니다.", age_target: "3~6세", price_range: "1~2만원" },
      { category: "역할놀이 인형 세트", search_query: "유아 가족 인형 역할놀이 세트", product_name_example: "부모와 형제 구성의 가족 역할놀이 인형 세트", reason: "가족 관계에서 느낀 감정을 인형의 말과 행동으로 안전하게 표현할 수 있습니다.", age_target: "3~7세", price_range: "2~4만원", coupang_link: "https://link.coupang.com/a/gzwE54np7d", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2016/02/29/10/1/bb2798b8-752a-4ce5-93a1-455fc7694589.jpg" },
      { category: "역할놀이 인형 세트", search_query: "유아 병원놀이 인형 세트", product_name_example: "아픈 인형을 진찰하고 돌보는 병원 역할놀이 세트", reason: "돌봄 놀이를 통해 타인의 아픔을 헤아리고 위로하는 경험을 만들어줍니다.", age_target: "3~6세", price_range: "2~4만원" },
      { category: "역할놀이 인형 세트", search_query: "유아 손인형 동물 세트", product_name_example: "감정 대화를 꾸밀 수 있는 동물 손인형 여러 개 세트", reason: "직접 말하기 어려운 마음을 인형의 목소리로 부담 없이 꺼내게 해줍니다.", age_target: "3~7세", price_range: "1~3만원" },
      { category: "수면 무드등", search_query: "유아 수면 무드등 밝기조절", product_name_example: "밝기와 색온도를 조절할 수 있는 충전식 수면 무드등", reason: "잠들기 전 따뜻하고 안정적인 분위기를 만들어 부모와의 교감 시간을 돕습니다.", age_target: "3~7세", price_range: "1~3만원", coupang_link: "https://link.coupang.com/a/gzwGOYZOGy", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/0ca2/db920d780156314c80d5580a1ca9255f9d0c46eb420c08dbc5f2d2e87a89.jpg" },
      { category: "수면 무드등", search_query: "유아 동물 무드등 타이머", product_name_example: "취침 타이머가 있는 말랑한 동물 모양 수면등", reason: "친근한 모양과 은은한 빛이 어두움을 무서워하는 아이를 편안하게 해줍니다.", age_target: "3~6세", price_range: "1~3만원" },
      { category: "수면 무드등", search_query: "어린이 별빛 프로젝터 수면등", product_name_example: "천장에 별빛을 비추는 회전형 수면 프로젝터 무드등", reason: "별빛을 함께 바라보며 하루의 감정을 나누는 따뜻한 잠자리 의식을 만들 수 있습니다.", age_target: "4~7세", price_range: "2~4만원" },
      { category: "부모 자녀 대화 카드", search_query: "부모 자녀 대화카드 유아", product_name_example: "하루의 기분과 경험을 묻는 부모 자녀 대화 카드", reason: "매일 짧은 질문 하나로 아이의 속마음을 자연스럽게 들여다볼 수 있습니다.", age_target: "4~7세", price_range: "1~2만원", coupang_link: "https://link.coupang.com/a/gzwHYr04FU", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2025/08/18/10/0/d8682d07-8b28-482e-a245-f3c9ca736380.jpg" },
      { category: "부모 자녀 대화 카드", search_query: "가족 질문카드 어린이", product_name_example: "가족이 돌아가며 답하는 어린이용 질문 카드 게임", reason: "부모와 아이가 서로의 생각을 듣고 공감하는 즐거운 가족 시간을 만들어줍니다.", age_target: "5~7세", price_range: "1~2만원" },
      { category: "부모 자녀 대화 카드", search_query: "유아 칭찬카드 사랑 표현", product_name_example: "사랑과 고마움을 전하는 가족 칭찬 대화 카드", reason: "평소 쑥스러웠던 애정과 칭찬을 구체적인 말로 전하도록 도와줍니다.", age_target: "4~7세", price_range: "1만원대" },
    ],
    share_hook: "저는 아이 마음의 통역사래요—우리 중 누가 같은 유형인지 태그해보세요!",
    coord: { a: 1, b: 1 },
    color: "#E8927C",
  },
  planner: {
    key: "planner",
    name_kr: "계획형 부모",
    tagline: "아이의 하루에 든든한 길을 만들어주는 부모",
    summary:
      "아이에게 필요한 것을 미리 살피고 안정적인 루틴과 기준을 만들어줍니다. 문제가 생기면 당황하기보다 원인을 찾고 현실적인 해결 방법을 차근차근 제시합니다. 아이가 세상을 예측하고 준비할 수 있도록 든든한 가이드가 되어줍니다.",
    strengths: [
      "일관된 기준으로 아이에게 안정감을 줍니다.",
      "복잡한 문제도 실행 가능한 단계로 바꿉니다.",
      "아이의 생활 습관과 성장을 꼼꼼하게 지원합니다.",
    ],
    cautions: [
      "계획과 조금 다른 하루도 아이에게는 멋진 배움이 될 수 있습니다.",
      "해결책을 알려주기 전에 아이의 마음을 한 번 먼저 물어보면 더욱 좋습니다.",
    ],
    child_growth:
      "우리 아이는 해야 할 일을 스스로 정리하고 끝까지 해내는 힘을 키웁니다. 규칙적인 경험 속에서 생활 습관과 책임감을 자연스럽게 익힙니다. 부모의 구체적인 안내를 발판 삼아 점차 자기만의 계획을 세우는 아이로 자랍니다.",
    research_basis:
      "부모의 명확한 구조와 안내는 자녀가 세상을 예측하고 자기규제 능력을 키우는 발판이 됩니다. 국내 연구에서 부모의 구조 제공은 자녀의 자율적 동기와 자기조절 효능감을 매개로 학업 참여를 높이는 것으로 확인되었고(김도희, 2022), 확고한 정체성 형성을 통해 심리적 웰빙 향상과 부적응 감소로 이어졌습니다(이준배 등, 2024). 다만 구조 제공은 감성적 지지와 함께 있을 때 결과가 더 안정적이므로(윤초희·최옥주, 2020), 따뜻함을 조금 더 얹으면 좋습니다.",
    care_tips: [
      "아침이나 잠자기 전 해야 할 일을 그림 체크리스트 3개로만 정리해봅니다.",
      "지시하기보다 '먼저 할 것과 나중에 할 것 중 무엇을 고를까?'라고 선택권을 줍니다.",
      "일주일에 한 번은 일정 없는 시간을 남겨 아이가 계획을 바꿔보게 합니다.",
    ],
    product_candidates: [
      { category: "유아 루틴 차트", search_query: "유아 아침 저녁 루틴 차트", product_name_example: "아침 준비와 잠자리 순서를 그림으로 보여주는 루틴 차트", reason: "반복되는 일과를 눈에 보이게 만들어 아이가 다음 행동을 예측하도록 돕습니다.", age_target: "3~6세", price_range: "1~2만원", coupang_link: "https://link.coupang.com/a/gzwJFjuQkC", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/e96a/dc8c770ca86b4803c1e8aff840887abb5a412dc8102a9a08a310d9b20e87.jpg" },
      { category: "유아 루틴 차트", search_query: "자석 생활습관 루틴판 유아", product_name_example: "완료 자석을 옮기는 유아 생활 습관 루틴판", reason: "해야 할 일을 하나씩 완료하는 재미로 자기주도적인 생활 습관을 만들어줍니다.", age_target: "4~7세", price_range: "2~3만원" },
      { category: "유아 루틴 차트", search_query: "어린이 할일 체크판 보상 스티커", product_name_example: "주간 할 일과 보상 스티커를 함께 쓰는 어린이 체크판", reason: "목표와 성취를 구체적으로 확인하며 꾸준한 루틴 형성을 격려할 수 있습니다.", age_target: "5~7세", price_range: "1~2만원" },
      { category: "어린이 타이머", search_query: "어린이 시각 타이머 무소음", product_name_example: "남은 시간이 색으로 표시되는 무소음 시각 타이머", reason: "추상적인 시간을 눈으로 보여줘 놀이 종료와 활동 전환을 수월하게 합니다.", age_target: "4~7세", price_range: "1~3만원", coupang_link: "https://link.coupang.com/a/gzwKuZNjfU", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/b57f/edaf3d8bf22d2361d97d35cbf6bb81c46dad11b9e2a3d28920d31b803666.png" },
      { category: "어린이 타이머", search_query: "유아 양치 타이머 모래시계", product_name_example: "양치 시간을 알려주는 어린이용 흡착식 모래시계", reason: "매일 같은 시간 동안 양치하는 습관을 놀이처럼 익히게 해줍니다.", age_target: "3~7세", price_range: "1만원 이하" },
      { category: "어린이 타이머", search_query: "어린이 공부 타이머 알람", product_name_example: "큰 화면과 간단한 버튼을 갖춘 어린이 활동 타이머", reason: "놀이와 학습 시간을 스스로 구분하고 계획하는 기초를 만들어줍니다.", age_target: "5~7세", price_range: "1~2만원" },
      { category: "자석 스케줄 보드", search_query: "어린이 자석 스케줄 보드", product_name_example: "요일별 활동 자석을 붙이는 어린이 주간 스케줄 보드", reason: "한 주의 일정을 아이와 함께 확인하며 예측 가능하고 안정적인 생활을 돕습니다.", age_target: "4~7세", price_range: "2~4만원", coupang_link: "https://link.coupang.com/a/gzwSsPpfTU", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2023/06/15/17/8/9f693053-be8e-4f0e-a070-4d285eb5a8d9.jpg" },
      { category: "자석 스케줄 보드", search_query: "유아 그림 자석 일정표", product_name_example: "등원·식사·목욕·취침 그림 자석이 포함된 하루 일정표", reason: "글자를 몰라도 그림을 따라 하루 순서를 쉽게 이해할 수 있습니다.", age_target: "3~6세", price_range: "1~3만원" },
      { category: "자석 스케줄 보드", search_query: "어린이 월간 자석 달력 보드", product_name_example: "날짜와 가족 일정을 표시하는 어린이용 월간 자석 달력", reason: "다가올 약속과 행사를 함께 준비하며 아이의 시간 감각을 길러줍니다.", age_target: "5~7세", price_range: "2~4만원" },
      { category: "유아 정리함", search_query: "유아 장난감 정리함 분리 수납", product_name_example: "장난감을 종류별로 나누는 다단 바구니형 유아 정리함", reason: "물건마다 정해진 자리를 만들어 아이가 스스로 정리하기 쉽게 해줍니다.", age_target: "3~7세", price_range: "3~7만원", coupang_link: "https://link.coupang.com/a/gzwUhLWeku", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/b726/ab5fae7fc656fa21eea2aa34603070f4564c53b029df5847055f9a10e344.jpg" },
      { category: "유아 정리함", search_query: "뚜껑 투명 장난감 수납함", product_name_example: "내용물을 바로 확인할 수 있는 투명 뚜껑 장난감 수납함", reason: "찾기와 분류가 쉬워져 놀이 준비부터 마무리까지 체계적으로 관리할 수 있습니다.", age_target: "3~7세", price_range: "1~3만원" },
      { category: "유아 정리함", search_query: "어린이 책 장난감 수납장", product_name_example: "전면 책꽂이와 장난감 바구니가 결합된 낮은 수납장", reason: "아이가 직접 꺼내고 제자리에 돌려놓을 수 있어 정리 루틴을 강화합니다.", age_target: "3~7세", price_range: "5~10만원" },
      { category: "생활 습관 스티커북", search_query: "유아 생활습관 스티커북", product_name_example: "양치·정리·인사·식사 습관을 익히는 놀이 스티커북", reason: "생활 규칙을 반복 설명하기보다 재미있는 활동으로 자연스럽게 익히게 합니다.", age_target: "3~6세", price_range: "1만원 이하", coupang_link: "https://link.coupang.com/a/gzwWMOOLO8", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/f8dd/d01cd907c7c0a4261f4513fb38dd93b46245359eb6c52137ab5f0e0f4e5c.png" },
      { category: "생활 습관 스티커북", search_query: "유아 배변 훈련 스티커 차트", product_name_example: "성공할 때마다 붙이는 유아 배변 습관 스티커 차트", reason: "작은 성공을 눈에 보이게 기록해 새로운 생활 습관을 긍정적으로 강화합니다.", age_target: "3~5세", price_range: "1만원 이하" },
      { category: "생활 습관 스티커북", search_query: "어린이 칭찬 스티커판 생활습관", product_name_example: "주간 목표와 칭찬 스티커로 구성된 어린이 습관판", reason: "해야 할 행동과 달성 과정을 명확히 보여줘 꾸준한 실천을 돕습니다.", age_target: "4~7세", price_range: "1만원대" },
      { category: "어린이 학습 달력", search_query: "어린이 날짜 날씨 학습 달력", product_name_example: "날짜·요일·계절·날씨를 매일 표시하는 어린이 학습 달력", reason: "매일 달력을 확인하는 짧은 루틴으로 시간과 계절 개념을 익히게 합니다.", age_target: "4~7세", price_range: "1~3만원", coupang_link: "https://link.coupang.com/a/gzwXR3ogXQ", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/5374/ad2f7e3e04c2ee9502d40f684ac48acf570ab07e33200d8818e63880c782.jpg" },
      { category: "어린이 학습 달력", search_query: "유아 자석 만년달력 한글", product_name_example: "숫자와 한글 자석으로 날짜를 만드는 유아용 만년달력", reason: "아이와 직접 날짜를 조합하며 계획 습관과 기초 학습을 함께 지원합니다.", age_target: "5~7세", price_range: "2~4만원" },
      { category: "어린이 학습 달력", search_query: "어린이 벽걸이 달력 스티커", product_name_example: "가족 행사와 아이의 일정을 표시하는 대형 벽걸이 달력", reason: "가족의 계획을 한눈에 공유하며 아이에게 일정 관리의 기초를 알려줍니다.", age_target: "4~7세", price_range: "1~2만원" },
    ],
    share_hook: "저는 아이 인생의 다정한 매니저래요—우리 모임 계획형 부모를 찾아보세요!",
    coord: { a: -1, b: 1 },
    color: "#5B7A94",
  },
  freeflow: {
    key: "freeflow",
    name_kr: "자유형 부모",
    tagline: "아이의 엉뚱함을 가능성으로 바라보는 부모",
    summary:
      "아이가 마음 가는 대로 탐색하고 자기만의 답을 찾을 수 있도록 넉넉한 공간을 내어줍니다. 정해진 방식보다 지금 아이가 느끼는 즐거움과 호기심을 소중하게 여깁니다. 예상 밖의 행동에서도 개성과 가능성을 발견하며 함께 웃어주는 부모입니다.",
    strengths: [
      "아이의 개성과 감정을 있는 그대로 존중합니다.",
      "호기심이 자연스럽게 놀이와 배움으로 이어지게 합니다.",
      "실수와 엉뚱한 시도를 편안하게 받아줍니다.",
    ],
    cautions: [
      "자유로운 선택 속에서도 꼭 지켜야 할 기준은 짧고 분명하게 알려주는 것이 좋습니다.",
      "아이가 선택을 어려워할 때는 두세 가지 보기로 범위를 좁혀줘도 괜찮습니다.",
    ],
    child_growth:
      "우리 아이는 남들과 다른 생각을 두려워하지 않고 자유롭게 표현하는 아이로 자랍니다. 자신의 감정과 취향을 존중받은 경험을 통해 건강한 자존감을 키웁니다. 실패를 정답의 반대가 아닌 새로운 시도로 받아들이며 창의적으로 세상을 탐색합니다.",
    research_basis:
      "부모의 자율성 지지는 자기결정성 이론(Ryan & Deci, 2000)에서 자녀의 내재 동기와 심리적 웰빙의 핵심 원천으로 강조됩니다. 국내 연구에서 자율성 지지는 자녀의 확고한 정체성 형성을 거쳐 심리적 웰빙 향상으로 이어졌고(이준배 등, 2024), 자아존중감과 자기조절력을 높이는 데 기여했습니다(김도희, 2022). 이 유형이 Maccoby & Martin(1983)의 permissive(허용형)와 다른 점은 감성적 반응성이 살아 있다는 것입니다. 자율에 최소한의 명확한 규칙 두세 가지만 얹어도 자녀의 창의성과 자기효능감이 더 안정적으로 자랍니다.",
    care_tips: [
      "완성 방법을 알려주지 않고 종이, 상자, 테이프만 꺼내 자유롭게 만들어보게 합니다.",
      "하루에 한 번 아이가 정한 놀이를 부모가 15분 동안 그대로 따라가 봅니다.",
      "안전과 생활에 꼭 필요한 규칙을 세 가지만 정해 짧은 문장으로 반복합니다.",
    ],
    product_candidates: [
      { category: "오픈엔디드 블록", search_query: "원목 무지개 블록 유아", product_name_example: "쌓기·터널·균형 놀이가 가능한 원목 무지개 블록", reason: "정해진 완성법 없이 아이의 상상에 따라 매번 다른 놀이로 확장됩니다.", age_target: "3~7세", price_range: "2~6만원", coupang_link: "https://link.coupang.com/a/gzwZF7HRx6", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/rs_quotation_api/cdm4br1q/4291bb23f61a4786ab9329c8502d1008.jpg" },
      { category: "오픈엔디드 블록", search_query: "대형 소프트 블록 유아", product_name_example: "집과 길, 장애물을 자유롭게 만드는 대형 소프트 블록 세트", reason: "온몸을 사용해 공간을 바꾸며 아이의 자유로운 탐색 욕구를 채워줍니다.", age_target: "3~6세", price_range: "3~8만원" },
      { category: "오픈엔디드 블록", search_query: "자석 블록 투명 유아", product_name_example: "평면과 입체 작품을 자유롭게 만드는 투명 자석 블록 세트", reason: "색과 빛, 구조를 마음껏 조합하며 창의적인 시도를 이어갈 수 있습니다.", age_target: "4~7세", price_range: "3~7만원" },
      { category: "유아 미술 재료 세트", search_query: "유아 미술놀이 재료 종합세트", product_name_example: "색종이·폼폼·막대·스팽글이 담긴 유아 미술 재료 세트", reason: "다양한 재료를 아이가 직접 고르고 조합하며 자기만의 작품을 만들게 합니다.", age_target: "4~7세", price_range: "1~3만원", coupang_link: "https://link.coupang.com/a/gzw0OuwwLI", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/a575/081c46940b7f125f548a178a700579365eda2c66d596b4197aac01d4359c.jpeg" },
      { category: "유아 미술 재료 세트", search_query: "유아 물감 세트 안전 미술놀이", product_name_example: "물감·붓·팔레트·도화지가 포함된 유아 미술놀이 세트", reason: "정답 없는 색채 놀이로 아이의 감정과 상상을 자유롭게 표현할 수 있습니다.", age_target: "3~7세", price_range: "1~3만원" },
      { category: "유아 미술 재료 세트", search_query: "유아 점토 만들기 도구 세트", product_name_example: "여러 색 점토와 찍기·밀기 도구가 포함된 만들기 세트", reason: "손으로 형태를 계속 바꾸며 아이가 떠올린 생각을 제한 없이 구현할 수 있습니다.", age_target: "3~7세", price_range: "1~3만원" },
      { category: "역할놀이 소품", search_query: "유아 주방놀이 소품 세트", product_name_example: "음식 재료와 조리 도구가 다양하게 담긴 주방 역할놀이 소품", reason: "요리사와 손님 등 아이가 원하는 역할로 이야기를 자유롭게 만들어갈 수 있습니다.", age_target: "3~7세", price_range: "2~5만원", coupang_link: "https://link.coupang.com/a/gzw2ndA6hM", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/7ab1/e867b0c6a9f94f045629b3c445aad6c4a7bfdde8f85b24080cf036e74c56.png" },
      { category: "역할놀이 소품", search_query: "유아 직업 역할놀이 의상 소품", product_name_example: "여러 직업으로 변신할 수 있는 역할놀이 의상과 소품 세트", reason: "다양한 인물이 되어보며 아이의 상상 세계와 표현력을 넓혀줍니다.", age_target: "4~7세", price_range: "2~4만원" },
      { category: "역할놀이 소품", search_query: "유아 시장놀이 계산대 소품", product_name_example: "장바구니·모형 식품·놀이 돈이 포함된 시장놀이 소품", reason: "놀이의 규칙과 이야기를 아이가 직접 만들며 사회적 상상력을 발휘할 수 있습니다.", age_target: "3~7세", price_range: "2~5만원" },
      { category: "촉감 놀이 세트", search_query: "유아 촉감놀이 모래 세트", product_name_example: "틀과 도구가 포함된 실내용 촉감 모래 놀이 세트", reason: "만지고 누르고 흩트리는 과정 자체를 즐기며 감각과 상상을 함께 자극합니다.", age_target: "3~7세", price_range: "2~4만원", coupang_link: "https://link.coupang.com/a/gzw3NssyQe", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/0c24/8a2a8c623b3663f5e7bb8dbd0be7fd2fec6a57d36e114a64295827edbf80.png" },
      { category: "촉감 놀이 세트", search_query: "유아 촉감놀이 슬라임 만들기", product_name_example: "색과 장식을 조합하는 어린이 촉감 슬라임 만들기 세트", reason: "아이 스스로 질감과 색을 바꿔보며 자유로운 감각 실험을 즐길 수 있습니다.", age_target: "5~7세", price_range: "1~3만원" },
      { category: "촉감 놀이 세트", search_query: "유아 물감 촉감놀이 도구 세트", product_name_example: "롤러·스펀지·도장으로 자유롭게 찍는 촉감 미술 세트", reason: "여러 도구의 흔적과 질감을 비교하며 아이만의 표현 방식을 발견하게 합니다.", age_target: "3~6세", price_range: "1~2만원" },
      { category: "자연 관찰 키트", search_query: "어린이 곤충 관찰 채집통 세트", product_name_example: "채집통·핀셋·관찰경이 포함된 어린이 곤충 관찰 키트", reason: "밖에서 발견한 생물을 아이가 주도적으로 살펴보며 호기심을 확장할 수 있습니다.", age_target: "4~7세", price_range: "1~3만원", coupang_link: "https://link.coupang.com/a/gzw4HBJW44", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/dc6a/3d3a0227a1ae75ed1ad6300a9a5fa02bb8fc5304985dfde1f6973197d41c.jpg" },
      { category: "자연 관찰 키트", search_query: "어린이 식물 키우기 관찰 키트", product_name_example: "씨앗을 심고 성장 과정을 기록하는 어린이 식물 관찰 키트", reason: "매일 달라지는 식물을 자유롭게 관찰하며 생명과 변화에 대한 감각을 키워줍니다.", age_target: "4~7세", price_range: "1~2만원" },
      { category: "자연 관찰 키트", search_query: "어린이 야외 탐험 관찰 세트", product_name_example: "쌍안경·나침반·돋보기로 구성된 어린이 야외 탐험 세트", reason: "정해진 답을 찾기보다 아이가 관심 가는 자연을 직접 탐색하도록 이끌어줍니다.", age_target: "5~7세", price_range: "2~4만원" },
      { category: "붙였다 뗐다 스티커북", search_query: "유아 붙였다 떼는 스티커북", product_name_example: "배경판에 반복해서 붙이며 장면을 꾸미는 스티커북", reason: "스티커 위치와 이야기를 아이 마음대로 바꾸며 창의적인 놀이를 반복할 수 있습니다.", age_target: "3~6세", price_range: "1만원 이하", coupang_link: "https://link.coupang.com/a/gzw5u62VZ6", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/bdda/6f804d357d6600beb1b0ddcbdaac5da6f73c7e9ed7796d181e4269b81959.jpg" },
      { category: "붙였다 뗐다 스티커북", search_query: "유아 공룡 재사용 스티커북", product_name_example: "공룡과 자연 배경을 자유롭게 꾸미는 재사용 스티커북", reason: "좋아하는 소재로 새로운 장면을 계속 만들며 상상과 이야기 구성을 즐기게 합니다.", age_target: "3~7세", price_range: "1만원대" },
      { category: "붙였다 뗐다 스티커북", search_query: "유아 옷입히기 재사용 스티커북", product_name_example: "인물과 의상을 자유롭게 조합하는 붙였다 떼는 스티커북", reason: "정해진 조합 없이 취향대로 꾸미며 아이의 개성과 표현력을 살려줍니다.", age_target: "4~7세", price_range: "1만원대" },
    ],
    share_hook: "저는 아이의 엉뚱함을 키워주는 자유형이래요—함께 육아 여행 떠날 친구를 태그해보세요!",
    coord: { a: 1, b: -1 },
    color: "#8FA678",
  },
  observer: {
    key: "observer",
    name_kr: "관찰형 부모",
    tagline: "한 걸음 뒤에서 아이의 힘을 발견하는 부모",
    summary:
      "아이가 먼저 시도하고 자기 힘으로 답을 찾을 수 있도록 서두르지 않고 지켜봅니다. 꼭 필요한 순간에는 상황을 정확히 파악한 뒤 적절한 도움을 건넵니다. 부모가 모든 길을 대신 닦아주기보다 아이가 자신의 속도로 성장할 힘을 믿어줍니다.",
    strengths: [
      "아이의 자립심과 문제 해결력을 키워줍니다.",
      "감정에 휩쓸리지 않고 상황을 차분하게 바라봅니다.",
      "아이의 속도와 선택을 존중하며 기다려줍니다.",
    ],
    cautions: [
      "아이가 도움을 말로 청하지 않아도 표정이나 행동으로 신호를 보낼 수 있습니다.",
      "지켜보는 사랑도 가끔은 말과 스킨십으로 보여주면 아이가 더 분명히 느낄 수 있습니다.",
    ],
    child_growth:
      "우리 아이는 시행착오를 통해 스스로 판단하고 문제를 해결하는 힘을 기릅니다. 부모가 자신을 믿고 있다는 경험은 독립심과 자신감의 토대가 됩니다. 필요할 때 도움을 요청하고 받은 도움을 다시 자기 힘으로 연결하는 아이로 자랍니다.",
    research_basis:
      "관찰형은 Maccoby & Martin(1983)의 방임형(uninvolved)과 뚜렷이 구분됩니다. 방임이 관심과 개입 모두 부재한 상태라면, 관찰형은 자녀의 자기결정성을 존중하는 능동적 선택으로서 필요한 순간에는 적절히 개입합니다. 자기결정성 이론(Ryan & Deci, 2000)의 자율성 지지에 가까운 형태이며, 국내 연구에서 부모의 자율성 지지는 자녀의 자아존중감과 자기조절력을 높이는 경로로 확인되었습니다(김도희, 2022). 다만 자녀가 요청하지 않아도 정서 신호에 반응하는 감성적 표현을 조금 늘리면(예: 하루 한 번의 스킨십, 격려의 한마디) 자녀가 부모의 관심을 더 분명히 지각합니다(이준배 등, 2024).",
    care_tips: [
      "아이가 막혔을 때 바로 답을 주지 말고 '어떤 도움이 필요해?'라고 먼저 물어봅니다.",
      "하루에 한 번 결과보다 시도한 과정을 구체적으로 말해 칭찬합니다.",
      "잠들기 전 손을 잡거나 안아주며 '오늘도 네가 해내는 걸 잘 봤어'라고 표현합니다.",
    ],
    product_candidates: [
      { category: "유아 퍼즐", search_query: "유아 꼭지 퍼즐 원목", product_name_example: "동물과 탈것 그림을 맞추는 손잡이형 원목 꼭지 퍼즐", reason: "아이 혼자 모양과 위치를 비교하며 성공 경험을 쌓는 과정을 지켜볼 수 있습니다.", age_target: "3~4세", price_range: "1~2만원", coupang_link: "https://link.coupang.com/a/gzw7pp40LQ", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2022/06/06/11/0/eafa5a3f-75ae-4e87-b647-40ab9d7fa944.jpg" },
      { category: "유아 퍼즐", search_query: "유아 단계별 판퍼즐 세트", product_name_example: "조각 수가 점차 늘어나는 단계별 유아 판퍼즐 세트", reason: "아이의 현재 수준에 맞춰 스스로 도전하고 성장하는 모습을 확인하기 좋습니다.", age_target: "3~6세", price_range: "1~3만원" },
      { category: "유아 퍼즐", search_query: "어린이 100피스 퍼즐", product_name_example: "관찰할 요소가 풍부한 어린이용 100조각 그림 퍼즐", reason: "집중해서 단서를 찾고 시행착오로 해결하는 힘을 기르는 데 도움이 됩니다.", age_target: "5~7세", price_range: "1~2만원" },
      { category: "과학 실험 키트", search_query: "유아 과학 실험 키트 안전", product_name_example: "색 변화와 거품 반응을 관찰하는 어린이 기초 과학 실험 키트", reason: "부모가 답을 알려주기 전에 아이가 현상을 관찰하고 원인을 추측하게 해줍니다.", age_target: "5~7세", price_range: "2~4만원", coupang_link: "https://link.coupang.com/a/gzw8sR2uia", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/4239/9cb33f5f1bb5f8066ccbf1033a4c041249da357a3eae20a5a4151f25633e.jpg" },
      { category: "과학 실험 키트", search_query: "어린이 자석 과학 실험 세트", product_name_example: "밀기와 당기기를 직접 시험하는 어린이 자석 실험 세트", reason: "아이가 여러 방법을 스스로 시도하며 규칙을 발견하는 과정을 지원합니다.", age_target: "4~7세", price_range: "1~3만원" },
      { category: "과학 실험 키트", search_query: "어린이 화산 폭발 실험 키트", product_name_example: "모형을 만들고 반응을 관찰하는 어린이 화산 실험 키트", reason: "예상하고 실험한 뒤 결과를 비교하는 기초적인 탐구 경험을 제공합니다.", age_target: "5~7세", price_range: "1~3만원" },
      { category: "어린이 보드게임", search_query: "유아 메모리 보드게임", product_name_example: "그림의 위치를 기억해 짝을 맞추는 유아 메모리 게임", reason: "부모의 개입을 줄이고 아이가 관찰력과 기억력으로 해결하도록 기다릴 수 있습니다.", age_target: "3~6세", price_range: "1~3만원", coupang_link: "https://link.coupang.com/a/gzxaCCvWeW", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/b26c/41a7afaff4dd291d0601706e3694865b66123937e2cb22ee9300258434b2.png" },
      { category: "어린이 보드게임", search_query: "어린이 협동 보드게임 5세", product_name_example: "가족이 함께 문제를 해결하는 어린이 협동 보드게임", reason: "아이의 판단 방식을 관찰하면서 경쟁 부담 없이 해결 전략을 나눌 수 있습니다.", age_target: "5~7세", price_range: "2~4만원" },
      { category: "어린이 보드게임", search_query: "유아 규칙 보드게임 4세", product_name_example: "색과 모양 규칙을 찾아 진행하는 입문용 유아 보드게임", reason: "간단한 규칙 속에서 아이가 선택하고 결과를 경험하며 사고력을 키우게 합니다.", age_target: "4~7세", price_range: "1~3만원" },
      { category: "몬테소리 교구", search_query: "몬테소리 소근육 교구 유아", product_name_example: "단추·지퍼·버클을 스스로 조작하는 몬테소리 소근육 교구", reason: "부모가 대신하지 않고 아이가 반복 연습하며 생활 기술을 익히도록 돕습니다.", age_target: "3~5세", price_range: "1~3만원", coupang_link: "https://link.coupang.com/a/gzxbU3Ou3U", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/a45a/5f35318e915ec32468d31f5e1f492ca2843fd937550211490b0e70539e32.jpg" },
      { category: "몬테소리 교구", search_query: "몬테소리 분류 교구 색깔 모양", product_name_example: "색과 모양을 기준으로 나누는 원목 분류 교구", reason: "아이가 스스로 기준을 발견하고 분류하는 사고 과정을 차분히 관찰할 수 있습니다.", age_target: "3~6세", price_range: "2~4만원" },
      { category: "몬테소리 교구", search_query: "몬테소리 수세기 교구 원목", product_name_example: "숫자와 수량을 직접 대응시키는 원목 수 세기 교구", reason: "손으로 조작하고 오류를 바로잡으며 수 개념을 자기 속도로 이해하게 합니다.", age_target: "4~7세", price_range: "2~4만원" },
      { category: "자연 관찰 돋보기", search_query: "어린이 돋보기 대형 안전", product_name_example: "아이 손에 맞는 손잡이와 넓은 렌즈를 갖춘 안전 돋보기", reason: "일상에서 발견한 작은 사물을 아이가 자세히 살펴보는 습관을 길러줍니다.", age_target: "3~7세", price_range: "1만원 이하", coupang_link: "https://link.coupang.com/a/gzxdzEXdZI", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/4547/232f7e664bba81d7b2b0e3b7d3287a2b5c005f8fc3f76af3c441493b9c54.png" },
      { category: "자연 관찰 돋보기", search_query: "어린이 곤충 관찰 확대경 통", product_name_example: "곤충을 위와 아래에서 확대해 보는 어린이 관찰통", reason: "생물의 움직임과 특징을 가까이 관찰하며 스스로 질문을 떠올리게 합니다.", age_target: "4~7세", price_range: "1~2만원" },
      { category: "자연 관찰 돋보기", search_query: "어린이 휴대용 현미경 자연관찰", product_name_example: "야외에서 잎과 돌을 확대해 보는 휴대용 어린이 현미경", reason: "눈에 잘 보이지 않던 차이를 발견하며 깊이 관찰하는 즐거움을 알려줍니다.", age_target: "5~7세", price_range: "2~5만원" },
      { category: "유아 문제 해결 워크북", search_query: "유아 사고력 워크북 5세", product_name_example: "규칙 찾기·분류·비교 문제로 구성된 유아 사고력 워크북", reason: "아이의 답뿐 아니라 어떤 방식으로 생각하는지 차분히 살펴볼 수 있습니다.", age_target: "5~6세", price_range: "1만원 이하", coupang_link: "https://link.coupang.com/a/gzxeNTFDX2", image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/625f/e469d7f5579f2a48c967cbad017aaf6a98d365d9e1b85bc1336994e4043a.png" },
      { category: "유아 문제 해결 워크북", search_query: "유아 미로찾기 워크북", product_name_example: "난이도가 단계적으로 높아지는 유아 미로 찾기 워크북", reason: "막힌 길에서 스스로 돌아가 다른 방법을 찾는 문제 해결 경험을 제공합니다.", age_target: "4~7세", price_range: "1만원 이하" },
      { category: "유아 문제 해결 워크북", search_query: "유아 숨은그림찾기 워크북", product_name_example: "관찰 단서가 풍부한 유아 숨은그림찾기 워크북", reason: "부모가 정답을 재촉하지 않고 아이의 집중과 발견 과정을 지켜보기에 좋습니다.", age_target: "4~7세", price_range: "1만원 이하" },
    ],
    share_hook: "저는 말없이 아이의 성장을 포착하는 관찰형이래요—우리 주변 관찰형 부모를 소환해보세요!",
    coord: { a: -1, b: -1 },
    color: "#9E8AA0",
  },
};

export const TYPE_KEYS: TypeKey[] = ["nurturer", "planner", "freeflow", "observer"];

// 이론적 기반
export const THEORETICAL_BASIS =
  "Maccoby & Martin(1983) 2축 프레임과 자기결정성 이론(Ryan & Deci, 2000) 기반, 국내 실증연구 반영";

// 참고문헌
export const REFERENCES: Reference[] = [
  {
    id: 1,
    citation:
      "Maccoby, E. E., & Martin, J. A. (1983). Socialization in the context of the family: Parent-child interaction. In P. H. Mussen (Ed.), Handbook of child psychology, Vol. 4: Socialization, personality, and social development (pp. 1-101). New York: Wiley.",
  },
  {
    id: 2,
    citation:
      "Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. American Psychologist, 55(1), 68-78.",
  },
  {
    id: 3,
    citation:
      "Skinner, E., Johnson, S., & Snyder, T. (2005). Six dimensions of parenting: A motivational model. Parenting: Science and Practice, 5(2), 175-235.",
  },
  {
    id: 4,
    citation:
      "김도희 (2022). 부모의 행복과 자녀의 행복의 관계에서 긍정적 양육태도, 자아존중감, 우울의 매개효과. Journal of Digital Convergence, 20(3), 469-479.",
  },
  {
    id: 5,
    citation:
      "이준배, 허유진, 조병철, 박선웅 (2024). 부모의 양육태도와 청소년 자녀의 정신건강 간의 관계: 정체성 발달의 매개효과. 한국심리학회지: 학교, 21(3), 281-299.",
  },
  {
    id: 6,
    citation:
      "윤초희, 최옥주 (2020). 청소년 발달과 적응의 예측요인으로서 부모 자율성 지지와 구조 제공의 관계 탐색: 자기결정성 이론의 관점에서. 한국청소년학회지, 27(12), 275-306.",
  },
  {
    id: 7,
    citation:
      "염혜선, 이은주 (2020). 중학생의 학업열의, 또래관계 질, 공격성 및 삶의 만족도에 대한 부모의 자율성 지지와 구조제공의 시너지 효과. 한국교육심리학회지, 34(3), 521-541.",
  },
];

// 신중한 톤 문구
export const DISCLAIMER =
  "본 테스트는 40여 년간 축적된 양육태도 연구를 참고해 만든 참고용 콘텐츠입니다. 아이의 성장은 부모의 성향뿐 아니라 기질, 환경, 관계 등 여러 요인의 영향을 받으며, 어떤 유형이 절대적으로 좋거나 나쁘지 않습니다. 특히 '관찰형'은 학술적 방임(uninvolved parenting)과 구분되며, 자녀의 자율성을 존중하는 능동적 선택을 의미합니다.";
