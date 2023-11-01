import React, { useState, useEffect } from "react";
import "../styles/detail.css";
import { Link } from "react-router-dom";
import { callAPI } from "../domain/api";
import { useParams } from "react-router-dom";

function Detail({ isDarkMode }) {
  const { name } = useParams();
  const [countryDisplay, setCountryDisplay] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await callAPI({
          endpoint: `/name/${name}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCountryDisplay(data);
        const borders = data[0]?.borders;
        if (borders && borders.length > 0) {
          const borderCountryData = await Promise.all(
            borders.map((border) => {
              return callAPI({
                endpoint: `/alpha/${border}`,
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
            })
          );
          setBorderCountries(borderCountryData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountry();
  }, [name]);

  return (
    <div className={`detailCountry ${isDarkMode ? "darkDetailCountry" : ""}`}>
      <div className="header">
        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
      {countryDisplay.map((c) => (
        <div className="content">
          <div className="flag">
            <img src={c.flags.png} alt="icon" />
          </div>
          <div className="descContainer">
            <div className="nameCountry">
              <h1>{c?.name?.common}</h1>
            </div>
            <div className="desc">
              <div className="desc1">
                <p>
                  <span>Native Name: </span>
                  {c.translations.ces.common}
                </p>
                <p>
                  <span>Population: </span> {c?.population.toLocaleString()}
                </p>
                <p>
                  <span>Region: </span> {c?.region}
                </p>
                <p>
                  <span>Sub Region: </span> {c?.subregion}
                </p>
                <p>
                  <span>Capital: </span> {c?.capital}
                </p>
              </div>
              <div className="desc2">
                <p>
                  <span>Top Level Domain: </span> {c?.tld}
                </p>
                <p>
                  <span>Currencies: </span>
                  {c?.currencies &&
                    Object.keys(c.currencies)
                      .map((currencyCode) => {
                        const currency = c.currencies[currencyCode];
                        return `${currency.name}`;
                      })
                      .join(", ")}
                </p>
                <p>
                  <span>Languages: </span> {c?.languages && Object.values(c.languages).join(", ")}
                </p>
              </div>
            </div>
            <div className="borderCountries">
              <div className="title">
                <p>Border Countries: </p>
              </div>
              <div className="cardContainer">
                {borderCountries.map((border, index) => (
                  <div className="cardBorder" key={index}>
                    <p>{border[0]?.name?.common}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Detail;
