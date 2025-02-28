import React, { useState } from "react";

export function LocationSelector({ icon, placeholder, value, onChange }) {
  // Mock locations for demo
  const suggestions = [
    "Airport Terminal 1",
    "Central Station",
    "Downtown Mall",
    "Business District",
    "Harbor Front",
  ];

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    onChange(userInput);

    // Filter suggestions based on user input
    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center border rounded-lg p-3">
        <span className="mr-2">{icon}</span>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />
      </div>
      {showSuggestions && value && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}