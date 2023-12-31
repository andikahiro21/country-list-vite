import React, { useState, useEffect } from "react";
import Navbar from "./pages/nav";
import Country from "./pages/country";
import "./styles/country.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeChange = (newDarkMode) => {
    setIsDarkMode(newDarkMode);
  };

  return (
    <div className={`container ${isDarkMode ? "darkContainer" : ""}`}>
      <Navbar isDarkMode={isDarkMode} handleDarkModeChange={handleDarkModeChange} />
      <Country isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
