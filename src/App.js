import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null); // To handle errors
  const [weatherCondition, setWeatherCondition] = useState('default');



  const handleSearch = async () => {
    try {
      const apiKey = "5ec1c71aff565d8934bfd7b84a68728b"; // Replace with your actual API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`
      );
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error("City not found or invalid API key");
      }
  
      const data = await response.json();
      const temperature = data.main.temp;
      console.log(temperature)
      var condition = null;
      if (temperature<20) {
        condition = 'winter';

      }
      else if (temperature<30) {
        condition = 'medium';
        console.log("medium");

      }
      else  {
        condition = 'sunny';
        console.log("sunny");

      }


      
       
      setWeatherCondition(condition);

      console.log(data); // Log data to help with debugging
      setWeather(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors
      setError(error.message);
      setWeather(null);
      setWeatherCondition('default');
    }
  };





  // Function to fetch weather based on user's current location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {

          const apiKey = "5ec1c71aff565d8934bfd7b84a68728b"; // Replace with your actual API key

          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`
          );
          if (!response.ok) {
            throw new Error("Unable to fetch weather for your current location.");
          }
          const data = await response.json();

          const temperature = data.main.temp;
          console.log(temperature)
          var condition = null;
          if (temperature<20) {
            condition = 'winter';

          }
          else if (temperature<30) {
            condition = 'medium';
            console.log("medium");

          }
          else  {
            condition = 'sunny';
            console.log("sunny");

          }


          
          
          setWeatherCondition(condition);



          setWeather(data);
          setError(null);

         
        } catch (error) {
          setError(error.message);
          setWeather(null);
          setWeatherCondition('default');
        }
      }, (error) => {
        setError("Unable to retrieve your location. Please allow location access.");
      });
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };





  

  return (
    <div className={`App ${weatherCondition}`}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Get Weather</button>
      <button onClick={handleCurrentLocation}>Get Current Location Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div className="weater-info">
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
