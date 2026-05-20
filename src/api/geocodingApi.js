import { openMeteoFetch } from "./openMeteoClient";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

export function searchCities(keyword) {
  return openMeteoFetch(GEOCODING_URL, {
    name: keyword,
    count: 10,
    language: "id",
    format: "json",
  });
}