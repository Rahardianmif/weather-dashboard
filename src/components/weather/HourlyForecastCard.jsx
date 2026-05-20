import SectionCard from "../shared/SectionCard";
import WeatherIcon from "./WeatherIcon";
import { formatHour } from "../../utils/formatDate";
import {
  formatPercent,
  formatSpeed,
  formatTemperature,
} from "../../utils/formatUnit";

export default function HourlyForecastCard({ data }) {
  const hourly = data?.hourly;

  if (!hourly?.time?.length) {
    return (
      <SectionCard title="Today's Forecast" subtitle="Data belum tersedia">
        <p className="empty-text">Tidak ada data prakiraan per jam.</p>
      </SectionCard>
    );
  }

  const items = hourly.time.slice(0, 24);

  return (
    <SectionCard
      title="Today's Forecast"
      subtitle="Scroll untuk melihat prakiraan per jam"
    >
      <div className="hourly-scroll-wrapper">
        <div className="hourly-scroll-track">
          {items.map((time, index) => (
            <div className="hourly-scroll-card" key={time}>
              <span className="hourly-time">{formatHour(time)}</span>

              <WeatherIcon code={hourly.weather_code?.[index]} size="medium" />

              <strong>{formatTemperature(hourly.temperature_2m?.[index])}</strong>

              <small>
                Rain {formatPercent(hourly.precipitation_probability?.[index])}
              </small>

              <small>{formatSpeed(hourly.wind_speed_10m?.[index])}</small>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}