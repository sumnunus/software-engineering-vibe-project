import { busArrival, busStops } from "../data/mockData.js";

export async function fetchMockBusArrivals(stop = busStops[0]) {
  return {
    ...busArrival,
    stopId: stop.stopId,
    arsId: stop.arsId,
    stopName: stop.stopName,
    direction: stop.direction ?? busArrival.direction,
    fetchedAt: new Date().toISOString(),
  };
}

export async function searchMockBusStops(searchTerm) {
  const normalizedTerm = searchTerm.trim().toLowerCase();

  return busStops.filter((stop) =>
    stop.stopName.toLowerCase().includes(normalizedTerm)
  );
}
