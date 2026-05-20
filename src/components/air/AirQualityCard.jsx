import {
  Thermometer,
  Wind,
  Umbrella,
  Sun,
  Activity,
  CloudRain,
} from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { formatNumber, formatSpeed, formatTemperature, formatPercent } from "../../utils/formatUnit";

export default function AirQualityCard({ airData, forecastData }) {
  const air = airData?.current;
  const currentWeather = forecastData?.current;

  if (!air && !currentWeather) {
    return (
      <SectionCard title="Air Conditions" subtitle="Data belum tersedia">
        <p className="empty-text">Tidak ada data kondisi udara.</p>
      </SectionCard>
    );
  }

  const items = [
    {
      label: "Real Feel",
      value: formatTemperature(currentWeather?.apparent_temperature),
      icon: Thermometer,
    },
    {
      label: "Wind",
      value: formatSpeed(currentWeather?.wind_speed_10m),
      icon: Wind,
    },
    {
      label: "Chance of Rain",
      value: formatPercent(currentWeather?.precipitation ?? 0),
      icon: CloudRain,
    },
    {
      label: "UV Index",
      value: formatNumber(air?.uv_index),
      icon: Sun,
    },
    {
      label: "PM2.5",
      value: `${formatNumber(air?.pm2_5)} µg/m³`,
      icon: Activity,
    },
    {
      label: "PM10",
      value: `${formatNumber(air?.pm10)} µg/m³`,
      icon: Umbrella,
    },
  ];

  return (
    <SectionCard
      title="Air Conditions"
      subtitle="Kondisi cuaca dan kualitas udara"
      rightContent={<button className="mini-pill-button">See more</button>}
    >
      <div className="air-conditions-grid">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div className="air-condition-item" key={item.label}>
              <div className="air-condition-icon">
                <Icon size={17} />
              </div>

              <div className="air-condition-content">
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