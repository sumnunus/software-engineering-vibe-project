import { fetchMockWeather } from "./mockWeatherService.js";

const WEATHER_ENDPOINT = "https://api.open-meteo.com/v1/forecast";

const WEATHER_CODE_MAP = {
  0: { condition: "맑음", icon: "☀️" },
  1: { condition: "대체로 맑음", icon: "🌤️" },
  2: { condition: "구름 조금", icon: "⛅" },
  3: { condition: "흐림", icon: "☁️" },
  45: { condition: "안개", icon: "🌫️" },
  48: { condition: "서리 안개", icon: "🌫️" },
  51: { condition: "약한 이슬비", icon: "🌦️" },
  53: { condition: "이슬비", icon: "🌦️" },
  55: { condition: "강한 이슬비", icon: "🌧️" },
  61: { condition: "약한 비", icon: "🌧️" },
  63: { condition: "비", icon: "🌧️" },
  65: { condition: "강한 비", icon: "🌧️" },
  71: { condition: "약한 눈", icon: "🌨️" },
  73: { condition: "눈", icon: "🌨️" },
  75: { condition: "강한 눈", icon: "🌨️" },
  80: { condition: "소나기", icon: "🌦️" },
  81: { condition: "소나기", icon: "🌦️" },
  82: { condition: "강한 소나기", icon: "⛈️" },
  95: { condition: "뇌우", icon: "⛈️" },
};

function roundTemperature(value) {
  return Math.round(value);
}

function getWeatherCodeInfo(weatherCode) {
  return WEATHER_CODE_MAP[weatherCode] ?? { condition: "날씨 정보", icon: "🌤️" };
}

function buildWeatherUrl(location) {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: "temperature_2m,apparent_temperature,precipitation,weather_code",
    daily: "temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: "1",
  });

  return `${WEATHER_ENDPOINT}?${params.toString()}`;
}

function normalizeOpenMeteoWeather(payload, location) {
  const weatherCode = payload.current.weather_code;
  const weatherCodeInfo = getWeatherCodeInfo(weatherCode);

  return {
    locationName: location.locationName,
    locationSource: location.locationSource,
    temperature: roundTemperature(payload.current.temperature_2m),
    temperatureMin: roundTemperature(payload.daily.temperature_2m_min[0]),
    temperatureMax: roundTemperature(payload.daily.temperature_2m_max[0]),
    apparentTemperature: roundTemperature(payload.current.apparent_temperature),
    condition: weatherCodeInfo.condition,
    weatherCode,
    icon: weatherCodeInfo.icon,
    precipitation: payload.current.precipitation,
    precipitationUnit: payload.current_units.precipitation,
    fetchedAt: payload.current.time,
    source: "open-meteo",
    sourceLabel: location.locationSource === "current" ? "현재 위치" : "홍대입구 기준",
    isTemporary: false,
  };
}

export async function fetchWeather(location) {
  try {
    const response = await fetch(buildWeatherUrl(location));

    if (!response.ok) {
      throw new Error("Weather API request failed");
    }

    const payload = await response.json();
    return normalizeOpenMeteoWeather(payload, location);
  } catch {
    return fetchMockWeather();
  }
}
