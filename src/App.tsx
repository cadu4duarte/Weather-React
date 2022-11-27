import { useEffect, useState } from 'react';
import './App.css';

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

  

  function handleSubmit(event: any) {
    event.preventDefault();
    // getCityWeather();
    setCity(searchedCity);
    console.log(searchedCity)

  }

  useEffect(() => {
    async function getCityWeather() {
      const response = await fetch(`https://goweather.herokuapp.com/weather/${searchedCity}`)
      const data = await response.json();
      setWeather(data);
      console.log(data);
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
        <button type="submit">Pesquisar cidade</button>
      </form>

      {city && (
        <>
          <h1>{city}</h1>
          <h2>Tempo atual</h2>
          <p>{weather?.temperature}</p>
          <p>{weather?.description}</p>

          <h2>Previsão</h2>
          <ul>
            {weather?.forecast.map((dayForecast, index) => {
              return(
                <li>
                  <h3>
                    {index == 0 ? "Amanhã" 
                      : Intl.DateTimeFormat("pt-br", {weekday: "long"})
                      .format(new Date()
                      .setDate(new Date()
                      .getDate() + index + 1))
                    }
                  </h3>
                  <div>
                    <p>{dayForecast.temperature}</p>
                  </div>

                  <div>
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
