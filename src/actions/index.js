export const SIGNUP = "SIGNUP"
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const SIGNUP_ERROR = "SIGNUP_ERROR"

export const signup = (signup_email) => (
	dispatch => {
		dispatch({ type: SIGNUP })
		fetch(process.env.REACT_APP_API_URL + '/user/join/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			mode: 'cors',
			body: JSON.stringify({ signup_email, company: 'launcher_test', referral_id: "1234" })
		})
		.then(response => {
			return response.json()
		})
		.then(json => {
			if(json.status === 'success') {
					dispatch({ type: SIGNUP_SUCCESS, data: json.data })
			} else {
				dispatch({ type: SIGNUP_ERROR, err: json.message })
			}
		})
		.catch(err => {
			dispatch({ type: SIGNUP_ERROR })
		})
	}
)

export const SET_PASSWORD = "SET_PASSWORD"
export const SET_PASSWORD_SUCCESS = "SET_PASSWORD_SUCCESS"
export const SET_PASSWORD_ERROR = "SET_PASSWORD_ERROR"

export const setPassword = (new_password1, new_password2, uid, token) => (
	dispatch => {
		dispatch({ type: SET_PASSWORD })
		fetch(process.env.REACT_APP_REHIVE_API_URL + '/auth/password/reset/confirm/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			mode: 'cors',
			body: JSON.stringify({ new_password1, new_password2, uid, token })
		})
			.then(response => {
				return response.json()
			})
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: SET_PASSWORD_SUCCESS, data: json.status })
				} else {
					dispatch({ type: SET_PASSWORD_ERROR, err: json.message })
				}
			})
			.catch(err => {
				dispatch({ type: SET_PASSWORD_ERROR })
			})
	}
)

export const LOGIN = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"

export const login = (user, password) => (
	dispatch => {
		dispatch({ type: LOGIN })

		fetch(process.env.REACT_APP_REHIVE_API_URL + '/auth/login/', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user, password, company: 'launcher_test' })
		})
			.then(response => {
				return response.json()
			})
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: SIGNUP_SUCCESS, data: json.data })
				} else {
					dispatch({ type: LOGIN_ERROR, err: json.message })
				}
			})
			.catch(err => {
				dispatch({ type: LOGIN_ERROR })
			})
	}
)

export const LOGOUT = "LOGOUT"

export const logout = () => (
	dispatch => {
		dispatch({ type: LOGOUT })
	}
)

export const GET_CAMPAIGN_DATA = "GET_CAMPAIGN_DATA"
export const GET_CAMPAIGN_DATA_SUCCESS = "GET_CAMPAIGN_DATA_SUCCESS"
export const GET_CAMPAIGN_DATA_ERROR = "GET_CAMPAIGN_DATA_ERROR"

export const getCampaignData = (company) => {
	return dispatch => {
		const token = localStorage.getItem('token')
		dispatch({ type: GET_CAMPAIGN_DATA })
		fetch(process.env.REACT_APP_API_URL + '/user/campaign/' + company, {
		  // credentials: 'include',
		  mode: 'cors',
		  headers: {
		    'Accept': 'application/json',
				'Content-Type': 'application/json',
				'authorization': `Bearer ${token}`
		  }
		})
		.then(response => response.json())
		.then(json => {
			if (json.status === 'success') {
				dispatch({ type: GET_CAMPAIGN_DATA_SUCCESS, data: json.data.results })
			} else {
				dispatch({ type: GET_CAMPAIGN_DATA_ERROR, err: json.message })
			}
		})
		.catch(err => {
			dispatch({ type: GET_CAMPAIGN_DATA_ERROR, err })
		})
	}
}

export const GET_PERK_DATA = "GET_PERK_DATA"
export const GET_PERK_DATA_SUCCESS = "GET_PERK_DATA_SUCCESS"
export const GET_PERK_DATA_ERROR = "GET_PERK_DATA_ERROR"

export const getPerkData = (company) => {
	return dispatch => {
		const token = localStorage.getItem('token')
		dispatch({ type: GET_PERK_DATA })
		fetch(process.env.REACT_APP_API_URL + '/user/perk/' + company, {
			// credentials: 'include',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'authorization': `Bearer ${token}`
			}
		})
			.then(response => response.json())
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: GET_PERK_DATA_SUCCESS, data: json.data.results })
				} else {
					dispatch({ type: GET_PERK_DATA_ERROR, err: json.message })
				}
			})
			.catch(err => {
				dispatch({ type: GET_PERK_DATA_ERROR, err })
			})
	}
}

export const GET_SIGNUP_COUNT_DATA = "GET_SIGNUP_COUNT_DATA"
export const GET_SIGNUP_COUNT_DATA_SUCCESS = "GET_SIGNUP_COUNT_DATA_SUCCESS"
export const GET_SIGNUP_COUNT_DATA_ERROR = "GET_SIGNUP_COUNT_DATA_ERROR"

export const getSignupCountData = (company) => {
	return dispatch => {
		// const token = localStorage.getItem('token')
		dispatch({ type: GET_SIGNUP_COUNT_DATA })
		fetch(process.env.REACT_APP_API_URL + '/user/count/' + company + '/signup', {
			// credentials: 'include',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				// 'authorization': `Bearer ${token}`
			}
		})
			.then(response => response.json())
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: GET_SIGNUP_COUNT_DATA_SUCCESS, data: json.data.results })
				} else {
					dispatch({ type: GET_SIGNUP_COUNT_DATA_ERROR, err: json.message })
				}
			})
			.catch(err => {
				console.log("ERR", err);
				dispatch({ type: GET_SIGNUP_COUNT_DATA_ERROR, err: err.toString() })
			})
	}
}

export const GET_REWARD_COUNT_DATA = "GET_REWARD_COUNT_DATA"
export const GET_REWARD_COUNT_DATA_SUCCESS = "GET_REWARD_COUNT_DATA_SUCCESS"
export const GET_REWARD_COUNT_DATA_ERROR = "GET_REWARD_COUNT_DATA_ERROR"

export const getRewardCountData = (company, reward_type) => {
	return dispatch => {
		// const token = localStorage.getItem('token')
		dispatch({ type: GET_REWARD_COUNT_DATA })
		fetch(process.env.REACT_APP_API_URL + '/user/count/' + company + '/' + reward_type, {
			// credentials: 'include',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				// 'authorization': `Bearer ${token}`
			}
		})
			.then(response => response.json())
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: GET_REWARD_COUNT_DATA_SUCCESS, data: json.data.results })
				} else {
					dispatch({ type: GET_REWARD_COUNT_DATA_ERROR, err: json.message })
				}
			})
			.catch(err => {
				dispatch({ type: GET_REWARD_COUNT_DATA_ERROR, err })
			})
	}
}

const checkStellarUsername = (token) => {
	return fetch(process.env.REACT_APP_STELLAR_SERVICE_URL + '/user/account/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'authorization': `Bearer ${token}`
		},
		mode: 'cors'
	})
	.then(response => {
		return response.json()
	})
	.catch(err => {
		return err
	})
}

const setStellarUsername = (signup_email) => (
	fetch(process.env.REACT_APP_STELLAR_SERVICE_URL + '/user/username/set/', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		body: JSON.stringify({ username: signup_email })
	})
	.then(response => {
		return response.json()
	})
	.catch(err => {
		return err
	})
)
