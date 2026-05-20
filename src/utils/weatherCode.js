export const weatherCodeMap = {
  0: { label: "Cerah", icon: "sun" },
  1: { label: "Sebagian cerah", icon: "cloud-sun" },
  2: { label: "Berawan sebagian", icon: "cloud-sun" },
  3: { label: "Berawan", icon: "cloud" },
  45: { label: "Berkabut", icon: "cloud" },
  48: { label: "Kabut beku", icon: "cloud" },

  51: { label: "Gerimis ringan", icon: "drizzle" },
  53: { label: "Gerimis sedang", icon: "drizzle" },
  55: { label: "Gerimis lebat", icon: "drizzle" },
  56: { label: "Gerimis beku ringan", icon: "drizzle" },
  57: { label: "Gerimis beku lebat", icon: "drizzle" },

  61: { label: "Hujan ringan", icon: "rain" },
  63: { label: "Hujan sedang", icon: "rain" },
  65: { label: "Hujan lebat", icon: "rain" },
  66: { label: "Hujan beku ringan", icon: "rain" },
  67: { label: "Hujan beku lebat", icon: "rain" },

  71: { label: "Salju ringan", icon: "snow" },
  73: { label: "Salju sedang", icon: "snow" },
  75: { label: "Salju lebat", icon: "snow" },
  77: { label: "Butiran salju", icon: "snow" },
  85: { label: "Hujan salju ringan", icon: "snow" },
  86: { label: "Hujan salju lebat", icon: "snow" },

  80: { label: "Hujan lokal ringan", icon: "rain" },
  81: { label: "Hujan lokal sedang", icon: "rain" },
  82: { label: "Hujan lokal lebat", icon: "rain" },

  95: { label: "Badai petir", icon: "storm" },
  96: { label: "Badai petir dengan hujan es", icon: "storm" },
  99: { label: "Badai petir ekstrem", icon: "storm" },
};

export function getWeatherInfo(code) {
  return (
    weatherCodeMap[code] || {
      label: "Tidak diketahui",
      icon: "cloud",
    }
  );
}