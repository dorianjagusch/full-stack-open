const DisplayWeather = ({ weather, country }) => {

	if (country.length != 1)
		return <></>
	if (!weather)
		return <p>Could not retrieve weather information. Try again later</p>
	const curCountry = country[0]
	console.log(weather)
	return (
		<div className="weather-info">
			<h2>Weather in {curCountry.capital}</h2>
			<p>Temperature: {weather.temp} Celsius</p>
			<img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
			<p>wind {weather.windSpeed} m/s</p>
		</div>
	)
}

export default DisplayWeather