import { weather } from "../data/mockData.js";

export async function fetchMockWeather() {
  return {
    ...weather,
    fetchedAt: new Date().toISOString(),
    isTemporary: true,
  };
}
