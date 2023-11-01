import React, { useState, useEffect } from "react";
import "../styles/country.css";
import { callAPI } from "../domain/api";
import { Link } from "react-router-dom";
import SearchIcon from "/./search.svg";
import SearchDark from "/./searchDark.svg";

function Country({ isDarkMode }) {
  const [country, setCountry] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("default");
  const [searchText, setSearchText] = useState("");
  const [favorites, setFavorites] = useState([]);

  const filter = (value) => {
    setSelectedRegion(value);
  };
  const addToFavorites = (countryName) => {
    const selectedCountry = country.find((c) => c.name.common === countryName);
    if (selectedCountry) {
      if (!favorites.find((fav) => fav.name.common === selectedCountry.name.common)) {
        setFavorites((prevFavorites) => [...prevFavorites, selectedCountry]);
      }
    }
  };

  const removeFromFavorites = (countryName) => {
    const updatedFavorites = favorites.filter((fav) => fav.name.common !== countryName);
    setFavorites(updatedFavorites);
  };
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        let endpoint = "/all";
        if (selectedRegion !== "default") {
          endpoint = `/region/${selectedRegion}`;
        }

        const data = await callAPI({
          endpoint,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCountry(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountry();
  }, [selectedRegion]);

  var searchIconn = {
    backgroundImage: `url(${isDarkMode ? SearchDark : SearchIcon})`,
  };

  return (
    <div className={`country ${isDarkMode ? "darkCountry" : ""}`}>
      <div className="header">
        <div className="searchContainer ">
          <input type="text" style={searchIconn} name="search" id="search" placeholder="Search for a country..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <div className="filterContainer">
          <select id="filter" onChange={(e) => filter(e.target.value)} value={selectedRegion}>
            <option value="default">Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </div>
      <div className="favorites">
        <h1>Favorites</h1>
        <div className="favCont">
          {favorites.map((fav, index) => (
            <div className="cardFav" key={index}>
              <Link className="link" to={`/detailCountry/${fav.name.common}`}>
                <div className="flag">
                  <img src={fav.flags.png} alt="flag" />
                </div>
                <div className="bodyCard">
                  <h1>{fav?.name?.common}</h1>
                  <p>
                    <span>Population: </span>
                    {fav?.population}
                  </p>
                  <p>
                    <span>Region: </span>
                    {fav?.region}
                  </p>
                  <p>
                    <span>Capital: </span>
                    {fav?.capital}
                  </p>
                </div>
              </Link>
              {favorites.find((fav) => fav.name.common === fav.name.common) && (
                <button className="removeFav" onClick={() => removeFromFavorites(fav.name.common)}>
                  Remove from Favorite
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <h1>Countries</h1>
      <div className="content">
        {country
          .filter((c) => c.name.common.toLowerCase().includes(searchText.toLowerCase()))
          .map((c, index) => (
            <div className="card">
              <Link className="link" to={`/detailCountry/${c.name.common}`}>
                <div className="flag">
                  <img src={c.flags.png} alt="flag" />
                </div>
                <div className="bodyCard">
                  <h1>{c?.name?.common}</h1>
                  <p>
                    <span>Population: </span>
                    {c?.population}
                  </p>
                  <p>
                    <span>Region: </span>
                    {c?.region}
                  </p>
                  <p>
                    <span>Capital: </span>
                    {c?.capital}
                  </p>
                </div>
              </Link>
              <button className="addFav" onClick={() => addToFavorites(c.name.common)}>
                Add to Favorite
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Country;
