import {
  fetchMockBusArrivals,
  searchMockBusStops,
} from "./mockBusService.js";

const BUS_API_BASE = "/api/seoul-bus";

const CONGESTION_LABELS = {
  3: "여유",
  4: "보통",
  5: "혼잡",
};

function toArray(value) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

async function requestBusApi(path, params) {
  const query = new URLSearchParams({
    ...params,
    resultType: "json",
  });
  const response = await fetch(`${BUS_API_BASE}/${path}?${query.toString()}`);

  if (!response.ok) {
    throw new Error("Bus API request failed");
  }

  const payload = await response.json();
  const header = payload.msgHeader ?? payload.ServiceResult?.msgHeader;
  const body = payload.msgBody ?? payload.ServiceResult?.msgBody;

  if (String(header?.headerCd) !== "0") {
    throw new Error(header?.headerMsg ?? "Bus API returned an error");
  }

  return toArray(body?.itemList);
}

function normalizeStation(station) {
  return {
    stopId: station.stId,
    arsId: station.arsId,
    stopName: station.stNm,
    direction: "방향 정보 확인 중",
    source: "seoul-bus",
  };
}

function normalizeArrival(arrival) {
  return {
    routeId: arrival.busRouteId,
    routeName: arrival.busRouteAbrv || arrival.rtNm,
    arrivalMessage: arrival.arrmsg1 || "도착 정보 없음",
    congestion: CONGESTION_LABELS[arrival.congestion1] ?? "정보 없음",
  };
}

export async function searchBusStops(searchTerm) {
  const trimmedTerm = searchTerm.trim();

  if (!trimmedTerm) {
    return {
      stops: [],
      isTemporary: false,
    };
  }

  try {
    const stations = await requestBusApi("getStationByName", {
      stSrch: trimmedTerm,
    });

    return {
      stops: stations.map(normalizeStation).slice(0, 8),
      isTemporary: false,
    };
  } catch {
    return {
      stops: await searchMockBusStops(trimmedTerm),
      isTemporary: true,
    };
  }
}

export async function fetchBusArrivals(stop) {
  if (!stop?.arsId || stop.arsId.startsWith("mock-")) {
    return fetchMockBusArrivals(stop);
  }

  try {
    const arrivals = await requestBusApi("getStationByUid", {
      arsId: stop.arsId,
    });

    return {
      stopId: stop.stopId,
      arsId: stop.arsId,
      stopName: stop.stopName,
      direction: arrivals[0]?.adirection
        ? `${arrivals[0].adirection} 방면`
        : "방향 정보 확인 중",
      arrivals: arrivals.map(normalizeArrival).slice(0, 4),
      fetchedAt: new Date().toISOString(),
      source: "seoul-bus",
      sourceLabel: "서울 버스 API",
      isTemporary: false,
    };
  } catch {
    return fetchMockBusArrivals(stop);
  }
}
