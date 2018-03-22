export const callApi = (method, route, token, data) => {

	let headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
	console.log("ROUTE COMING IN", route.search('accounts/'));
	
	if (token) { 
		if (route.search('accounts/') > -1 || route.search('transactions/') > -1) {
			headers['Authorization'] = `Token ${token}`
		} else {
			headers['Authorization'] = `Bearer ${token}`
		}
	}

	let config = {
		// credentials: 'include',
		method,
		mode: 'cors',
		headers
	}

	if (data) { config['body'] = JSON.stringify(data) }

	return Promise.resolve(
		fetch(route, config)
		.then(response => response.json())
		.catch(err => err)
	)
}