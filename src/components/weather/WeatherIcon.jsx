import {
  Sun,
  CloudSun,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  Snowflake,
} from "lucide-react";
import { getWeatherInfo } from "../../utils/weatherCode";

const iconMap = {
  sun: Sun,
  "cloud-sun": CloudSun,
  cloud: Cloud,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  storm: CloudLightning,
  snow: Snowflake,
};

export default function WeatherIcon({ code, size = "large" }) {
  const weather = getWeatherInfo(code);
  const IconComponent = iconMap[weather.icon] || Cloud;

  return (
    <span className={`weather-lucide weather-lucide-${size}`} title={weather.label}>
      <IconComponent strokeWidth={2.2} />
    </span>
  );
}