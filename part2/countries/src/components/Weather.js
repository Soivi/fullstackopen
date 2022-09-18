import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const [weatherData, setWeatherData] = useState([])

    useEffect(() => {
      axios
        .get('https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + capital + '&APPID=' + process.env.REACT_APP_API_KEY)
        .then(response => {
          setWeatherData(response.data)
        })
      }, [])

    return (<div>
          <h2>Weather in {capital}</h2>
            {weatherData.length !== 0 ? (
              <div>
                <p>temperature {weatherData.main.temp} Celcius</p>
                <img src={"https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"}></img>
                <p>wind {weatherData.wind.speed} m/s</p>
              </div>
            ) : <p>No weather information</p>}
          </div>
    )
  }

  export default Weather