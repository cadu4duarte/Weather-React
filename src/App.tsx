import { useEffect, useState } from 'react';
import './App.css';
import {v4 as uuid} from "uuid";
import {
  FaSpinner,
    FaTemperatureHigh as ThermometerIcon, 
    FaWind as WindIcon
} from "react-icons/fa";

interface Weather {
  temperature: string,
  wind: string,
  description: string,
  forecast: {
    day: number,
    temperature: string,
    wind: string
  }[]
}

function App() {

  const [searchedCity, setSearchedCity] = useState("São Paulo");
  const [weather, setWeather] = useState<Weather>();
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const translateCurrentWeatherTable = {
    "Partly cloudy": "Parcialmente nublado",
    "Clear": "Tempo limpo",
    "Light snow": "Neve leve",
    "Sunny": "Ensolarado",
    "Rain with thunderstorm": "Chuva com tempestade",
    "Patchy rain possible": "Possibilidade de chuva irregular"
  }

  

  function handleSubmit(event: any) {
    event.preventDefault();
    // getCityWeather();
    setCity(searchedCity);
    console.log(searchedCity)

  }

  useEffect(() => {
    async function getCityWeather() {
      setIsLoading(true);

      try {
        const response = await fetch(`https://goweather.herokuapp.com/weather/${searchedCity}`)
        const data = await response.json();
        setWeather(data);
        console.log(data);
        
      } catch (error) {
        alert("API error")
      } finally {
        setIsLoading(false);
      }
      
    }

    getCityWeather()
  }, [city]);


  return (
    <div>
      <form action="" onSubmit={handleSubmit}>

        <input 
          type="text" 
          placeholder="Ex: São Paulo"
          value={searchedCity}
          onChange={(event: any) => setSearchedCity(event.target.value)}
          />
        <button type="submit">
          {
            isLoading ? <FaSpinner className="loading"/>
            : <span>Pesquisar cidade</span>
          }
          
        </button>
      </form>

      {city && (
        <>
          <h1>{city}</h1>
          <h2>Tempo atual</h2>
          <p>{weather?.temperature}</p>
          <p>
            {
              translateCurrentWeatherTable[weather?.description]
              ? translateCurrentWeatherTable[weather?.description]
              : weather?.description
            }
          </p>

          <h2>Previsão</h2>
          <ul>
            {weather?.forecast.map((dayForecast, index) => {
              return(
                <li key={uuid()}>
                  <h3>
                    {index == 0 ? "Amanhã" 
                      : Intl.DateTimeFormat("pt-br", {weekday: "long"})
                      .format(new Date()
                      .setDate(new Date()
                      .getDate() + index + 1))
                    }
                  </h3>
                  <div>
                    <ThermometerIcon/>
                    <p>{dayForecast.temperature}</p>
                  </div>

                  <div>
                    <WindIcon/>
                    <p>{dayForecast.wind}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}
      
    </div>
  )
}

export default App
