import SectionCard from "../shared/SectionCard";
import WeatherIcon from "./WeatherIcon";
import { getWeatherInfo } from "../../utils/weatherCode";
import { formatDate } from "../../utils/formatDate";
import { formatTemperature } from "../../utils/formatUnit";

export default function DailyForecastCard({ data }) {
  const daily = data?.daily;

  if (!daily?.time?.length) {
    return (
      <SectionCard title="7-Day Forecast" subtitle="Data belum tersedia">
        <p className="empty-text">Tidak ada data prakiraan harian.</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="7-Day Forecast" className="daily-side-card">
      <div className="seven-day-list">
        {daily.time.map((date, index) => {
          const info = getWeatherInfo(daily.weather_code?.[index]);

          return (
            <div className="seven-day-item" key={date}>
              <div className="seven-day-left">
                <span className="day-name">{index === 0 ? "Today" : formatDate(date)}</span>
              </div>

              <div className="seven-day-center">
                <WeatherIcon code={daily.weather_code?.[index]} size="small" />
                <strong>{info.label}</strong>
              </div>

              <div className="seven-day-right">
                <span>
                  {formatTemperature(daily.temperature_2m_max?.[index]).replace("°C", "")}/
                  {formatTemperature(daily.temperature_2m_min?.[index]).replace("°C", "")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}