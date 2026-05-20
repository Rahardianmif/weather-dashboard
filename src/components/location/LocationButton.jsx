import { useState } from "react";
import { LocateFixed } from "lucide-react";

export default function LocationButton({ onDetectLocation }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleDetectLocation() {
    setMessage("");

    if (!navigator.geolocation) {
      setMessage("Browser tidak mendukung fitur lokasi.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        onDetectLocation({
          name: "Lokasi Saya",
          admin1: "",
          country: "",
          latitude,
          longitude,
          timezone: "Asia/Jakarta",
        });

        setLoading(false);
      },
      () => {
        setMessage("Izin lokasi ditolak atau lokasi tidak tersedia.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  return (
    <div className="location-action">
      <button
        type="button"
        className="location-button"
        onClick={handleDetectLocation}
        disabled={loading}
      >
        <LocateFixed size={16} />
        {loading ? "Detecting..." : "Use My Location"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}