export const departure = {
  targetTime: "08:40",
  updatedAt: "2026-05-26T08:00:00+09:00",
};

export const todos = [
  {
    id: "todo-1",
    title: "지갑",
    completed: false,
    createdAt: "2026-05-26T08:00:00+09:00",
    updatedAt: "2026-05-26T08:00:00+09:00",
  },
  {
    id: "todo-2",
    title: "이어폰",
    completed: false,
    createdAt: "2026-05-26T08:01:00+09:00",
    updatedAt: "2026-05-26T08:01:00+09:00",
  },
  {
    id: "todo-3",
    title: "우산",
    completed: false,
    createdAt: "2026-05-26T08:02:00+09:00",
    updatedAt: "2026-05-26T08:02:00+09:00",
  },
  {
    id: "todo-4",
    title: "노트북 충전기",
    completed: false,
    createdAt: "2026-05-26T08:03:00+09:00",
    updatedAt: "2026-05-26T08:03:00+09:00",
  },
];

export const weather = {
  locationName: "홍대입구",
  temperature: 21,
  temperatureMin: 18,
  temperatureMax: 24,
  apparentTemperature: 22,
  condition: "맑음",
  weatherCode: 0,
  precipitation: 0,
  precipitationUnit: "mm",
  fetchedAt: "2026-05-26T08:00:00+09:00",
  source: "mock",
  sourceLabel: "임시 데이터",
  icon: "☀️",
};

export const busArrival = {
  stopId: "mock-stop-1",
  arsId: "mock-14001",
  stopName: "홍대입구역",
  direction: "학교 방면",
  arrivals: [
    {
      routeId: "bus-273",
      routeName: "273",
      minutesLeft: 7,
      arrivalMessage: "7분 후",
      congestion: "보통",
    },
    {
      routeId: "bus-7016",
      routeName: "7016",
      minutesLeft: 12,
      arrivalMessage: "12분 후",
      congestion: "여유",
    },
    {
      routeId: "bus-7612",
      routeName: "7612",
      minutesLeft: 18,
      arrivalMessage: "18분 후",
      congestion: "보통",
    },
  ],
  fetchedAt: "2026-05-26T08:00:00+09:00",
  source: "mock",
  sourceLabel: "임시 데이터",
  isTemporary: true,
};

export const busStops = [
  {
    stopId: "mock-stop-1",
    arsId: "mock-14001",
    stopName: "홍대입구역",
    direction: "학교 방면",
  },
  {
    stopId: "mock-stop-2",
    arsId: "mock-02005",
    stopName: "서울역버스환승센터",
    direction: "숭례문 방면",
  },
  {
    stopId: "mock-stop-3",
    arsId: "mock-12121",
    stopName: "불광역3.6호선",
    direction: "신설동 방면",
  },
];
