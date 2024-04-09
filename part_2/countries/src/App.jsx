import { useState, useEffect } from 'react'
import countryService from './services/countryService'
import weatherService from './services/weatherService'
import DisplayCountries from './components/displayCountries'
import DisplayWeather from './components/displayWeather'
import './index.css'


function App() {
  const [countryFilter, setCountryFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weatherOfInterest, setWeatherOfInterest] = useState(null)


  useEffect(() => getAllCountries(), [])
  useEffect(() => {
    getCountryInfo()
    console.log(filteredCountries)
    if (filteredCountries.length == 1)
      getWeatherInfo(filteredCountries[0])
    else {
      setWeatherOfInterest([])
    }
  }, [countryFilter])

  const handleNewFilter = (event) => {
    setCountryFilter(event.target.value)
  }

  const toggleShow = (index) => {
    setSingleCountry(filteredCountries[index])
  }

  const getAllCountries = () => {
    countryService
    .getAll()
    .then((countries) => {
        setCountries(countries)
      }
    )
    .catch((error) => {
      console.log(error)
    })
  }

  const getCountryInfo = () => {
    const CountryList = countries.filter(
      (country) => {
        return (
          country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
        )
    })

    if (CountryList.length != 1){
      setFilteredCountries(CountryList)
      return
    }

    setSingleCountry(CountryList[0])
  }

  const getWeatherInfo = (country) => {
    weatherService.getCurrentWeather(country)
    .then((data) => {
      const weather = {
          temp: data.main.temp,
          windSpeed: data.wind.speed,
          icon: data.weather[0].icon
      }
      setWeatherOfInterest(weather)
    })
    .catch(() => {
      console.log("Error when retrieving weather info")
      setWeatherOfInterest(null)
    })
  }

  const setSingleCountry = (country) => (
    countryService.getCountry(country.name.common)
    .then((returnedCountry) => {
      setFilteredCountries([returnedCountry])
      getWeatherInfo(returnedCountry)
    })
    .catch(() => {
      setFilteredCountries([])
    })
  )

  return (
    <>
      <label htmlFor="country-input">Find countries</ label>
      <input id="country-input"
          placeholder="Enter a country name"
          onChange={handleNewFilter}
          value={countryFilter}
      />
      <DisplayCountries countries={filteredCountries} onClick={toggleShow}/>
      <DisplayWeather weather={weatherOfInterest} country={filteredCountries} />
    </>
  )
}

export default App
