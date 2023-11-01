import React, { useState, useEffect } from "react";
import Navbar from "./pages/nav";
import Detail from "./pages/detail";
function DetailCountry() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeChange = (newDarkMode) => {
    setIsDarkMode(newDarkMode);
  };
  return (
    <div className={`container ${isDarkMode ? "darkContainer" : ""}`}>
      <Navbar isDarkMode={isDarkMode} handleDarkModeChange={handleDarkModeChange} />
      <Detail isDarkMode={isDarkMode} />
    </div>
  );
}

export default DetailCountry;
