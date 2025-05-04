import { useEffect, useState } from "react";
import weatherService from "../weatherService";

import WEATHER_CODES from "../weather_codes.json";

export const CountryDetail = ({ name, capital, area, languages, flag, flagAlt, latitude, longitude }) => {

  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);

  const weatherCodeObj = WEATHER_CODES[weatherCode]?.day;

  useEffect(() => {
    weatherService.get(latitude, longitude).then((result) => {
      setTemperature(result.current.temperature_2m)
      setWind(result.current.wind_speed_10m);
      setWeatherCode(result.current.weather_code);
    });
  }, [latitude, longitude]);

  return (
    <>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.keys(languages).map((iso) => {
          return <li key={iso}>{languages[iso]}</li>
        })}
      </ul>
      <img src={flag} alt={flagAlt} width={320} />
      <h2>Weather</h2>
      <ul>
        <li>Temperature: {temperature}º</li>
        <li>Wind: {wind}km/h</li>
        {weatherCodeObj && (
          <li>
            <img
              style={{ background: "lightgray", borderRadius: "999px" }}
              src={weatherCodeObj.image}
              alt={weatherCodeObj.description}
            />
          </li>
        )}
      </ul>
    </>
  );
}