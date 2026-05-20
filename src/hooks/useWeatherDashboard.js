import { useEffect, useState } from "react";
import { getFullWeatherDashboard } from "../api/weatherDashboardApi";

export function useWeatherDashboard(latitude, longitude) {
  const [data, setData] = useState({
    forecast: null,
    airQuality: null,
    historical: null,
    elevation: null,
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  async function fetchDashboard() {
    if (!latitude || !longitude) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const result = await getFullWeatherDashboard(latitude, longitude);

      setData({
        forecast: result.forecast,
        airQuality: result.airQuality,
        historical: result.historical,
        elevation: result.elevation,
      });

      setErrors(result.errors || []);
    } catch (error) {
      setErrors([
        {
          name: "Dashboard",
          message: error.message || "Gagal memuat dashboard cuaca.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, [latitude, longitude]);

  return {
    data,
    loading,
    errors,
    refetch: fetchDashboard,
  };
}