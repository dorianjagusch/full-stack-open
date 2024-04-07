import axios from 'axios'

const baseURL = "http://localhost:3001/persons"

const getAll = () => {
	const request = axios.get(baseURL)
    return request.then(response => response.data)
	}

const create = (newContact) => {
	const request = axios.post(baseURL, newContact)
	return request.then(response => response.data)
}

const update = (toEditContact) => {
	const request = axios.put(`${baseURL}/${toEditContact.id}`, toEditContact)
	return request.then(response => response.data)
}

const remove = (id) => {
	const request = axios.delete(`${baseURL}/${id}`)
	return request.then(response => response.data)
}

export default {
	getAll,
	create,
	update,
	remove
}