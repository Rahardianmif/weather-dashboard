export function formatDate(dateString) {
  if (!dateString) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(new Date(dateString));
}

export function formatFullDate(dateString) {
  if (!dateString) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export function formatHour(dateString) {
  if (!dateString) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}