import { openMeteoFetch } from "./openMeteoClient";

const HISTORICAL_URL = "https://archive-api.open-meteo.com/v1/archive";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getSafeHistoricalRange() {
  const end = new Date();
  end.setDate(end.getDate() - 8);

  const start = new Date();
  start.setDate(start.getDate() - 14);

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
}

export function getHistoricalWeather(latitude, longitude) {
  const { startDate, endDate } = getSafeHistoricalRange();

  return openMeteoFetch(HISTORICAL_URL, {
    latitude,
    longitude,
    timezone: "Asia/Jakarta",
    start_date: startDate,
    end_date: endDate,
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "rain_sum",
      "wind_speed_10m_max",
    ],
  });
}