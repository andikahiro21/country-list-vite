import React, { useState } from "react";
import "../styles/nav.css";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

function Navbar({ handleDarkModeChange }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    handleDarkModeChange(newDarkMode);
  };
  return (
    <div className={`nav ${isDarkMode ? "darkNav" : ""}`}>
      <div className="logo">
        <h1>Where in the world?</h1>
      </div>
      <div className="darkButtonContainer" onClick={toggleDarkMode}>
        <DarkModeOutlinedIcon />
        <h1>Dark Mode</h1>
      </div>
    </div>
  );
}

export default Navbar;
