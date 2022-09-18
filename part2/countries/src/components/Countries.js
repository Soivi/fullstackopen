import Weather from "./Weather"

const Countries = ({countriesToShow, showCountry}) => {
    if(countriesToShow.length === 1) {
      return (
        <div>
          <h1>{countriesToShow[0].name.common}</h1>
          <p>capital {countriesToShow[0].capital}</p>
          <p>area {countriesToShow[0].population}</p>
          
          <h3>languages:</h3>
          <ul>
          {Object.entries(countriesToShow[0].languages).map(language => 
          <li key={language[1]}>{language[1]}</li>
          )}</ul>
          <img src={countriesToShow[0].flags.png}></img>
          <Weather capital={countriesToShow[0].capital} />
        </div>
      )
    } else if(countriesToShow.length > 10) {
      return <div>Too many matches</div>
    } else {
      return (
        countriesToShow.map(country =>
          <div key={country.name.common}>{country.name.common}
            <button onClick={showCountry} value={country.name.common}>show</button>
          </div>)
      )
    }
  }

  export default Countries