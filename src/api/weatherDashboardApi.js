import { getForecast } from "./forecastApi";
import { getAirQuality } from "./airQualityApi";
import { getHistoricalWeather } from "./historicalApi";
import { getElevation } from "./elevationApi";

function getResult(result) {
  return result.status === "fulfilled" ? result.value : null;
}

function getError(result, name) {
  if (result.status === "fulfilled") return null;

  return {
    name,
    message: result.reason?.message || "Terjadi kesalahan.",
  };
}

export async function getFullWeatherDashboard(latitude, longitude) {
  const results = await Promise.allSettled([
    getForecast(latitude, longitude),
    getAirQuality(latitude, longitude),
    getHistoricalWeather(latitude, longitude),
    getElevation(latitude, longitude),
  ]);

  const [forecast, airQuality, historical, elevation] = results;

  return {
    forecast: getResult(forecast),
    airQuality: getResult(airQuality),
    historical: getResult(historical),
    elevation: getResult(elevation),

    errors: [
      getError(forecast, "Forecast API"),
      getError(airQuality, "Air Quality API"),
      getError(historical, "Historical API"),
      getError(elevation, "Elevation API"),
    ].filter(Boolean),
  };
}