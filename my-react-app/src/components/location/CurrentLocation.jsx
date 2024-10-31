import { useRef, useState } from "react";
import { IoLocation } from "react-icons/io5";
import "./location.css";
export default function CurrentLocation({
  currentLocation,
  setCurrentLocation,
  setLoading,
}) {
  const [searchOptions, setSearchOptions] = useState([]);
  const locationInputRef = useRef();
  async function searchLocation(location) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://weatherapplication-rm3t.onrender.com/api/search?location=${location}`
      );
      const data = await response.json();

      if (!response?.ok) return;
      setSearchOptions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  function handleChangeLocation(location) {
    setCurrentLocation({
      name: location?.name,
      region: location?.region,
      country: location?.country,
    });
    setSearchOptions([]);
    if (locationInputRef?.current?.value) locationInputRef.current.value = "";
  }
  return (
    <section className="location-section">
      <div className="current-location">
        <IoLocation />
        <span>{currentLocation?.name},</span>
        <span>{currentLocation?.region},</span>
        <span>{currentLocation?.country}</span>
      </div>
      <div className="search-location">
        <input
          placeholder="Change location"
          ref={locationInputRef}
          onChange={(e) => searchLocation(e?.target?.value)}
        />
        <div className="location-search-option-container">
          {searchOptions?.map((option, id) => (
            <option
              key={id}
              value={{
                name: option?.name,
                region: option?.region,
                country: option?.country,
              }}
              onClick={(e) => handleChangeLocation(option)}
            >
              {`${option?.name}, ${option?.region}, ${option?.country}`}
            </option>
          ))}
        </div>
      </div>
    </section>
  );
}
