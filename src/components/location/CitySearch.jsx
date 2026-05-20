import { useState } from "react";
import { Search } from "lucide-react";
import { searchCities } from "../../api/geocodingApi";

export default function CitySearch({ onSelectCity }) {
  const [keyword, setKeyword] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSearch(event) {
    event.preventDefault();

    if (!keyword.trim()) {
      setMessage("Masukkan nama kota terlebih dahulu.");
      setCities([]);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await searchCities(keyword.trim());

      if (!result?.results?.length) {
        setCities([]);
        setMessage("Kota tidak ditemukan.");
        return;
      }

      setCities(result.results);
    } catch (error) {
      setCities([]);
      setMessage(error.message || "Gagal mencari kota.");
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(city) {
    onSelectCity({
      name: city.name,
      country: city.country,
      admin1: city.admin1,
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: city.timezone,
    });

    setKeyword("");
    setCities([]);
    setMessage("");
  }

  return (
    <div className="city-search">
      <form className="city-search-form" onSubmit={handleSearch}>
        <div className="city-search-input-wrap">
          <Search size={18} />
          <input
            type="text"
            value={keyword}
            placeholder="Search for cities"
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {message && <p className="city-search-message">{message}</p>}

      {cities.length > 0 && (
        <div className="city-result-list">
          {cities.map((city) => (
            <button
              type="button"
              className="city-result-item"
              key={`${city.id}-${city.latitude}-${city.longitude}`}
              onClick={() => handleSelect(city)}
            >
              <strong>{city.name}</strong>
              <span>{[city.admin1, city.country].filter(Boolean).join(", ")}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}