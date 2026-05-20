const DEFAULT_TIMEOUT = 15000;

export function buildQuery(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      searchParams.append(key, value.join(","));
    } else {
      searchParams.append(key, value);
    }
  });

  return searchParams.toString();
}

export async function openMeteoFetch(baseUrl, params = {}) {
  const query = buildQuery(params);
  const url = query ? `${baseUrl}?${query}` : baseUrl;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  try {
    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request gagal: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request terlalu lama. Coba lagi nanti.");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}