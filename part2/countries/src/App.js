import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  
  useEffect(() => {
      axios.get('https://restcountries.com/v3.1/all').then(response => {
        setCountries(response.data)})
    }, []
  )

  const handleCountryChange = (event) => setFilterCountry(event.target.value)
  const showCountry = (event) => setFilterCountry(event.target.value)

  const countriesToShow = (filterCountry === '')
  ? countries
  : countries.filter(country => country.name.common.toLowerCase().includes(filterCountry.toLowerCase()))

  return (
    <div>
      <div>
        filter show with <input  value={filterCountry}
        onChange={handleCountryChange}/>
      </div>
      <Countries countriesToShow={countriesToShow} showCountry={showCountry} />
    </div>
    )

}

export default App