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
  locationName: "Seoul",
  temperature: 21,
  apparentTemperature: 22,
  condition: "맑음",
  weatherCode: 0,
  precipitation: 10,
  fetchedAt: "2026-05-26T08:00:00+09:00",
  source: "mock",
};

export const busArrival = {
  stopId: "mock-stop-1",
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
};
