export function formatTemperature(value) {
  if (value === null || value === undefined) return "-";
  return `${Math.round(value)}°C`;
}

export function formatPercent(value) {
  if (value === null || value === undefined) return "-";
  return `${Math.round(value)}%`;
}

export function formatSpeed(value) {
  if (value === null || value === undefined) return "-";
  return `${Math.round(value)} km/jam`;
}

export function formatMm(value) {
  if (value === null || value === undefined) return "-";
  return `${Number(value).toFixed(1)} mm`;
}

export function formatNumber(value, suffix = "") {
  if (value === null || value === undefined) return "-";
  return `${Number(value).toFixed(1)}${suffix}`;
}