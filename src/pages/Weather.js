import React, { useState, useEffect } from "react";
import "./Weather.css";

const Weather = () => {

  const [weather,setWeather] = useState(null);
  const [city,setCity] = useState("");
  const [locationName,setLocationName] = useState("Detecting location...");

  // Fetch weather
  const fetchWeather = (lat,lon) => {

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`
    )
      .then(res => res.json())
      .then(data => setWeather(data));

  };

  // Detect location
  useEffect(() => {

    if(navigator.geolocation){

      navigator.geolocation.getCurrentPosition((position)=>{

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLocationName("Your Location");

        fetchWeather(lat,lon);

      });

    }

  },[]);

  // Search city
  const searchCity = () => {

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
      .then(res=>res.json())
      .then(data=>{

        if(data.results && data.results.length>0){

          const lat = data.results[0].latitude;
          const lon = data.results[0].longitude;

          setLocationName(data.results[0].name);

          fetchWeather(lat,lon);

        }

      });

  };

  if(!weather) return <h2>Loading Weather...</h2>;

  // =============================
  // CURRENT CONDITIONS
  // =============================

  const temp = weather.current_weather.temperature;
  const wind = weather.current_weather.windspeed;
  const humidity = weather.hourly.relative_humidity_2m[0];
  const rainChance = weather.hourly.precipitation_probability?.[0] || 0;

  // =============================
  // TOMORROW DATA
  // =============================

  const tomorrowTemp = weather.hourly.temperature_2m[24];
  const tomorrowHumidity = weather.hourly.relative_humidity_2m[24];
  const tomorrowRain = weather.hourly.precipitation_probability?.[24] || 0;
  const tomorrowWind = weather.hourly.wind_speed_10m?.[24] || 0;

  // =============================
  // AGRI CALCULATIONS
  // =============================

  const soilTemp = (temp - 2).toFixed(1);
  const evapotranspiration = (0.0023 * (temp + 17.8)).toFixed(2);

  let irrigationAdvice = "";
  let pestRisk = "";
  let alertsToday = [];
  let alertsTomorrow = [];

  // ---- TODAY ALERTS ----

  if(rainChance > 60){
    alertsToday.push("🌧 Rain likely today. Delay irrigation and pesticide spraying.");
  }

  if(temp < 5){
    alertsToday.push("❄ Frost risk today. Cover sensitive crops.");
  }

  if(temp > 35){
    alertsToday.push("🔥 Heat stress risk today. Increase irrigation.");
  }

  // ---- TOMORROW ALERTS ----

  if(tomorrowRain > 60){
    alertsTomorrow.push("🌧 Rain expected tomorrow. Avoid fertilizer application.");
  }

  if(tomorrowTemp < 5){
    alertsTomorrow.push("❄ Frost expected tomorrow morning. Protect crops.");
  }

  if(tomorrowTemp > 35){
    alertsTomorrow.push("🔥 High heat expected tomorrow. Increase irrigation.");
  }

  if(tomorrowWind > 35){
    alertsTomorrow.push("🌪 Strong winds expected tomorrow. Secure plants and greenhouses.");
  }

  // ---- IRRIGATION ADVICE ----

  if(temp > 32 && humidity < 40){
    irrigationAdvice = "💧 High evaporation today. Irrigate crops.";
  }
  else if(rainChance > 50){
    irrigationAdvice = "🌧 Rain expected. Irrigation not required.";
  }
  else{
    irrigationAdvice = "🌱 Normal irrigation schedule recommended.";
  }

  // ---- PEST RISK ----

  if(temp > 25 && humidity > 70){
    pestRisk = "🐛 High fungal disease risk due to humidity.";
  }
  else{
    pestRisk = "✅ Low pest risk today.";
  }

  return (

    <div className="weather-container">

      <div className="weather-header">

        <h2>Agri Weather Dashboard</h2>

        <div className="city-search">

          <input
            placeholder="Enter city"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
          />

          <button onClick={searchCity}>Search</button>

        </div>

      </div>

      <h3 className="location">{locationName}</h3>

      {/* TODAY ALERTS */}

      <div className="alerts">

        <h3>⚠ Farmer Alerts (Today)</h3>

        {alertsToday.length === 0 ?
        <p>✅ No major alerts today</p> :
        alertsToday.map((a,i)=>(<p key={i}>{a}</p>))
        }

      </div>

      {/* TOMORROW ALERTS */}

      <div className="alerts">

        <h3>📅 Farmer Alerts (Tomorrow)</h3>

        {alertsTomorrow.length === 0 ?
        <p>✅ No major alerts tomorrow</p> :
        alertsTomorrow.map((a,i)=>(<p key={i}>{a}</p>))
        }

      </div>

      <div className="weather-main">

        <div className="current-weather">

          <h3>Current Conditions</h3>

          <h1>{temp}°C</h1>

          <p>Wind: {wind} km/h</p>
          <p>Humidity: {humidity}%</p>
          <p>Rain Chance: {rainChance}%</p>

        </div>

        <div className="forecast">

          <h3>7-Day Forecast</h3>

          <div className="forecast-grid">

            {weather.daily.temperature_2m_max.map((temp,index)=>(

              <div key={index} className="forecast-card">

                <p>Day {index+1}</p>
                <p>{temp}°C</p>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* AGRI INSIGHTS */}

      <div className="agri-metrics">

        <h3>Agricultural Insights</h3>

        <div className="metrics-grid">

          <div className="metric">
            🌡 Soil Temperature: {soilTemp}°C
          </div>

          <div className="metric">
            🌾 Evapotranspiration: {evapotranspiration}
          </div>

          <div className="metric">
            {irrigationAdvice}
          </div>

          <div className="metric">
            {pestRisk}
          </div>

        </div>

      </div>

      {/* HOURLY FORECAST */}

      <div className="hourly">

        <h3>Today's Hourly Forecast</h3>

        <div className="hourly-grid">

          {weather.hourly.temperature_2m.slice(0,8).map((temp,index)=>(

            <div key={index} className="hour-card">

              <p>{index*3}:00</p>
              <p>{temp}°C</p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default Weather;