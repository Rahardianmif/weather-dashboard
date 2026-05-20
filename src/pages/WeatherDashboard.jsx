import { useState } from "react";
import {
  CloudSun,
  List,
  Map,
  Settings2,
  Wind,
  Moon,
  Sun,
} from "lucide-react";

import { useWeatherDashboard } from "../hooks/useWeatherDashboard";
import CurrentWeatherCard from "../components/weather/CurrentWeatherCard";
import DailyForecastCard from "../components/weather/DailyForecastCard";
import HourlyForecastCard from "../components/weather/HourlyForecastCard";
import AirQualityCard from "../components/air/AirQualityCard";
import HistoricalWeatherCard from "../components/historical/HistoricalWeatherCard";
import CitySearch from "../components/location/CitySearch";
import LocationButton from "../components/location/LocationButton";
import Loading from "../components/shared/Loading";
import ErrorMessage from "../components/shared/ErrorMessage";

export default function WeatherDashboard() {
  const [theme, setTheme] = useState("dark");

  const [selectedCity, setSelectedCity] = useState({
    name: "Bandung",
    admin1: "Jawa Barat",
    country: "Indonesia",
    latitude: -6.9175,
    longitude: 107.6191,
    timezone: "Asia/Jakarta",
  });

  const { data, loading, errors, refetch } = useWeatherDashboard(
    selectedCity.latitude,
    selectedCity.longitude
  );

  const navItems = [
    { label: "Weather", icon: CloudSun, active: true },
    { label: "Cities", icon: List, active: false },
    { label: "Map", icon: Map, active: false },
    { label: "Settings", icon: Settings2, active: false },
  ];

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return (
    <main className="page" data-theme={theme}>
      <div className="app-shell">
        <aside className="side-nav">
          <div className="brand-badge">
            <Wind size={24} />
          </div>

          <div className="nav-menu">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  type="button"
                  key={item.label}
                  className={`nav-item ${item.active ? "active" : ""}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="dashboard-content">
          <div className="dashboard-title">
            <div>
              <span className="dashboard-kicker">Open-Meteo Weather App</span>
              <h1>Dashboard Cuaca Interaktif</h1>
              <p>
                Pantau cuaca saat ini, prakiraan per jam, prakiraan mingguan,
                kualitas udara, dan riwayat cuaca dalam satu tampilan.
              </p>
            </div>

            <button type="button" className="theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
          </div>

          <div className="dashboard-topbar">
            <div className="dashboard-topbar-left">
              <CitySearch onSelectCity={setSelectedCity} />
            </div>

            <div className="dashboard-topbar-right">
              <button
                className="refresh-button"
                onClick={refetch}
                disabled={loading}
              >
                Refresh
              </button>

              <LocationButton onDetectLocation={setSelectedCity} />
            </div>
          </div>

          <div className="location-hero">
            <div>
              <h2>{selectedCity.name}</h2>
              <p>
                {selectedCity.admin1 ? `${selectedCity.admin1}, ` : ""}
                {selectedCity.country || "Indonesia"}
              </p>
            </div>

            <div className="coordinate-pill">
              Lat {Number(selectedCity.latitude).toFixed(4)} · Long{" "}
              {Number(selectedCity.longitude).toFixed(4)}
            </div>
          </div>

          {loading ? (
            <Loading text="Memuat dashboard cuaca..." />
          ) : (
            <>
              <ErrorMessage errors={errors} />

              <div className="main-layout-grid">
                <div className="main-layout-left">
                  <CurrentWeatherCard
                    data={data.forecast}
                    elevation={data.elevation}
                    locationName={selectedCity.name}
                  />

                  <HourlyForecastCard data={data.forecast} />

                  <AirQualityCard
                    airData={data.airQuality}
                    forecastData={data.forecast}
                  />
                </div>

                <div className="main-layout-right">
                  <DailyForecastCard data={data.forecast} />
                  <HistoricalWeatherCard data={data.historical} />
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}