import axios from 'axios'

const countryAPI = "https://studies.cs.helsinki.fi/restcountries/api"

const getAll = () => {
	const request = axios.get(`${countryAPI}/all`)
	return request.then((response) => response.data)
}


const getCountry = (countryName) => {
	const request = axios.get(`${countryAPI}/name/${countryName}`)
	return request.then((response) => {
		return response.data})
}


export default {
	getAll,
	getCountry
}