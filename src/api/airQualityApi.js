import { openMeteoFetch } from "./openMeteoClient";

const AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

export function getAirQuality(latitude, longitude) {
  return openMeteoFetch(AIR_QUALITY_URL, {
    latitude,
    longitude,
    timezone: "Asia/Jakarta",
    current: [
      "pm10",
      "pm2_5",
      "carbon_monoxide",
      "nitrogen_dioxide",
      "sulphur_dioxide",
      "ozone",
      "uv_index",
    ],
  });
}