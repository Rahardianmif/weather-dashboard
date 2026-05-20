import { openMeteoFetch } from "./openMeteoClient";

const ELEVATION_URL = "https://api.open-meteo.com/v1/elevation";

export function getElevation(latitude, longitude) {
  return openMeteoFetch(ELEVATION_URL, {
    latitude,
    longitude,
  });
}