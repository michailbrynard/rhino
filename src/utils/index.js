export const callApi = (method, route, token, data) => {

	let headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}

	if (token) { headers['Authorization'] = `Token ${token}` }

	let config = {
		// credentials: 'include',
		method,
		mode: 'cors',
		headers
	}

	if (data) { config['body'] = JSON.stringify(data) }

	return fetch(route, config)
}