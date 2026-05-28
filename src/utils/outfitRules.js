const rules = [
  { max: 5, recommendation: "패딩, 두꺼운 코트, 목도리처럼 따뜻한 옷을 챙겨요." },
  { max: 9, recommendation: "코트나 가죽 재킷에 니트를 더하면 좋아요." },
  { max: 12, recommendation: "재킷, 트렌치코트, 니트 조합을 추천해요." },
  { max: 17, recommendation: "재킷이나 가디건, 야상을 챙기면 든든해요." },
  { max: 20, recommendation: "얇은 니트나 맨투맨, 가디건이 잘 맞는 날씨예요." },
  { max: 23, recommendation: "얇은 가디건이나 긴팔에 면바지, 청바지가 좋아요." },
  { max: 28, recommendation: "반팔이나 얇은 셔츠가 잘 어울리는 날씨예요." },
  { max: Infinity, recommendation: "민소매, 반팔, 반바지처럼 가벼운 옷을 추천해요." },
];

export function getOutfitRecommendation(temperature) {
  return rules.find((rule) => temperature < rule.max).recommendation;
}
