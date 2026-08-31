// 부모 성향 테스트 v3 - 16 유형 확장
// 4축 (감성/이성 × 개입/자율 × 원칙/융통 × 도전/안정) → 16 유형
// 문항 28개, 유형 16개, 상품 카탈로그 24개, 호환성 매트릭스

export type Axis = "A" | "B" | "C" | "D";
export type WeightA = "감성" | "이성";
export type WeightB = "개입" | "자율";
export type WeightC = "원칙" | "융통";
export type WeightD = "도전" | "안정";
export type Weight = WeightA | WeightB | WeightC | WeightD;

export type Family = "nurturer" | "supporter" | "planner" | "observer";

export type TypeKey =
  | "nurturer_guardian" | "nurturer_pioneer" | "nurturer_helper" | "nurturer_companion"
  | "supporter_cheer" | "supporter_coach" | "supporter_friend" | "supporter_artist"
  | "planner_architect" | "planner_conductor" | "planner_navigator" | "planner_advisor"
  | "observer_lighthouse" | "observer_mentor" | "observer_watcher" | "observer_explorer";

export interface Question {
  id: number;
  axis: Axis;
  situation: string;
  choiceA: { text: string; weight: Weight };
  choiceB: { text: string; weight: Weight };
}

export interface Product {
  category: string;
  search_query: string;
  product_name_example: string;
  reason: string;
  age_target: string;
  price_range: string;
  coupang_link?: string;
  image_url?: string;
}

export interface TypeContent {
  key: TypeKey;
  family: Family;
  name_kr: string;
  tagline: string;
  color: string;
  coord: { a: 1 | -1; b: 1 | -1; c: 1 | -1; d: 1 | -1 };
  summary: string;
  strengths: string[];
  cautions: string[];
  child_growth: string;
  research_basis: string;
  care_tips: string[];
  share_hook: string;
  product_categories: string[]; // 6개 카테고리 (PRODUCT_CATALOG 참조)
  compatible_type: TypeKey; // 찰떡궁합 배우자 유형
  clash_type: TypeKey; // 안맞음 배우자 유형
}

export interface Reference {
  id: number;
  citation: string;
}

// 4개 계열별 대표 색
export const FAMILY_COLORS: Record<Family, string> = {
  nurturer: "#E8927C",  // 코랄 (감성+개입)
  supporter: "#8FA678", // 세이지 (감성+자율)
  planner: "#5B7A94",   // 블루 (이성+개입)
  observer: "#9E8AA0",  // 모브 (이성+자율)
};

export const QUESTIONS: Question[] = [
  { id: 1, axis: "A", situation: "주말 오후 놀이터에서 아이가 꼭 쥐고 놀던 자동차를 친구에게 빼앗기자 입술을 떨며 울기 시작합니다. 빈손을 내민 채 \"내가 먼저 갖고 있었는데…\"라고 말하며 부모 품으로 달려옵니다.", choiceA: { text: "\"많이 속상했지? 아빠한테 와\" 하며 아이를 안고 등을 천천히 토닥입니다", weight: "감성" }, choiceB: { text: "\"처음부터 어떤 일이 있었는지 아빠한테 말해줄래?\" 하며 아이와 함께 상황을 차분히 확인합니다", weight: "이성" } },
  { id: 2, axis: "A", situation: "아침 식탁에서 아이가 컵을 건드려 우유가 식탁과 바닥으로 쏟아집니다. 아이는 그대로 얼어붙어 부모의 얼굴을 살피며 작은 목소리로 \"일부러 그런 거 아니야\"라고 말합니다.", choiceA: { text: "\"괜찮아, 누구나 쏟을 수 있어\" 하며 놀란 아이의 어깨를 먼저 감싸줍니다", weight: "감성" }, choiceB: { text: "\"괜찮아, 우선 휴지를 가져와서 여기부터 닦아보자\" 하며 정리하는 순서를 알려줍니다", weight: "이성" } },
  { id: 3, axis: "A", situation: "잠자기 전 이불 속에서 이야기를 나누던 아이가 갑자기 목소리를 낮추며 \"아빠, 나 내일 유치원 안 가면 안 돼?\"라고 말합니다. 낮에는 별말 없이 잘 다녀왔는데 눈빛이 조금 흔들립니다.", choiceA: { text: "\"오늘 마음이 좀 어땠어?\" 하며 이불을 끌어당겨 옆에 눕고 이야기를 들어봅니다", weight: "감성" }, choiceB: { text: "\"무슨 일 있었어? 어떤 부분이 가기 싫은지 하나씩 얘기해볼까?\" 하고 차분히 물어봅니다", weight: "이성" } },
  { id: 4, axis: "A", situation: "거실 바닥에서 한참 쌓아 올린 블록 성이 아이의 손끝에 걸려 와르르 무너집니다. 아이는 흩어진 블록을 멍하니 바라보다가 \"진짜 오래 만들었는데…\"라며 어깨를 축 늘어뜨립니다.", choiceA: { text: "\"열심히 만들었는데 한순간에 무너져서 정말 속상하겠다\" 하며 아이 곁에 바짝 앉습니다", weight: "감성" }, choiceB: { text: "\"어디가 흔들렸는지 같이 찾아볼까? 다음에는 더 튼튼하게 만들 수 있을 거야\" 하며 블록을 살펴봅니다", weight: "이성" } },
  { id: 5, axis: "A", situation: "저녁 식사 중 아이가 밥은 한 숟갈도 먹지 않고 반찬만 젓가락으로 이리저리 밀어냅니다. 평소 좋아하던 반찬에도 손을 대지 않은 채 \"오늘은 아무것도 먹기 싫어\"라고 중얼거립니다.", choiceA: { text: "\"오늘은 입맛도 없고 마음도 좀 그런가 보네\" 하며 아이의 표정과 기분을 살핍니다", weight: "감성" }, choiceB: { text: "\"배가 안 고픈 건지, 반찬이 싫은 건지 하나씩 말해줄래?\" 하며 먹지 않는 이유를 확인합니다", weight: "이성" } },
  { id: 6, axis: "A", situation: "거실에서 장난감을 가지고 놀던 형제가 갑자기 서로 밀치며 큰 소리로 다툽니다. 한 아이는 \"쟤가 먼저 그랬어!\"라고 외치고, 다른 아이는 눈물을 글썽이며 억울하다고 매달립니다.", choiceA: { text: "\"둘 다 많이 화나고 속상했구나. 한 명씩 아빠한테 이야기해줄래?\" 하며 각자의 마음을 들어줍니다", weight: "감성" }, choiceB: { text: "\"누가 먼저 장난감을 가지고 있었는지 처음부터 차례대로 말해보자\" 하며 사건의 순서를 정리합니다", weight: "이성" } },
  { id: 7, axis: "A", situation: "유치원 발표회가 끝난 뒤 아이가 무대에서 대사를 잊었던 장면을 떠올리며 고개를 숙입니다. 다른 가족들이 사진을 찍는 사이 \"나만 틀렸어\"라고 말하며 손가락을 꼼지락거립니다.", choiceA: { text: "\"사람들이 보고 있어서 많이 떨렸지? 그래도 끝까지 서 있던 게 아빠는 참 대단해 보여\" 하며 꼭 안아줍니다", weight: "감성" }, choiceB: { text: "\"처음 인사는 정말 잘했어. 다음에는 헷갈린 부분만 한 번 더 연습해보자\" 하며 잘한 점과 보완할 점을 짚어줍니다", weight: "이성" } },
  { id: 8, axis: "A", situation: "어린이집에 늦을 것 같은 아침, 현관 앞에서 아이가 입고 있던 옷자락을 잡아당기며 갑자기 울먹입니다. 어젯밤 직접 골랐던 옷인데도 \"이거 입고 가기 싫어\"라며 방으로 돌아가려 합니다.", choiceA: { text: "\"어제는 좋았는데 지금은 마음이 달라졌구나. 뭐가 불편한지 말해줄래?\" 하며 아이 눈높이에 앉습니다", weight: "감성" }, choiceB: { text: "\"옷이 까슬거리는지, 색이 싫은지 하나씩 확인해보자\" 하며 싫어진 이유를 구체적으로 짚어봅니다", weight: "이성" } },
  { id: 9, axis: "A", situation: "어린이집에서 돌아온 아이가 가방도 내려놓지 않은 채 \"친구가 나랑 안 논다고 했어\"라고 말합니다. 애써 아무렇지 않은 척하지만 평소보다 목소리가 작고 눈가가 금세 붉어집니다.", choiceA: { text: "\"그 말을 들으니까 마음이 많이 서운했겠다\" 하며 아이 옆에 앉아 이야기를 충분히 들어줍니다", weight: "감성" }, choiceB: { text: "\"다음에 또 그런 일이 생기면 친구에게 어떻게 말하면 좋을지 같이 생각해볼까?\" 하며 대응 방법을 찾아봅니다", weight: "이성" } },
  { id: 10, axis: "A", situation: "저녁 8시, 정리하기로 약속한 알람이 울렸는데도 아이는 거실 매트에서 자동차 놀이를 멈추지 않습니다. \"이것만 만들면 끝인데, 조금만 더 놀면 안 돼?\"라며 자동차를 품에 꼭 끌어안습니다.", choiceA: { text: "\"재미있는 걸 만들던 중이라 지금 멈추기가 정말 아쉽구나\" 하며 더 놀고 싶은 마음부터 알아줍니다", weight: "감성" }, choiceB: { text: "\"얼마나 더 하면 완성되는지 보고, 정리 시간을 몇 분 조정할지 정해보자\" 하며 필요한 시간을 구체적으로 확인합니다", weight: "이성" } },
  { id: 11, axis: "B", situation: "처음 찾아간 큰 놀이터에서 아이가 입구 근처에 멈춰 서서 미끄럼틀과 그네를 번갈아 바라봅니다. 뛰어노는 아이들 틈으로 들어가지 못한 채 부모의 손을 꼭 잡고 \"뭐부터 하지?\"라고 묻습니다.", choiceA: { text: "\"저기 낮은 미끄럼틀부터 아빠랑 같이 가볼까?\" 하며 손을 잡고 놀이를 골라줍니다", weight: "개입" }, choiceB: { text: "\"천천히 둘러보고 하고 싶은 게 생기면 알려줘\" 하며 아이가 먼저 움직일 때까지 곁에서 기다립니다", weight: "자율" } },
  { id: 12, axis: "B", situation: "거실 매트에 엎드려 퍼즐을 맞추던 아이가 같은 조각을 세 번째 뒤집으며 미간을 찌푸립니다. 나머지 조각들이 흩어져 있고 손이 자꾸 멈춥니다.", choiceA: { text: "\"이거 이 색깔이랑 붙여보면 어때?\" 하고 옆에 앉아 힌트를 슬쩍 건넵니다", weight: "개입" }, choiceB: { text: "\"혼자 해볼래?\" 하며 조금 떨어져서 다른 일을 하는 척 지켜봅니다", weight: "자율" } },
  { id: 13, axis: "B", situation: "느긋한 주말 아침, 거실에는 장난감이 놓여 있고 창밖으로 햇빛이 들어옵니다. 특별한 일정은 없는데 아이가 소파에 기대어 \"오늘 뭐 해?\"라고 묻습니다.", choiceA: { text: "\"오전에 공원에 갔다가 점심 먹고 그림 그리는 건 어때?\" 하며 하루 활동을 함께 정합니다", weight: "개입" }, choiceB: { text: "\"오늘은 네가 하고 싶은 걸 생각해봐. 정해지면 아빠한테 알려줘\" 하며 아이의 선택을 기다립니다", weight: "자율" } },
  { id: 14, axis: "B", situation: "등원 준비를 하던 아이가 방바닥에 앉아 양말을 혼자 신지만 뒤꿈치 부분이 자꾸 발등으로 돌아갑니다. 몇 번을 다시 당기던 아이가 \"왜 자꾸 이상하게 되지?\"라며 양말을 내려다봅니다.", choiceA: { text: "\"뒤꿈치 표시를 아래로 놓고 발가락부터 넣어보자\" 하며 옆에서 순서대로 알려줍니다", weight: "개입" }, choiceB: { text: "\"신어보고 불편한 곳이 있는지 걸어볼까?\" 하며 아이가 스스로 차이를 알아차리도록 기다립니다", weight: "자율" } },
  { id: 15, axis: "B", situation: "식탁에 앉아 색칠하던 아이가 파란 크레파스 대신 초록색으로 하늘을 가득 채웁니다. 완성한 그림을 높이 들고 \"여기는 초록색 하늘이야!\"라며 신난 얼굴로 보여줍니다.", choiceA: { text: "\"멋진 초록 하늘이네. 우리가 밖에서 본 하늘에는 어떤 색이 있었는지도 같이 찾아볼까?\" 하며 다른 색을 살펴보자고 제안합니다", weight: "개입" }, choiceB: { text: "\"초록색 하늘이라니 신기하다! 이곳에서는 어떤 일이 생기는지 더 그려볼래?\" 하며 아이의 표현을 그대로 이어가게 합니다", weight: "자율" } },
  { id: 16, axis: "B", situation: "키즈카페에서 아이가 친구와 같은 장난감 자동차를 붙잡고 서로 놓지 않습니다. 친구가 \"나도 할 거야\"라고 말하자 아이는 자동차를 품 쪽으로 당기며 부모를 힐끗 바라봅니다.", choiceA: { text: "\"한 번씩 타이머를 맞춰서 놀아보자. 네가 먼저 하고 다음은 친구 차례야\" 하며 나누는 방법을 정해줍니다", weight: "개입" }, choiceB: { text: "\"두 사람이 모두 놀고 싶은데 어떻게 하면 좋을까?\"라고만 묻고 아이들이 방법을 찾을 시간을 줍니다", weight: "자율" } },
  { id: 17, axis: "B", situation: "또래 친구들이 하나둘 새로운 체육 수업이나 미술 활동을 시작했다는 이야기가 들립니다. 아이는 전단지 속 사진을 잠깐 바라보지만 먼저 하고 싶다는 말은 꺼내지 않습니다.", choiceA: { text: "\"네가 몸 쓰는 걸 좋아하니까 수영이랑 축구 중에서 한번 체험해볼까?\" 하며 잘 맞을 만한 선택지를 추려줍니다", weight: "개입" }, choiceB: { text: "\"나중에 해보고 싶은 게 생기면 말해줘. 그때 같이 알아보자\" 하며 아이가 관심을 표현할 때까지 기다립니다", weight: "자율" } },
  { id: 18, axis: "B", situation: "아이 방에서 정리를 시작한 아이가 자동차를 책장에 올리고 그림책은 장난감 상자에 차곡차곡 넣습니다. 익숙한 자리가 아닌 곳으로 물건을 옮기면서도 \"내가 찾기 쉽게 하는 거야\"라며 꽤 진지한 표정을 짓습니다.", choiceA: { text: "\"자동차는 이 칸, 책은 책장에 두면 다음에도 찾기 쉽지 않을까? 같이 자리를 정해보자\" 하며 정리 위치를 잡아줍니다", weight: "개입" }, choiceB: { text: "\"네가 찾기 좋은 방식으로 끝까지 해봐. 다 하고 나면 아빠한테 알려줘\" 하며 아이 방식대로 맡겨봅니다", weight: "자율" } },
  { id: 19, axis: "B", situation: "공원 자전거 길에서 아이가 두 번 넘어져 무릎에 흙이 묻었지만 다시 안장에 올라갑니다. 입술을 꾹 다문 채 페달을 밟으면서도 앞바퀴가 흔들리고 부모가 있는 쪽을 자꾸 돌아봅니다.", choiceA: { text: "\"아빠가 뒤를 잡아줄게. 앞을 보고 페달을 천천히 밟아보자\" 하며 자세와 방향을 함께 잡아줍니다", weight: "개입" }, choiceB: { text: "\"아빠가 여기서 보고 있을게. 네 속도로 다시 해봐\" 하며 스스로 균형을 찾을 수 있도록 몇 걸음 물러섭니다", weight: "자율" } },
  { id: 20, axis: "B", situation: "잠자기 전 아이가 책장에서 그림책을 여섯 권이나 꺼내 이불 위에 펼쳐놓습니다. 표지를 하나씩 넘겨보며 \"이것도 읽고 싶고, 저것도 읽고 싶은데…\"라고 말한 채 좀처럼 고르지 못합니다.", choiceA: { text: "\"오늘은 동물책이랑 자동차책 중에서 한 권 골라볼까?\" 하며 선택지를 좁혀 함께 정합니다", weight: "개입" }, choiceB: { text: "\"천천히 골라봐. 정해지면 아빠를 불러줘\" 하며 아이가 결정할 때까지 기다립니다", weight: "자율" } },
  { id: 21, axis: "C", situation: "평일엔 스마트폰 안 보기로 온 가족이 온 지 한 달째. 오늘따라 아이가 \"친구는 매일 본대. 딱 오늘만 조금만 보면 안 돼?\"라며 눈을 크게 뜹니다.", choiceA: { text: "\"약속은 약속이야. 오늘도 지키자\" 하며 처음 정한 규칙 그대로 유지합니다", weight: "원칙" }, choiceB: { text: "\"오늘 무슨 특별한 이유가 있어?\" 하며 상황 들어보고 조정 여부를 판단합니다", weight: "융통" } },
  { id: 22, axis: "C", situation: "저녁 8시는 정리 시간. 하지만 오늘은 사촌들이 놀러 와서 아이들이 신나게 뛰어놀고 있고, 곧 헤어져야 하는 상황입니다.", choiceA: { text: "\"8시는 정리 시간이야, 오늘도 지키자\" 하며 평소대로 진행합니다", weight: "원칙" }, choiceB: { text: "\"오늘은 특별한 날이니까 30분만 더 놀자\" 하며 상황에 맞게 조정합니다", weight: "융통" } },
  { id: 23, axis: "C", situation: "놀이터에서 하기로 한 규칙(30분만 놀기)이 있는데, 아이가 정말 오랜만에 만난 친구와 즐거운 시간을 보내고 있습니다.", choiceA: { text: "\"30분 지났으니 인사하고 가자\" 하며 정한 시간을 지킵니다", weight: "원칙" }, choiceB: { text: "\"친구랑 오랜만이니까 15분만 더 놀자\" 하며 상황을 반영합니다", weight: "융통" } },
  { id: 24, axis: "C", situation: "매일 잠들기 전 책 한 권 읽기가 우리 집 루틴. 오늘 아이가 몸이 좀 피곤해 보이고 \"오늘은 그냥 잘래\"라고 말합니다.", choiceA: { text: "\"우리 매일 하는 거잖아, 짧은 책 한 권만 읽자\" 하며 습관을 유지합니다", weight: "원칙" }, choiceB: { text: "\"그래, 오늘은 바로 자자. 내일 두 권 읽으면 되지\" 하며 유연하게 넘어갑니다", weight: "융통" } },
  { id: 25, axis: "D", situation: "아이가 놀이터에서 가장 높은 미끄럼틀 앞에서 망설입니다. 처음 타보는 곳이고, 조금 무섭지만 궁금해하는 표정입니다.", choiceA: { text: "\"한 번 해볼래? 아빠가 아래에서 기다릴게\" 하며 새로운 시도를 응원합니다", weight: "도전" }, choiceB: { text: "\"오늘은 낮은 미끄럼틀에서 놀고, 이건 다음에 도전해보자\" 하며 익숙한 것부터 하도록 이끕니다", weight: "안정" } },
  { id: 26, axis: "D", situation: "아이가 처음 보는 음식(예: 파스타 위 올리브)을 접시에서 발견하고 냄새를 맡으며 표정을 찡그립니다.", choiceA: { text: "\"새로운 맛이야, 한 번 먹어볼래? 안 맞으면 뱉어도 돼\" 하며 시도를 권합니다", weight: "도전" }, choiceB: { text: "\"안 먹어도 괜찮아, 아는 것부터 먹자\" 하며 편안한 선택을 존중합니다", weight: "안정" } },
  { id: 27, axis: "D", situation: "주말에 나들이 갈 곳을 정하는데, 아이가 매번 가는 익숙한 공원과 처음 가보는 신기한 어린이 박물관 사이에서 고민합니다.", choiceA: { text: "\"가본 적 없는 곳도 재밌을 것 같은데?\" 하며 새로운 경험을 추천합니다", weight: "도전" }, choiceB: { text: "\"네가 편한 곳으로 가자\" 하며 익숙한 장소를 지지합니다", weight: "안정" } },
  { id: 28, axis: "D", situation: "유치원에서 이번 학기부터 새로운 활동(예: 태권도 특강)을 신청받고 있습니다. 아이는 관심은 있지만 잘 모르는 선생님이라 조금 주저합니다.", choiceA: { text: "\"새로운 거 배우면 재밌을 거야, 한 번 해볼래?\" 하며 도전을 응원합니다", weight: "도전" }, choiceB: { text: "\"익숙해질 시간이 필요하겠구나, 원할 때 시작하자\" 하며 아이의 페이스를 존중합니다", weight: "안정" } },
];

// 상품 카탈로그 - 카테고리명 → 상품 정보 (16 유형이 이 카탈로그 참조)
export const PRODUCT_CATALOG: Record<string, Product> = {
  "유아 감정 카드": {
    category: "유아 감정 카드",
    search_query: "유아 표정 감정카드 한글",
    product_name_example: "다양한 얼굴 표정과 감정 단어가 담긴 유아용 감정 카드",
    reason: "아이의 미묘한 감정을 함께 찾아 이름 붙이며 정서 표현을 도와줍니다.",
    age_target: "3~7세",
    price_range: "1~2만원",
    coupang_link: "https://link.coupang.com/a/gzwvJNlay4",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/ce6a/f8a25d2e73651a15d3a9eccd3e8d99f981d67fee2bd5984d2e754becb7fa.png",
  },
  "애착 인형": {
    category: "애착 인형",
    search_query: "유아 애착인형 부드러운 봉제",
    product_name_example: "세탁 가능한 부드러운 동물 봉제 애착 인형",
    reason: "부모와 떨어져 있거나 잠들기 전 아이에게 포근한 정서적 안정감을 줍니다.",
    age_target: "3~7세",
    price_range: "1~3만원",
    coupang_link: "https://link.coupang.com/a/gzwBpMCtQO",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/a0b4/de26e0ee38e7c3f136371cfcef95a00901ebca39acf5ec0330ee2dc3ec8c.jpg",
  },
  "감정 표현 그림책": {
    category: "감정 표현 그림책",
    search_query: "유아 감정 그림책 세트",
    product_name_example: "기쁨·슬픔·화·두려움을 다룬 유아 감정 그림책 세트",
    reason: "아이의 다양한 마음을 이야기 속에서 편안하게 이해하고 표현하도록 돕습니다.",
    age_target: "3~7세",
    price_range: "2~5만원",
    coupang_link: "https://link.coupang.com/a/gzwDif0y0y",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2022/01/17/10/1/e7c8f52a-6ba6-427d-a78f-97ead379dae2.jpg",
  },
  "역할놀이 인형 세트": {
    category: "역할놀이 인형 세트",
    search_query: "유아 가족 인형 역할놀이 세트",
    product_name_example: "부모와 형제 구성의 가족 역할놀이 인형 세트",
    reason: "가족 관계에서 느낀 감정을 인형의 말과 행동으로 안전하게 표현할 수 있습니다.",
    age_target: "3~7세",
    price_range: "2~4만원",
    coupang_link: "https://link.coupang.com/a/gzwE54np7d",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2016/02/29/10/1/bb2798b8-752a-4ce5-93a1-455fc7694589.jpg",
  },
  "수면 무드등": {
    category: "수면 무드등",
    search_query: "유아 수면 무드등 밝기조절",
    product_name_example: "밝기와 색온도를 조절할 수 있는 충전식 수면 무드등",
    reason: "잠들기 전 따뜻하고 안정적인 분위기를 만들어 부모와의 교감 시간을 돕습니다.",
    age_target: "3~7세",
    price_range: "1~3만원",
    coupang_link: "https://link.coupang.com/a/gzwGOYZOGy",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/0ca2/db920d780156314c80d5580a1ca9255f9d0c46eb420c08dbc5f2d2e87a89.jpg",
  },
  "부모 자녀 대화 카드": {
    category: "부모 자녀 대화 카드",
    search_query: "부모 자녀 대화카드 유아",
    product_name_example: "하루의 기분과 경험을 묻는 부모 자녀 대화 카드",
    reason: "매일 짧은 질문 하나로 아이의 속마음을 자연스럽게 들여다볼 수 있습니다.",
    age_target: "4~7세",
    price_range: "1~2만원",
    coupang_link: "https://link.coupang.com/a/gzwHYr04FU",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2025/08/18/10/0/d8682d07-8b28-482e-a245-f3c9ca736380.jpg",
  },
  "유아 루틴 차트": {
    category: "유아 루틴 차트",
    search_query: "유아 아침 저녁 루틴 차트",
    product_name_example: "아침 준비와 잠자리 순서를 그림으로 보여주는 루틴 차트",
    reason: "반복되는 일과를 눈에 보이게 만들어 아이가 다음 행동을 예측하도록 돕습니다.",
    age_target: "3~6세",
    price_range: "1~2만원",
    coupang_link: "https://link.coupang.com/a/gzwJFjuQkC",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/e96a/dc8c770ca86b4803c1e8aff840887abb5a412dc8102a9a08a310d9b20e87.jpg",
  },
  "어린이 타이머": {
    category: "어린이 타이머",
    search_query: "어린이 시각 타이머 무소음",
    product_name_example: "남은 시간이 색으로 표시되는 무소음 시각 타이머",
    reason: "추상적인 시간을 눈으로 보여줘 놀이 종료와 활동 전환을 수월하게 합니다.",
    age_target: "4~7세",
    price_range: "1~3만원",
    coupang_link: "https://link.coupang.com/a/gzwKuZNjfU",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/b57f/edaf3d8bf22d2361d97d35cbf6bb81c46dad11b9e2a3d28920d31b803666.png",
  },
  "자석 스케줄 보드": {
    category: "자석 스케줄 보드",
    search_query: "어린이 자석 스케줄 보드",
    product_name_example: "요일별 활동 자석을 붙이는 어린이 주간 스케줄 보드",
    reason: "한 주의 일정을 아이와 함께 확인하며 예측 가능하고 안정적인 생활을 돕습니다.",
    age_target: "4~7세",
    price_range: "2~4만원",
    coupang_link: "https://link.coupang.com/a/gzwSsPpfTU",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2023/06/15/17/8/9f693053-be8e-4f0e-a070-4d285eb5a8d9.jpg",
  },
  "유아 정리함": {
    category: "유아 정리함",
    search_query: "유아 장난감 정리함 분리 수납",
    product_name_example: "장난감을 종류별로 나누는 다단 바구니형 유아 정리함",
    reason: "물건마다 정해진 자리를 만들어 아이가 스스로 정리하기 쉽게 해줍니다.",
    age_target: "3~7세",
    price_range: "3~7만원",
    coupang_link: "https://link.coupang.com/a/gzwUhLWeku",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/b726/ab5fae7fc656fa21eea2aa34603070f4564c53b029df5847055f9a10e344.jpg",
  },
  "생활 습관 스티커북": {
    category: "생활 습관 스티커북",
    search_query: "유아 생활습관 스티커북",
    product_name_example: "양치·정리·인사·식사 습관을 익히는 놀이 스티커북",
    reason: "생활 규칙을 반복 설명하기보다 재미있는 활동으로 자연스럽게 익히게 합니다.",
    age_target: "3~6세",
    price_range: "1만원 이하",
    coupang_link: "https://link.coupang.com/a/gzwWMOOLO8",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/f8dd/d01cd907c7c0a4261f4513fb38dd93b46245359eb6c52137ab5f0e0f4e5c.png",
  },
  "어린이 학습 달력": {
    category: "어린이 학습 달력",
    search_query: "어린이 날짜 날씨 학습 달력",
    product_name_example: "날짜·요일·계절·날씨를 매일 표시하는 어린이 학습 달력",
    reason: "매일 달력을 확인하는 짧은 루틴으로 시간과 계절 개념을 익히게 합니다.",
    age_target: "4~7세",
    price_range: "1~3만원",
    coupang_link: "https://link.coupang.com/a/gzwXR3ogXQ",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/5374/ad2f7e3e04c2ee9502d40f684ac48acf570ab07e33200d8818e63880c782.jpg",
  },
  "오픈엔디드 블록": {
    category: "오픈엔디드 블록",
    search_query: "원목 무지개 블록 유아",
    product_name_example: "쌓기·터널·균형 놀이가 가능한 원목 무지개 블록",
    reason: "정해진 완성법 없이 아이의 상상에 따라 매번 다른 놀이로 확장됩니다.",
    age_target: "3~7세",
    price_range: "2~6만원",
    coupang_link: "https://link.coupang.com/a/gzwZF7HRx6",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/rs_quotation_api/cdm4br1q/4291bb23f61a4786ab9329c8502d1008.jpg",
  },
  "유아 미술 재료 세트": {
    category: "유아 미술 재료 세트",
    search_query: "유아 미술놀이 재료 종합세트",
    product_name_example: "색종이·폼폼·막대·스팽글이 담긴 유아 미술 재료 세트",
    reason: "다양한 재료를 아이가 직접 고르고 조합하며 자기만의 작품을 만들게 합니다.",
    age_target: "4~7세",
    price_range: "1~3만원",
    coupang_link: "https://link.coupang.com/a/gzw0OuwwLI",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/a575/081c46940b7f125f548a178a700579365eda2c66d596b4197aac01d4359c.jpeg",
  },
  "역할놀이 소품": {
    category: "역할놀이 소품",
    search_query: "유아 주방놀이 소품 세트",
    product_name_example: "음식 재료와 조리 도구가 다양하게 담긴 주방 역할놀이 소품",
    reason: "요리사와 손님 등 아이가 원하는 역할로 이야기를 자유롭게 만들어갈 수 있습니다.",
    age_target: "3~7세",
    price_range: "2~5만원",
    coupang_link: "https://link.coupang.com/a/gzw2ndA6hM",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/7ab1/e867b0c6a9f94f045629b3c445aad6c4a7bfdde8f85b24080cf036e74c56.png",
  },
  "촉감 놀이 세트": {
    category: "촉감 놀이 세트",
    search_query: "유아 촉감놀이 모래 세트",
    product_name_example: "틀과 도구가 포함된 실내용 촉감 모래 놀이 세트",
    reason: "만지고 누르고 흩트리는 과정 자체를 즐기며 감각과 상상을 함께 자극합니다.",
    age_target: "3~7세",
    price_range: "2~4만원",
    coupang_link: "https://link.coupang.com/a/gzw3NssyQe",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/0c24/8a2a8c623b3663f5e7bb8dbd0be7fd2fec6a57d36e114a64295827edbf80.png",
  },
  "자연 관찰 키트": {
    category: "자연 관찰 키트",
    search_query: "어린이 곤충 관찰 채집통 세트",
    product_name_example: "채집통·핀셋·관찰경이 포함된 어린이 곤충 관찰 키트",
    reason: "밖에서 발견한 생물을 아이가 주도적으로 살펴보며 호기심을 확장할 수 있습니다.",
    age_target: "4~7세",
    price_range: "1~3만원",
    coupang_link: "https://link.coupang.com/a/gzw4HBJW44",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/dc6a/3d3a0227a1ae75ed1ad6300a9a5fa02bb8fc5304985dfde1f6973197d41c.jpg",
  },
  "붙였다 뗐다 스티커북": {
    category: "붙였다 뗐다 스티커북",
    search_query: "유아 붙였다 떼는 스티커북",
    product_name_example: "배경판에 반복해서 붙이며 장면을 꾸미는 스티커북",
    reason: "스티커 위치와 이야기를 아이 마음대로 바꾸며 창의적인 놀이를 반복할 수 있습니다.",
    age_target: "3~6세",
    price_range: "1만원 이하",
    coupang_link: "https://link.coupang.com/a/gzw5u62VZ6",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/bdda/6f804d357d6600beb1b0ddcbdaac5da6f73c7e9ed7796d181e4269b81959.jpg",
  },
  "유아 퍼즐": {
    category: "유아 퍼즐",
    search_query: "유아 꼭지 퍼즐 원목",
    product_name_example: "동물과 탈것 그림을 맞추는 손잡이형 원목 꼭지 퍼즐",
    reason: "아이 혼자 모양과 위치를 비교하며 성공 경험을 쌓는 과정을 지켜볼 수 있습니다.",
    age_target: "3~4세",
    price_range: "1~2만원",
    coupang_link: "https://link.coupang.com/a/gzw7pp40LQ",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2022/06/06/11/0/eafa5a3f-75ae-4e87-b647-40ab9d7fa944.jpg",
  },
  "과학 실험 키트": {
    category: "과학 실험 키트",
    search_query: "유아 과학 실험 키트 안전",
    product_name_example: "색 변화와 거품 반응을 관찰하는 어린이 기초 과학 실험 키트",
    reason: "부모가 답을 알려주기 전에 아이가 현상을 관찰하고 원인을 추측하게 해줍니다.",
    age_target: "5~7세",
    price_range: "2~4만원",
    coupang_link: "https://link.coupang.com/a/gzw8sR2uia",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/4239/9cb33f5f1bb5f8066ccbf1033a4c041249da357a3eae20a5a4151f25633e.jpg",
  },
  "어린이 보드게임": {
    category: "어린이 보드게임",
    search_query: "유아 메모리 보드게임",
    product_name_example: "그림의 위치를 기억해 짝을 맞추는 유아 메모리 게임",
    reason: "부모의 개입을 줄이고 아이가 관찰력과 기억력으로 해결하도록 기다릴 수 있습니다.",
    age_target: "3~6세",
    price_range: "1~3만원",
    coupang_link: "https://link.coupang.com/a/gzxaCCvWeW",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/b26c/41a7afaff4dd291d0601706e3694865b66123937e2cb22ee9300258434b2.png",
  },
  "몬테소리 교구": {
    category: "몬테소리 교구",
    search_query: "몬테소리 소근육 교구 유아",
    product_name_example: "단추·지퍼·버클을 스스로 조작하는 몬테소리 소근육 교구",
    reason: "부모가 대신하지 않고 아이가 반복 연습하며 생활 기술을 익히도록 돕습니다.",
    age_target: "3~5세",
    price_range: "1~3만원",
    coupang_link: "https://link.coupang.com/a/gzxbU3Ou3U",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/a45a/5f35318e915ec32468d31f5e1f492ca2843fd937550211490b0e70539e32.jpg",
  },
  "자연 관찰 돋보기": {
    category: "자연 관찰 돋보기",
    search_query: "어린이 돋보기 대형 안전",
    product_name_example: "아이 손에 맞는 손잡이와 넓은 렌즈를 갖춘 안전 돋보기",
    reason: "일상에서 발견한 작은 사물을 아이가 자세히 살펴보는 습관을 길러줍니다.",
    age_target: "3~7세",
    price_range: "1만원 이하",
    coupang_link: "https://link.coupang.com/a/gzxdzEXdZI",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/4547/232f7e664bba81d7b2b0e3b7d3287a2b5c005f8fc3f76af3c441493b9c54.png",
  },
  "유아 문제 해결 워크북": {
    category: "유아 문제 해결 워크북",
    search_query: "유아 사고력 워크북 5세",
    product_name_example: "규칙 찾기·분류·비교 문제로 구성된 유아 사고력 워크북",
    reason: "아이의 답뿐 아니라 어떤 방식으로 생각하는지 차분히 살펴볼 수 있습니다.",
    age_target: "5~6세",
    price_range: "1만원 이하",
    coupang_link: "https://link.coupang.com/a/gzxeNTFDX2",
    image_url: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/625f/e469d7f5579f2a48c967cbad017aaf6a98d365d9e1b85bc1336994e4043a.png",
  },
};

// 16 유형 콘텐츠
export const TYPES: Record<TypeKey, TypeContent> = {
  // === nurturer 계열 (감성+개입) - 코랄 ===
  nurturer_guardian: {
    key: "nurturer_guardian",
    family: "nurturer",
    name_kr: "든든한 수호자",
    tagline: "언제나 같은 자리에서 아이를 지켜주는 부모",
    color: "#E8927C",
    coord: { a: 1, b: 1, c: 1, d: -1 },
    summary: "아이가 세상을 안전하게 탐색할 수 있도록 든든한 울타리가 되어주는 부모입니다. 하루하루 일관된 규칙과 따뜻한 말투로 아이에게 예측 가능한 안정감을 심어줍니다. 큰 변화보다는 익숙한 리듬 속에서 아이가 성장의 뿌리를 단단히 내리도록 돕습니다.",
    strengths: ["아이에게 안정적인 애착의 기반을 만들어줍니다.", "일관된 태도로 신뢰의 관계를 형성합니다.", "위기의 순간에도 흔들리지 않고 아이를 지켜냅니다."],
    cautions: ["안정만을 추구하다 보면 아이의 새로운 도전 기회를 놓칠 수 있습니다.", "아이의 예상 밖 행동도 성장의 신호로 받아들여 보세요."],
    child_growth: "우리 아이는 부모의 안정된 사랑 속에서 자기 감정을 안전하게 표현하고 조절하는 힘을 기릅니다. 세상이 예측 가능하다는 감각이 형성되어 새로운 관계에서도 침착함을 유지합니다. 든든한 뿌리를 갖춘 아이로 자라 사회 속에서 흔들림 없는 신뢰를 이어갑니다.",
    research_basis: "Maccoby & Martin(1983)의 authoritative parenting(반응성·요구성 모두 높음)에 가장 가까운 유형입니다. 국내 연구에서도 자율성 지지와 구조 제공이 동시에 제공될 때 청소년의 삶의 만족도와 학교적응이 가장 높았고(윤초희·최옥주, 2020), 두 요소가 결합될 때 시너지 효과가 나타났습니다(염혜선·이은주, 2020). 부모의 따뜻함은 자녀 자아존중감에 세 요소 중 가장 큰 영향(β=.32)을 미쳤습니다(김도희, 2022).",
    care_tips: ["아이의 감정을 하루 한 번 짧게 이름 붙여주세요. 예: '오늘은 좀 아쉬웠구나.'", "익숙한 놀이에 아주 작은 변화를 하나만 더해보세요(색이나 재료 변경).", "잠자기 전 '오늘 우리 이런 일이 있었지'라며 오늘을 짧게 요약해보세요."],
    share_hook: "저는 아이의 든든한 수호자래요. 우리 부부는 누가 어떤 유형인지 궁금하지 않으세요?",
    product_categories: ["유아 감정 카드", "애착 인형", "감정 표현 그림책", "유아 루틴 차트", "어린이 학습 달력", "부모 자녀 대화 카드"],
    compatible_type: "supporter_coach",
    clash_type: "observer_explorer",
  },
  nurturer_pioneer: {
    key: "nurturer_pioneer",
    family: "nurturer",
    name_kr: "열정의 개척자",
    tagline: "아이와 함께 새로운 세상을 여는 부모",
    color: "#E8927C",
    coord: { a: 1, b: 1, c: 1, d: 1 },
    summary: "아이가 새로운 세상을 열정적으로 탐험하도록 곁에서 이끄는 부모입니다. 따뜻한 격려와 명확한 원칙 속에서 아이가 두려움 없이 도전할 수 있도록 힘을 실어줍니다. 매일을 새로운 배움의 기회로 만들며 아이의 세계를 함께 넓혀갑니다.",
    strengths: ["아이의 도전 정신을 자연스럽게 자극합니다.", "새로운 경험에서도 정서적 지지를 제공합니다.", "아이가 실패를 성장의 발판으로 받아들이게 돕습니다."],
    cautions: ["열정이 앞서 아이의 페이스를 놓치지 않도록 살펴주세요.", "때론 잠시 멈추어 아이의 마음을 확인하는 여유가 필요합니다."],
    child_growth: "우리 아이는 새로운 환경에 자신 있게 도전하며 성장하는 아이가 됩니다. 실패해도 다시 시도할 수 있는 회복력이 자라며, 세상을 배움의 놀이터로 인식합니다. 부모의 열정을 닮아 자기 삶을 주도적으로 설계하는 리더의 씨앗이 자라납니다.",
    research_basis: "Maccoby & Martin(1983)의 authoritative parenting(반응성·요구성 모두 높음)에 가장 가까운 유형입니다. 국내 연구에서도 자율성 지지와 구조 제공이 동시에 제공될 때 청소년의 삶의 만족도와 학교적응이 가장 높았고(윤초희·최옥주, 2020), 두 요소가 결합될 때 시너지 효과가 나타났습니다(염혜선·이은주, 2020). 부모의 따뜻함은 자녀 자아존중감에 세 요소 중 가장 큰 영향(β=.32)을 미쳤습니다(김도희, 2022).",
    care_tips: ["오늘 아이가 새로 시도한 것을 구체적으로 한 가지 짚어 칭찬해보세요.", "'다음번엔 뭐 해볼까?'로 대화를 마무리해 다음 도전을 예고해보세요.", "실패한 순간엔 결과보다 시도 자체를 축하하는 말 한마디를 건네보세요."],
    share_hook: "저는 열정의 개척자래요. 우리 부부는 누가 어떤 유형일까요?",
    product_categories: ["유아 감정 카드", "감정 표현 그림책", "유아 루틴 차트", "어린이 학습 달력", "자연 관찰 키트", "부모 자녀 대화 카드"],
    compatible_type: "supporter_cheer",
    clash_type: "observer_watcher",
  },
  nurturer_helper: {
    key: "nurturer_helper",
    family: "nurturer",
    name_kr: "따뜻한 조력자",
    tagline: "아이의 곁에서 조용히 힘이 되어주는 부모",
    color: "#E8927C",
    coord: { a: 1, b: 1, c: -1, d: -1 },
    summary: "아이의 상황과 감정을 세심히 읽으며 유연하게 손을 내미는 부모입니다. 규칙보다 관계를 우선하며 아이의 오늘 컨디션에 맞춘 도움을 자연스럽게 건넵니다. 안정된 애정 속에서 아이가 편안하게 자신의 세계를 꾸려가도록 지원합니다.",
    strengths: ["아이의 감정을 세심하게 읽어냅니다.", "상황에 맞춰 유연하게 대처합니다.", "아이가 편안한 관계 속에서 자기다움을 드러낼 수 있게 합니다."],
    cautions: ["도움이 지나치면 아이가 스스로 해내는 기회를 잃을 수 있습니다.", "때로는 지켜보는 것도 사랑이라는 점을 기억해보세요."],
    child_growth: "우리 아이는 관계 속에서 자신을 존중받는 경험을 쌓으며 정서적 안정감을 얻습니다. 부모의 유연한 태도를 닮아 상황에 맞게 유연히 대응하는 아이가 됩니다. 따뜻한 관계의 기억이 훗날 타인을 배려하는 힘의 원천이 됩니다.",
    research_basis: "Maccoby & Martin(1983)의 authoritative parenting(반응성·요구성 모두 높음)에 가장 가까운 유형입니다. 국내 연구에서도 자율성 지지와 구조 제공이 동시에 제공될 때 청소년의 삶의 만족도와 학교적응이 가장 높았고(윤초희·최옥주, 2020), 두 요소가 결합될 때 시너지 효과가 나타났습니다(염혜선·이은주, 2020). 부모의 따뜻함은 자녀 자아존중감에 세 요소 중 가장 큰 영향(β=.32)을 미쳤습니다(김도희, 2022).",
    care_tips: ["돕기 전 '도와줄까?'라고 한 번 물어보고 아이의 답을 듣고 움직여보세요.", "아이가 스스로 해낸 순간을 하루 한 개 이상 발견해 알려주세요.", "잠자기 전 '오늘 네가 스스로 한 게 뭐가 있었지?' 대화를 나눠보세요."],
    share_hook: "저는 아이의 따뜻한 조력자래요. 우리 부부 유형이 궁금하지 않으세요?",
    product_categories: ["유아 감정 카드", "애착 인형", "수면 무드등", "역할놀이 인형 세트", "부모 자녀 대화 카드", "촉감 놀이 세트"],
    compatible_type: "supporter_artist",
    clash_type: "observer_mentor",
  },
  nurturer_companion: {
    key: "nurturer_companion",
    family: "nurturer",
    name_kr: "유쾌한 동반자",
    tagline: "아이와 매일을 놀이처럼 함께하는 부모",
    color: "#E8927C",
    coord: { a: 1, b: 1, c: -1, d: 1 },
    summary: "아이와 매 순간을 즐거운 모험으로 만들며 함께 뛰어노는 부모입니다. 융통성 있게 상황을 즐기고 아이의 호기심에 반응하며 새로운 재미를 발견합니다. 일상 속 작은 사건마다 웃음과 감정을 나누며 아이의 유쾌한 성장을 응원합니다.",
    strengths: ["아이의 호기심을 활짝 자극합니다.", "함께하는 시간을 즐거움으로 채웁니다.", "실패조차 이야기로 만들어 함께 웃습니다."],
    cautions: ["즐거움이 너무 많으면 아이의 집중과 루틴이 흔들릴 수 있습니다.", "하루 중 조용히 정리하는 시간을 함께 만들어보세요."],
    child_growth: "우리 아이는 세상을 놀이로 인식하며 창의성을 발달시킵니다. 유쾌한 부모와의 상호작용이 사회성과 유머 감각의 씨앗이 됩니다. 매일이 배움이자 즐거움임을 아는 아이로 자라며 어디서든 밝은 에너지를 나눕니다.",
    research_basis: "Maccoby & Martin(1983)의 authoritative parenting(반응성·요구성 모두 높음)에 가장 가까운 유형입니다. 국내 연구에서도 자율성 지지와 구조 제공이 동시에 제공될 때 청소년의 삶의 만족도와 학교적응이 가장 높았고(윤초희·최옥주, 2020), 두 요소가 결합될 때 시너지 효과가 나타났습니다(염혜선·이은주, 2020). 부모의 따뜻함은 자녀 자아존중감에 세 요소 중 가장 큰 영향(β=.32)을 미쳤습니다(김도희, 2022).",
    care_tips: ["신나는 놀이 끝에 5분간의 조용한 정리 시간을 루틴으로 넣어보세요.", "하루에 한 번 '오늘 뭐가 가장 재밌었어?' 대화로 하루를 마무리해보세요.", "즉흥 놀이 중에도 아이의 감정 신호를 잠깐 확인해주세요."],
    share_hook: "저는 아이의 유쾌한 동반자래요. 우리 부부 유형이 궁금하지 않으세요?",
    product_categories: ["유아 감정 카드", "감정 표현 그림책", "역할놀이 인형 세트", "부모 자녀 대화 카드", "자연 관찰 키트", "촉감 놀이 세트"],
    compatible_type: "supporter_friend",
    clash_type: "observer_lighthouse",
  },
  // === supporter 계열 (감성+자율) - 세이지 ===
  supporter_cheer: {
    key: "supporter_cheer",
    family: "supporter",
    name_kr: "다정한 응원자",
    tagline: "아이의 뒤에서 마음으로 응원하는 부모",
    color: "#8FA678",
    coord: { a: 1, b: -1, c: 1, d: -1 },
    summary: "아이가 자신의 속도와 방식으로 성장하도록 조용히 응원하는 부모입니다. 뚜렷한 원칙 속에서 아이의 선택을 존중하고 스스로 방향을 찾도록 여백을 줍니다. 겉으로 드러나진 않지만 언제나 든든한 지지자로 곁을 지킵니다.",
    strengths: ["아이의 자기결정력을 자연스럽게 키워줍니다.", "감정 지지를 통해 아이의 자존감을 세워줍니다.", "결과보다 과정을 인정해주는 자세를 갖고 있습니다."],
    cautions: ["너무 뒤에서만 응원하다 보면 아이가 방향을 잃을 수 있습니다.", "가끔은 앞으로 나서서 함께 걷는 시간도 필요합니다."],
    child_growth: "우리 아이는 자신의 선택에 확신을 갖는 자립적인 아이로 자랍니다. 부모의 조용한 응원이 자기 동기의 뿌리가 되어 스스로 목표를 세우고 실행합니다. 삶의 방향을 스스로 결정하는 힘 있는 어른으로 성장합니다.",
    research_basis: "Maccoby & Martin(1983)의 permissive parenting(반응성 높음, 요구성 낮음)에 가까운 유형입니다. 자율성 지지가 자녀의 확고한 정체성 형성을 거쳐 심리적 웰빙 향상으로 이어졌고(이준배 등, 2024), 자기결정성 이론(Ryan & Deci, 2000)에서 자녀의 내재 동기와 심리적 웰빙의 핵심 원천으로 강조됩니다. 감성적 지지와 결합된 자율성 지지는 자녀의 창의성과 자기효능감이 더 안정적으로 자랍니다.",
    care_tips: ["아이의 선택 뒤에 '왜 그렇게 정했어?'를 물어 스스로 이유를 언어화하게 해보세요.", "아이가 시도한 후엔 '결과보다 시도 자체가 멋졌다'는 말을 건네보세요.", "지지의 표현을 짧은 스킨십이나 눈맞춤으로 하루에 한 번 이상 전해보세요."],
    share_hook: "저는 아이의 다정한 응원자래요. 우리 부부는 어떤 유형일까요?",
    product_categories: ["유아 감정 카드", "애착 인형", "감정 표현 그림책", "수면 무드등", "몬테소리 교구", "부모 자녀 대화 카드"],
    compatible_type: "nurturer_pioneer",
    clash_type: "planner_advisor",
  },
  supporter_coach: {
    key: "supporter_coach",
    family: "supporter",
    name_kr: "응원하는 코치",
    tagline: "아이의 잠재력을 믿고 이끌어주는 부모",
    color: "#8FA678",
    coord: { a: 1, b: -1, c: 1, d: 1 },
    summary: "아이의 성장을 향해 원칙 있게 격려하고 함께 도전하는 부모입니다. 아이가 스스로의 힘으로 문제를 풀어나가도록 길을 열어주고 필요할 때만 코칭합니다. 따뜻함과 명확함 속에서 아이의 잠재력을 최대치로 끌어냅니다.",
    strengths: ["아이의 잠재력을 발견하고 발전시킵니다.", "명확한 목표와 정서 지지를 함께 제공합니다.", "실패를 재도전의 자원으로 전환합니다."],
    cautions: ["기대가 커지면 아이가 부담을 느낄 수 있습니다.", "때로는 그냥 놀며 웃는 시간을 함께 즐겨보세요."],
    child_growth: "우리 아이는 스스로 도전하고 성취하는 리더로 자랍니다. 부모의 코칭을 통해 목표 설정과 실행 능력이 발달합니다. 실패 후에도 다시 일어서는 회복탄력성이 삶의 자산이 됩니다.",
    research_basis: "Maccoby & Martin(1983)의 permissive parenting(반응성 높음, 요구성 낮음)에 가까운 유형입니다. 자율성 지지가 자녀의 확고한 정체성 형성을 거쳐 심리적 웰빙 향상으로 이어졌고(이준배 등, 2024), 자기결정성 이론(Ryan & Deci, 2000)에서 자녀의 내재 동기와 심리적 웰빙의 핵심 원천으로 강조됩니다. 감성적 지지와 결합된 자율성 지지는 자녀의 창의성과 자기효능감이 더 안정적으로 자랍니다.",
    care_tips: ["도전 과제를 아이 스스로 하나 골라보게 하고 진행을 지지해보세요.", "결과 말고 '오늘의 작은 성장' 한 가지를 함께 찾아보세요.", "코칭 톤이 지시로 넘어가지 않도록 문장 끝을 질문형으로 바꿔보세요."],
    share_hook: "저는 아이의 응원하는 코치래요. 우리 부부는 어떤 유형일까요?",
    product_categories: ["유아 감정 카드", "감정 표현 그림책", "몬테소리 교구", "유아 문제 해결 워크북", "자연 관찰 키트", "과학 실험 키트"],
    compatible_type: "nurturer_guardian",
    clash_type: "planner_navigator",
  },
  supporter_friend: {
    key: "supporter_friend",
    family: "supporter",
    name_kr: "편안한 벗",
    tagline: "아이의 세상 속 편안한 친구가 되어주는 부모",
    color: "#8FA678",
    coord: { a: 1, b: -1, c: -1, d: -1 },
    summary: "아이와 눈높이를 맞추며 편안한 친구처럼 지내는 부모입니다. 규칙보다 관계를 먼저 두며, 아이가 자연스럽게 마음을 열도록 유연한 태도를 취합니다. 서로의 감정과 이야기를 공유하며 아이의 세계에 조용히 스며듭니다.",
    strengths: ["아이가 부모를 신뢰하고 대화의 문을 자주 엽니다.", "감정 공유의 폭이 넓어 정서적 유대가 깊습니다.", "아이의 개성을 있는 그대로 존중합니다."],
    cautions: ["친구 같은 관계에서 부모의 역할이 흐릿해질 수 있습니다.", "필요할 때는 방향을 잡아주는 어른의 자리에 서주세요."],
    child_growth: "우리 아이는 자신의 감정을 자연스럽게 표현하는 소통형 아이로 자랍니다. 부모와의 편안한 관계가 사회 속 관계 형성의 모델이 됩니다. 어른이 되어서도 진솔한 대화로 관계를 만드는 사람이 됩니다.",
    research_basis: "Maccoby & Martin(1983)의 permissive parenting(반응성 높음, 요구성 낮음)에 가까운 유형입니다. 자율성 지지가 자녀의 확고한 정체성 형성을 거쳐 심리적 웰빙 향상으로 이어졌고(이준배 등, 2024), 자기결정성 이론(Ryan & Deci, 2000)에서 자녀의 내재 동기와 심리적 웰빙의 핵심 원천으로 강조됩니다. 감성적 지지와 결합된 자율성 지지는 자녀의 창의성과 자기효능감이 더 안정적으로 자랍니다.",
    care_tips: ["안전과 관련된 최소 규칙 세 가지를 아이와 함께 정해 짧게 반복해보세요.", "친구 같은 대화 중에도 '이건 아빠 생각이야'로 부모의 관점을 짧게 표시해보세요.", "하루 한 번 '오늘 네 하루 어땠어?' 온전히 듣는 5분을 마련해보세요."],
    share_hook: "저는 아이의 편안한 벗이래요. 우리 부부는 어떤 유형일까요?",
    product_categories: ["유아 감정 카드", "애착 인형", "수면 무드등", "촉감 놀이 세트", "붙였다 뗐다 스티커북", "역할놀이 소품"],
    compatible_type: "nurturer_companion",
    clash_type: "planner_conductor",
  },
  supporter_artist: {
    key: "supporter_artist",
    family: "supporter",
    name_kr: "자유로운 예술가",
    tagline: "아이의 상상과 개성을 마음껏 응원하는 부모",
    color: "#8FA678",
    coord: { a: 1, b: -1, c: -1, d: 1 },
    summary: "아이가 자유롭게 상상하고 표현하도록 열린 마음으로 함께하는 부모입니다. 정해진 정답보다 아이의 시선을 존중하며 새로운 시도를 지지합니다. 창의력과 감성을 존중하며 아이가 자신만의 세계를 색칠하도록 이끕니다.",
    strengths: ["아이의 창의성과 표현력을 최대로 이끌어냅니다.", "개성을 존중하고 다양한 시도를 지지합니다.", "실패도 실험의 일부로 받아들이도록 돕습니다."],
    cautions: ["자유가 방향 없이 흐르면 아이가 혼란을 느낄 수 있습니다.", "가끔은 작은 목표를 함께 세워보는 시간이 필요합니다."],
    child_growth: "우리 아이는 남과 다른 시선을 두려워하지 않는 창의적인 아이로 자랍니다. 부모의 열린 태도가 자기 표현의 자신감을 만들어줍니다. 세상을 자기만의 방식으로 해석하고 만들어가는 힘을 갖게 됩니다.",
    research_basis: "Maccoby & Martin(1983)의 permissive parenting(반응성 높음, 요구성 낮음)에 가까운 유형입니다. 자율성 지지가 자녀의 확고한 정체성 형성을 거쳐 심리적 웰빙 향상으로 이어졌고(이준배 등, 2024), 자기결정성 이론(Ryan & Deci, 2000)에서 자녀의 내재 동기와 심리적 웰빙의 핵심 원천으로 강조됩니다. 감성적 지지와 결합된 자율성 지지는 자녀의 창의성과 자기효능감이 더 안정적으로 자랍니다.",
    care_tips: ["오늘 아이가 정한 놀이 하나를 부모가 15분 그대로 따라가 보세요.", "'왜 그렇게 했어?' 대신 '어떻게 그런 생각이 났어?'로 표현을 격려해보세요.", "일주일에 하나 아이가 정한 작은 목표(예: 오늘 노래 하나 만들기)를 함께 축하해보세요."],
    share_hook: "저는 아이의 자유로운 예술가래요. 우리 부부는 어떤 유형일까요?",
    product_categories: ["유아 감정 카드", "감정 표현 그림책", "유아 미술 재료 세트", "촉감 놀이 세트", "역할놀이 소품", "오픈엔디드 블록"],
    compatible_type: "nurturer_helper",
    clash_type: "planner_architect",
  },
  // === planner 계열 (이성+개입) - 블루 ===
  planner_architect: {
    key: "planner_architect",
    family: "planner",
    name_kr: "든든한 건축가",
    tagline: "아이의 하루를 정교하게 설계하는 부모",
    color: "#5B7A94",
    coord: { a: -1, b: 1, c: 1, d: -1 },
    summary: "아이의 성장을 체계적으로 설계하고 안정적으로 이끄는 부모입니다. 원칙과 계획 아래에서 아이가 예측 가능한 리듬으로 안정감을 느끼도록 돕습니다. 하루의 구조를 통해 아이가 스스로 시간을 다루는 힘을 자연스럽게 배웁니다.",
    strengths: ["구체적인 계획과 실행력이 뛰어납니다.", "아이의 성장 단계를 체계적으로 지원합니다.", "예측 가능한 환경으로 아이에게 안정감을 줍니다."],
    cautions: ["계획에 벗어난 상황에서 융통성이 부족할 수 있습니다.", "가끔은 무계획의 하루를 즐겨보세요."],
    child_growth: "우리 아이는 계획적으로 사고하고 실행하는 능력을 자연스럽게 익힙니다. 부모의 안정된 구조가 자기관리 능력의 뿌리가 됩니다. 인생을 설계할 줄 아는 든든한 어른으로 자라납니다.",
    research_basis: "구조 제공 중심의 양육으로, 국내 연구에서 부모의 구조 제공은 자녀의 자율적 동기와 자기조절 효능감을 매개로 학업 참여를 높이는 것으로 확인되었고(김도희, 2022), 확고한 정체성 형성을 통해 심리적 웰빙 향상과 부적응 감소로 이어졌습니다(이준배 등, 2024). 다만 구조 제공은 감성적 지지와 함께 있을 때 결과가 더 안정적이므로(윤초희·최옥주, 2020), 따뜻함을 조금 더 얹으면 좋습니다.",
    care_tips: ["일주일에 한 번 '오늘은 계획 없이 뭐할까?' 자유 시간을 넣어보세요.", "계획을 짜기 전 아이의 감정 컨디션을 30초만 물어보세요.", "예상 밖 상황이 왔을 때 '이것도 배움이야'라는 말로 여유를 표현해보세요."],
    share_hook: "저는 아이의 든든한 건축가래요. 우리 부부는 어떤 유형일까요?",
    product_categories: ["유아 루틴 차트", "어린이 학습 달력", "자석 스케줄 보드", "유아 정리함", "어린이 타이머", "생활 습관 스티커북"],
    compatible_type: "observer_mentor",
    clash_type: "supporter_artist",
  },
  planner_conductor: {
    key: "planner_conductor",
    family: "planner",
    name_kr: "지혜로운 지휘자",
    tagline: "아이의 성장 방향을 명확히 이끌어주는 부모",
    color: "#5B7A94",
    coord: { a: -1, b: 1, c: 1, d: 1 },
    summary: "아이의 성장을 명확한 방향으로 이끌며 함께 새로운 도전을 만들어가는 부모입니다. 원칙 위에서 조화롭게 계획을 세우고 아이가 도전을 두려워하지 않도록 이끕니다. 논리와 확신 속에서 아이가 자신의 길을 향해 걷도록 지혜롭게 지휘합니다.",
    strengths: ["명확한 방향성과 도전 의식을 동시에 심어줍니다.", "체계적인 학습 지원 능력이 뛰어납니다.", "아이가 결단력 있게 행동하도록 이끕니다."],
    cautions: ["아이의 페이스보다 부모의 계획이 앞설 수 있습니다.", "아이의 감정 신호에도 잠시 귀 기울여 보세요."],
    child_growth: "우리 아이는 논리적이고 목표 중심의 사고를 하는 아이로 자랍니다. 부모의 지휘 속에서 실행력과 리더십이 자연스럽게 개발됩니다. 세상을 자신의 목표대로 만들어가는 힘을 갖게 됩니다.",
    research_basis: "구조 제공 중심의 양육으로, 국내 연구에서 부모의 구조 제공은 자녀의 자율적 동기와 자기조절 효능감을 매개로 학업 참여를 높이는 것으로 확인되었고(김도희, 2022), 확고한 정체성 형성을 통해 심리적 웰빙 향상과 부적응 감소로 이어졌습니다(이준배 등, 2024). 다만 구조 제공은 감성적 지지와 함께 있을 때 결과가 더 안정적이므로(윤초희·최옥주, 2020), 따뜻함을 조금 더 얹으면 좋습니다.",
    care_tips: ["매일의 목표 옆에 '오늘 우리 아이 기분' 한 줄을 함께 적어보세요.", "지시 대신 '어떻게 하면 좋을까?' 질문으로 아이 의견을 먼저 물어보세요.", "성취 후에는 결과보다 노력과 과정을 구체적으로 짚어 칭찬해보세요."],
    share_hook: "저는 아이의 지혜로운 지휘자래요. 우리 부부는 어떤 유형일까요?",
    product_categories: ["유아 루틴 차트", "자석 스케줄 보드", "어린이 타이머", "생활 습관 스티커북", "과학 실험 키트", "어린이 학습 달력"],
    compatible_type: "observer_lighthouse",
    clash_type: "supporter_friend",
  },
  planner_navigator: {
    key: "planner_navigator",
    family: "planner",
    name_kr: "침착한 안내자",
    tagline: "아이의 상황에 맞게 유연히 길을 안내하는 부모",
    color: "#5B7A94",
    coord: { a: -1, b: 1, c: -1, d: -1 },
    summary: "아이가 마주하는 상황을 침착하게 분석하고 유연히 길을 안내하는 부모입니다. 급변하는 순간에도 감정 대신 판단으로 안정된 방향을 제시합니다. 아이가 스스로 판단력을 기를 수 있도록 부드럽게 이끄는 조율자입니다.",
    strengths: ["문제 해결 능력이 뛰어납니다.", "상황을 유연하고 논리적으로 대처합니다.", "아이의 판단력을 자연스럽게 자극합니다."],
    cautions: ["침착함이 지나치면 아이가 감정을 느끼지 못할 수 있습니다.", "감정을 함께 나누는 순간의 여유를 만들어보세요."],
    child_growth: "우리 아이는 문제를 논리적으로 접근하고 스스로 해결하는 힘을 기릅니다. 부모의 안내를 통해 상황 판단 능력이 자연스럽게 자랍니다. 어떤 상황에서도 흔들림 없는 침착한 어른으로 성장합니다.",
    research_basis: "구조 제공 중심의 양육으로, 국내 연구에서 부모의 구조 제공은 자녀의 자율적 동기와 자기조절 효능감을 매개로 학업 참여를 높이는 것으로 확인되었고(김도희, 2022), 확고한 정체성 형성을 통해 심리적 웰빙 향상과 부적응 감소로 이어졌습니다(이준배 등, 2024). 다만 구조 제공은 감성적 지지와 함께 있을 때 결과가 더 안정적이므로(윤초희·최옥주, 2020), 따뜻함을 조금 더 얹으면 좋습니다.",
    care_tips: ["문제 해결 전 '지금 마음은 어때?'라고 감정을 한번 짚어주세요.", "논리적 설명 뒤에는 아이의 반응을 5초간 기다려주세요.", "하루 한 번 '오늘 웃겼던 일' 이야기로 감정 나눔의 시간을 만들어보세요."],
    share_hook: "저는 아이의 침착한 안내자래요. 우리 부부는 어떤 유형일까요?",
    product_categories: ["유아 루틴 차트", "유아 정리함", "몬테소리 교구", "어린이 학습 달력", "유아 문제 해결 워크북", "어린이 보드게임"],
    compatible_type: "observer_explorer",
    clash_type: "supporter_coach",
  },
  planner_advisor: {
    key: "planner_advisor",
    family: "planner",
    name_kr: "실용적 조언자",
    tagline: "아이의 성장에 실질적 조언을 건네는 부모",
    color: "#5B7A94",
    coord: { a: -1, b: 1, c: -1, d: 1 },
    summary: "아이의 상황에 맞는 실용적 조언과 새로운 시도를 함께 이끄는 부모입니다. 융통성 있게 접근하며 실제 도움이 될 방법을 논리적으로 제시합니다. 아이가 세상에서 부딪히는 문제를 스스로 해결해 나갈 힘을 실질적으로 키워줍니다.",
    strengths: ["실용적이고 현실적인 조언이 뛰어납니다.", "도전을 지지하고 새로운 아이디어를 함께 개발합니다.", "아이의 문제 해결 능력을 실질적으로 강화합니다."],
    cautions: ["조언이 반복되면 아이가 자기 결정을 미룰 수 있습니다.", "때론 침묵이 최고의 조언임을 기억해보세요."],
    child_growth: "우리 아이는 문제 앞에서 방법을 찾고 시도하는 실행형 아이로 자랍니다. 부모의 조언이 실질적 판단력의 기초가 됩니다. 사회 속에서 문제를 유연히 해결하는 유능한 어른으로 성장합니다.",
    research_basis: "구조 제공 중심의 양육으로, 국내 연구에서 부모의 구조 제공은 자녀의 자율적 동기와 자기조절 효능감을 매개로 학업 참여를 높이는 것으로 확인되었고(김도희, 2022), 확고한 정체성 형성을 통해 심리적 웰빙 향상과 부적응 감소로 이어졌습니다(이준배 등, 2024). 다만 구조 제공은 감성적 지지와 함께 있을 때 결과가 더 안정적이므로(윤초희·최옥주, 2020), 따뜻함을 조금 더 얹으면 좋습니다.",
    care_tips: ["조언 전에 '넌 어떻게 생각해?'로 아이의 답을 먼저 들어보세요.", "일주일에 한 번은 조언 없이 지켜보는 날을 정해보세요.", "아이의 결정을 존중해 준 뒤 '좋은 선택이었어'를 짧게 표현해보세요."],
    share_hook: "저는 아이의 실용적 조언자래요. 우리 부부는 어떤 유형일까요?",
    product_categories: ["어린이 보드게임", "몬테소리 교구", "유아 문제 해결 워크북", "과학 실험 키트", "자연 관찰 키트", "어린이 학습 달력"],
    compatible_type: "observer_watcher",
    clash_type: "supporter_cheer",
  },
  // === observer 계열 (이성+자율) - 모브 ===
  observer_lighthouse: {
    key: "observer_lighthouse",
    family: "observer",
    name_kr: "신중한 등대",
    tagline: "멀리서도 아이의 길을 비추는 부모",
    color: "#9E8AA0",
    coord: { a: -1, b: -1, c: 1, d: -1 },
    summary: "아이가 스스로 길을 걷도록 신중하게 지켜보며 방향만 비추는 부모입니다. 원칙 안에서 아이가 자기 판단을 신뢰하도록 조용히 등불을 밝힙니다. 급하지 않지만 언제나 흔들림 없는 존재로 아이의 항해를 응원합니다.",
    strengths: ["아이의 자립을 신중히 지원합니다.", "일관된 원칙으로 방향을 유지합니다.", "감정보다 상황을 이해하는 힘이 있습니다."],
    cautions: ["아이가 부모의 감정을 느끼기 어려울 수 있습니다.", "감정 표현을 더 자주 나누는 시간이 필요합니다."],
    child_growth: "우리 아이는 자기 결정력을 갖춘 자립적인 아이로 자랍니다. 부모의 원칙이 삶의 기준으로 자리 잡습니다. 흔들리지 않는 방향 감각을 가진 어른으로 성장합니다.",
    research_basis: "관찰형은 Maccoby & Martin(1983)의 방임형(uninvolved)과 뚜렷이 구분됩니다. 자녀의 자기결정성을 존중하는 능동적 선택으로서 필요한 순간에는 적절히 개입합니다. 자기결정성 이론(Ryan & Deci, 2000)의 자율성 지지에 가까운 형태이며, 국내 연구에서 부모의 자율성 지지는 자녀의 자아존중감과 자기조절력을 높이는 경로로 확인되었습니다(김도희, 2022). 다만 자녀가 요청하지 않아도 정서 신호에 반응하는 감성적 표현을 조금 늘리면 자녀가 부모의 관심을 더 분명히 지각합니다(이준배 등, 2024).",
    care_tips: ["하루 한 번 '너를 지지해'라는 표현을 짧게 말이나 스킨십으로 전해보세요.", "아이가 도움 요청 신호(표정·행동)를 보낼 때는 즉시 곁에 있어주세요.", "일주일에 한 번 '아빠는 이런 게 좋았어'로 감정을 나눠보세요."],
    share_hook: "저는 아이의 신중한 등대래요. 우리 부부는 어떤 유형일까요?",
    product_categories: ["유아 퍼즐", "몬테소리 교구", "유아 문제 해결 워크북", "유아 정리함", "어린이 학습 달력", "자석 스케줄 보드"],
    compatible_type: "planner_conductor",
    clash_type: "nurturer_companion",
  },
  observer_mentor: {
    key: "observer_mentor",
    family: "observer",
    name_kr: "냉철한 멘토",
    tagline: "냉철한 시선으로 아이의 성장을 이끄는 부모",
    color: "#9E8AA0",
    coord: { a: -1, b: -1, c: 1, d: 1 },
    summary: "감정보다 사고와 판단을 우선하며 아이의 성장을 냉철하게 이끄는 부모입니다. 새로운 도전과 원칙 아래에서 아이가 스스로 사고력을 키우도록 돕습니다. 다정함보다 성장의 방향성을 우선시하는 지혜로운 조력자입니다.",
    strengths: ["논리적 사고와 결단력이 뛰어납니다.", "아이의 자기주도적 성장을 지지합니다.", "명확한 원칙과 도전 정신을 함께 심어줍니다."],
    cautions: ["냉철함이 강하면 아이가 정서적 거리감을 느낄 수 있습니다.", "감정을 나누는 대화의 시간이 필요합니다."],
    child_growth: "우리 아이는 논리적이고 자기주도적인 사고를 가진 아이로 자랍니다. 부모의 냉철한 시선을 통해 판단력이 성장합니다. 어른이 되어서도 흔들림 없이 자기 길을 걷는 사람이 됩니다.",
    research_basis: "관찰형은 Maccoby & Martin(1983)의 방임형(uninvolved)과 뚜렷이 구분됩니다. 자녀의 자기결정성을 존중하는 능동적 선택으로서 필요한 순간에는 적절히 개입합니다. 자기결정성 이론(Ryan & Deci, 2000)의 자율성 지지에 가까운 형태이며, 국내 연구에서 부모의 자율성 지지는 자녀의 자아존중감과 자기조절력을 높이는 경로로 확인되었습니다(김도희, 2022). 다만 자녀가 요청하지 않아도 정서 신호에 반응하는 감성적 표현을 조금 늘리면 자녀가 부모의 관심을 더 분명히 지각합니다(이준배 등, 2024).",
    care_tips: ["아이의 시도에 대해 '결과보다 네가 시도한 게 대단해'를 자주 말해보세요.", "논리적 대화 뒤에 '오늘 기분은 어때?'로 감정을 물어보세요.", "잠들기 전 짧은 스킨십으로 정서적 유대의 신호를 남겨보세요."],
    share_hook: "저는 아이의 냉철한 멘토래요. 우리 부부는 어떤 유형일까요?",
    product_categories: ["유아 퍼즐", "몬테소리 교구", "유아 문제 해결 워크북", "과학 실험 키트", "자연 관찰 돋보기", "자연 관찰 키트"],
    compatible_type: "planner_architect",
    clash_type: "nurturer_helper",
  },
  observer_watcher: {
    key: "observer_watcher",
    family: "observer",
    name_kr: "조용한 관찰자",
    tagline: "아이의 속도로 조용히 함께 걷는 부모",
    color: "#9E8AA0",
    coord: { a: -1, b: -1, c: -1, d: -1 },
    summary: "아이의 성장 속도를 조용히 존중하며 함께 걷는 부모입니다. 관찰과 이해를 우선하며 아이가 자신만의 리듬을 찾도록 여유를 줍니다. 개입은 최소지만 아이의 감정과 행동을 세심히 살펴 신뢰를 쌓아갑니다.",
    strengths: ["아이의 개별 리듬을 존중합니다.", "관찰력을 통해 필요한 순간을 놓치지 않습니다.", "아이의 자율성을 자연스럽게 지원합니다."],
    cautions: ["관찰만 하면 아이가 신호를 받지 못한다고 느낄 수 있습니다.", "짧은 반응이라도 자주 표현해보세요."],
    child_growth: "우리 아이는 자기 감정을 이해하고 스스로 판단하는 성찰형 아이로 자랍니다. 부모의 관찰이 자기 인식의 뿌리가 됩니다. 자신을 이해하는 어른으로 자라 안정된 삶을 이어갑니다.",
    research_basis: "관찰형은 Maccoby & Martin(1983)의 방임형(uninvolved)과 뚜렷이 구분됩니다. 자녀의 자기결정성을 존중하는 능동적 선택으로서 필요한 순간에는 적절히 개입합니다. 자기결정성 이론(Ryan & Deci, 2000)의 자율성 지지에 가까운 형태이며, 국내 연구에서 부모의 자율성 지지는 자녀의 자아존중감과 자기조절력을 높이는 경로로 확인되었습니다(김도희, 2022). 다만 자녀가 요청하지 않아도 정서 신호에 반응하는 감성적 표현을 조금 늘리면 자녀가 부모의 관심을 더 분명히 지각합니다(이준배 등, 2024).",
    care_tips: ["아이가 시도할 때 짧은 눈맞춤과 미소로 관심을 전해보세요.", "관찰한 내용을 하루 한 번 아이에게 말로 확인해주세요. 예: '오늘 이거 해내던데?'", "'네가 원할 때 이야기해 줘, 아빠는 여기 있어'라는 안정된 신호를 자주 보내주세요."],
    share_hook: "저는 아이의 조용한 관찰자래요. 우리 부부는 어떤 유형일까요?",
    product_categories: ["유아 퍼즐", "어린이 보드게임", "몬테소리 교구", "자연 관찰 돋보기", "촉감 놀이 세트", "붙였다 뗐다 스티커북"],
    compatible_type: "planner_advisor",
    clash_type: "nurturer_pioneer",
  },
  observer_explorer: {
    key: "observer_explorer",
    family: "observer",
    name_kr: "유연한 탐험가",
    tagline: "아이와 새로운 시선으로 세상을 탐험하는 부모",
    color: "#9E8AA0",
    coord: { a: -1, b: -1, c: -1, d: 1 },
    summary: "아이의 자율성을 존중하며 함께 새로운 세계를 탐험하는 부모입니다. 정해진 규칙보다 아이의 관심사에 따라 자유롭게 배움을 확장합니다. 논리적이고 유연한 사고 속에서 아이가 세상을 열린 시선으로 바라보게 이끕니다.",
    strengths: ["열린 사고와 탐구심을 자극합니다.", "아이의 개별 관심사를 지원합니다.", "새로운 도전에 유연하게 반응합니다."],
    cautions: ["자유가 방향을 잃으면 아이가 혼란을 느낄 수 있습니다.", "가끔은 작은 원칙이 아이를 안정시켜 줍니다."],
    child_growth: "우리 아이는 세상을 탐구하며 성장하는 열린 사고형 아이로 자랍니다. 부모의 유연함이 새로운 시도를 두려워하지 않게 만듭니다. 어디서든 스스로 배우고 확장하는 어른으로 성장합니다.",
    research_basis: "관찰형은 Maccoby & Martin(1983)의 방임형(uninvolved)과 뚜렷이 구분됩니다. 자녀의 자기결정성을 존중하는 능동적 선택으로서 필요한 순간에는 적절히 개입합니다. 자기결정성 이론(Ryan & Deci, 2000)의 자율성 지지에 가까운 형태이며, 국내 연구에서 부모의 자율성 지지는 자녀의 자아존중감과 자기조절력을 높이는 경로로 확인되었습니다(김도희, 2022). 다만 자녀가 요청하지 않아도 정서 신호에 반응하는 감성적 표현을 조금 늘리면 자녀가 부모의 관심을 더 분명히 지각합니다(이준배 등, 2024).",
    care_tips: ["안전과 관련된 최소 규칙 두세 가지를 짧고 명확하게 반복해보세요.", "탐험 후 '오늘 뭐가 가장 신기했어?'로 발견을 언어화해보세요.", "일주일에 한 번 익숙한 곳에서 조용히 함께 시간을 보내는 루틴을 만들어보세요."],
    share_hook: "저는 아이의 유연한 탐험가래요. 우리 부부는 어떤 유형일까요?",
    product_categories: ["유아 퍼즐", "자연 관찰 돋보기", "자연 관찰 키트", "과학 실험 키트", "오픈엔디드 블록", "붙였다 뗐다 스티커북"],
    compatible_type: "planner_navigator",
    clash_type: "nurturer_guardian",
  },
};

export const TYPE_KEYS: TypeKey[] = [
  "nurturer_guardian", "nurturer_pioneer", "nurturer_helper", "nurturer_companion",
  "supporter_cheer", "supporter_coach", "supporter_friend", "supporter_artist",
  "planner_architect", "planner_conductor", "planner_navigator", "planner_advisor",
  "observer_lighthouse", "observer_mentor", "observer_watcher", "observer_explorer",
];

// 이론적 기반
export const THEORETICAL_BASIS =
  "Maccoby & Martin(1983) 2축 프레임과 자기결정성 이론(Ryan & Deci, 2000) 기반, 국내 실증연구 반영";

// 참고문헌
export const REFERENCES: Reference[] = [
  { id: 1, citation: "Maccoby, E. E., & Martin, J. A. (1983). Socialization in the context of the family: Parent-child interaction. In P. H. Mussen (Ed.), Handbook of child psychology, Vol. 4: Socialization, personality, and social development (pp. 1-101). New York: Wiley." },
  { id: 2, citation: "Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. American Psychologist, 55(1), 68-78." },
  { id: 3, citation: "Skinner, E., Johnson, S., & Snyder, T. (2005). Six dimensions of parenting: A motivational model. Parenting: Science and Practice, 5(2), 175-235." },
  { id: 4, citation: "김도희 (2022). 부모의 행복과 자녀의 행복의 관계에서 긍정적 양육태도, 자아존중감, 우울의 매개효과. Journal of Digital Convergence, 20(3), 469-479." },
  { id: 5, citation: "이준배, 허유진, 조병철, 박선웅 (2024). 부모의 양육태도와 청소년 자녀의 정신건강 간의 관계: 정체성 발달의 매개효과. 한국심리학회지: 학교, 21(3), 281-299." },
  { id: 6, citation: "윤초희, 최옥주 (2020). 청소년 발달과 적응의 예측요인으로서 부모 자율성 지지와 구조 제공의 관계 탐색: 자기결정성 이론의 관점에서. 한국청소년학회지, 27(12), 275-306." },
  { id: 7, citation: "염혜선, 이은주 (2020). 중학생의 학업열의, 또래관계 질, 공격성 및 삶의 만족도에 대한 부모의 자율성 지지와 구조제공의 시너지 효과. 한국교육심리학회지, 34(3), 521-541." },
];

// 신중한 톤 문구
export const DISCLAIMER =
  "본 테스트는 40여 년간 축적된 양육태도 연구를 참고해 만든 참고용 콘텐츠입니다. 아이의 성장은 부모의 성향뿐 아니라 기질, 환경, 관계 등 여러 요인의 영향을 받으며, 어떤 유형이 절대적으로 좋거나 나쁘지 않습니다. 특히 '관찰자' 계열은 학술적 방임(uninvolved parenting)과 구분되며, 자녀의 자율성을 존중하는 능동적 선택을 의미합니다.";

// 호환성 메시지 (16 유형 모두 같은 패턴이라 공통 사용)
export const COMPATIBILITY_MESSAGES = {
  match: "아이를 대하는 온도와 마음의 방향(감정 vs 논리)이 같아 육아 철학이 잘 맞습니다. 하지만 개입 정도와 새로움을 대하는 방식이 서로 달라, 상대가 놓치는 시야를 자연스럽게 채워줍니다. 육아에서 자주 '오, 그 관점 좋다'라고 서로에게 배우는 관계가 됩니다.",
  clash: "감정을 대하는 방식, 개입 정도, 규칙 감각, 도전에 대한 태도 — 4개 축이 모두 반대라 같은 상황에서 서로 다른 반응이 나오기 쉽습니다. 대화 없이는 상대의 결정이 이해되지 않을 수 있어요. 정기적으로 서로의 이유를 확인하는 대화가 특히 중요한 관계입니다.",
};

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
