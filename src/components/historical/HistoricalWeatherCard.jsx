import SectionCard from "../shared/SectionCard";
import WeatherIcon from "../weather/WeatherIcon";
import { getWeatherInfo } from "../../utils/weatherCode";
import { formatDate } from "../../utils/formatDate";
import { formatTemperature } from "../../utils/formatUnit";

export default function HistoricalWeatherCard({ data }) {
  const daily = data?.daily;

  if (!daily?.time?.length) {
    return (
      <SectionCard title="Historical Weather" subtitle="Data belum tersedia">
        <p className="empty-text">Tidak ada data historis.</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard
        title="Historical Weather"
        subtitle="Data historis beberapa hari sebelumnya"
        className="historical-card"
    >
      <div className="history-list">
        {daily.time.map((date, index) => {
          const info = getWeatherInfo(daily.weather_code?.[index]);

          return (
            <div className="history-item" key={date}>
              <div className="history-left">
                <WeatherIcon code={daily.weather_code?.[index]} size="small" />
                <div>
                  <strong>{formatDate(date)}</strong>
                  <span>{info.label}</span>
                </div>
              </div>

              <div className="history-right">
                <span>{formatTemperature(daily.temperature_2m_max?.[index])}</span>
                <span>{formatTemperature(daily.temperature_2m_min?.[index])}</span>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}