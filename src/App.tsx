import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [searchedCity, setSearchedCity] = useState("São Paulo");
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  

  function handleSubmit(event: any) {
    event.preventDefault();
    // getCityWeather();
    setCity(searchedCity);

  }

  useEffect(() => {
    async function getCityWeather() {
      const response = await fetch(`https://goweather.herokuapp.com/weather/${searchedCity}`)
      const data = await response.json();
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
          {}
        </>
      )}
      
    </div>
  )
}

export default App
