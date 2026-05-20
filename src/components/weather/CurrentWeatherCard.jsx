import {
  Thermometer,
  Droplets,
  Wind,
  Cloud,
  Gauge,
  Compass,
  Mountain,
  Umbrella,
} from "lucide-react";
import SectionCard from "../shared/SectionCard";
import WeatherIcon from "./WeatherIcon";
import { getWeatherInfo } from "../../utils/weatherCode";
import {
  formatPercent,
  formatSpeed,
  formatTemperature,
  formatMm,
} from "../../utils/formatUnit";

export default function CurrentWeatherCard({
  data,
  elevation,
  locationName = "Lokasi",
}) {
  if (!data?.current) {
    return (
      <SectionCard title="Weather Overview" subtitle="Data belum tersedia">
        <p className="empty-text">Tidak ada data cuaca saat ini.</p>
      </SectionCard>
    );
  }

  const current = data.current;
  const weather = getWeatherInfo(current.weather_code);
  const elevationValue = elevation?.elevation?.[0];

  const metaItems = [
    {
      label: "Real Feel",
      value: formatTemperature(current.apparent_temperature),
      icon: Thermometer,
    },
    {
      label: "Humidity",
      value: formatPercent(current.relative_humidity_2m),
      icon: Droplets,
    },
    {
      label: "Wind",
      value: formatSpeed(current.wind_speed_10m),
      icon: Wind,
    },
    {
      label: "Cloud Cover",
      value: formatPercent(current.cloud_cover),
      icon: Cloud,
    },
    {
      label: "Pressure",
      value: `${current.pressure_msl ?? "-"} hPa`,
      icon: Gauge,
    },
    {
      label: "Wind Dir",
      value: `${current.wind_direction_10m ?? "-"}°`,
      icon: Compass,
    },
    {
      label: "Rain",
      value: formatMm(current.rain),
      icon: Umbrella,
    },
    {
      label: "Elevation",
      value:
        elevationValue !== undefined ? `${Math.round(elevationValue)} mdpl` : "-",
      icon: Mountain,
    },
  ];

  return (
    <SectionCard
      title="Weather"
      subtitle={locationName}
      className="hero-weather-card"
    >
      <div className="weather-hero-top">
        <div className="weather-hero-text">
          <h3>{locationName}</h3>
          <p>{weather.label}</p>
          <h1>{formatTemperature(current.temperature_2m)}</h1>
        </div>

        <div className="weather-hero-icon-wrap">
          <WeatherIcon code={current.weather_code} size="xxl" />
        </div>
      </div>

      <div className="conditions-grid">
        {metaItems.map((item) => {
          const Icon = item.icon;

          return (
            <div className="condition-item" key={item.label}>
              <div className="condition-icon">
                <Icon size={16} />
              </div>

              <div className="condition-content">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}