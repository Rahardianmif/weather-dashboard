import { openMeteoFetch } from "./openMeteoClient";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export function getForecast(latitude, longitude) {
  return openMeteoFetch(FORECAST_URL, {
    latitude,
    longitude,
    timezone: "Asia/Jakarta",

    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "rain",
      "weather_code",
      "cloud_cover",
      "pressure_msl",
      "wind_speed_10m",
      "wind_direction_10m",
    ],

    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation_probability",
      "rain",
      "weather_code",
      "cloud_cover",
      "wind_speed_10m",
    ],

    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "rain_sum",
      "wind_speed_10m_max",
    ],

    forecast_days: 7,
  });
}