import React, { useState } from "react";
import Select from "react-select";

const CitySelector = ({ label, cities, onSelect }) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const cityOptions = cities.map((city) => ({
    value: city,
    label: city,
  }));

  const handleChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    if (onSelect) {
      onSelect(selectedOption);
    }
  };

  return (
    <div className="w-full max-w-md">
      <label className="block text-gray-700 font-medium mb-1">
        {label}
      </label>
      <Select
        options={cityOptions}
        value={selectedCity}
        onChange={handleChange}
        placeholder="Select a city..."
        isSearchable
        className="text-gray-700"
      />
    </div>
  );
};

export default CitySelector;
