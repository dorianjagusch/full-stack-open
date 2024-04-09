import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY
const weatherURL = "http://api.openweathermap.org/data/2.5/weather"


const getCurrentWeather = (country) => {
	console.log(api_key)
	const request = axios({
		method: "get",
		url: weatherURL,
		params: {
			lat: country.latlng[0],
			lon: country.latlng[1],
			appid: api_key,
			units: "metric"
		}
	})
	return request.then(response => {
		console.log("Weather Data", response.data)
		return response.data
	}
)


}

export default { getCurrentWeather }