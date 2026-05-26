const rules = [
  { max: 5, recommendation: "두꺼운 외투와 목도리를 챙기는 게 좋아요." },
  { max: 10, recommendation: "코트나 패딩처럼 따뜻한 겉옷을 추천해요." },
  { max: 17, recommendation: "재킷, 가디건, 니트 조합이 좋아요." },
  { max: 23, recommendation: "얇은 긴팔이나 가벼운 겉옷이면 충분해요." },
  { max: 28, recommendation: "반팔이나 얇은 셔츠를 추천해요." },
  { max: Infinity, recommendation: "통풍이 잘 되는 가벼운 옷을 추천해요." },
];

export function getOutfitRecommendation(temperature) {
  return rules.find((rule) => temperature < rule.max).recommendation;
}
