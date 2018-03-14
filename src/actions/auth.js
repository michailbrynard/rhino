import { callApi } from '../utils'

export const SIGNUP = "SIGNUP"
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const SIGNUP_ERROR = "SIGNUP_ERROR"

export const signup = (signup_email) => (
	dispatch => {
		dispatch({ type: SIGNUP })
		const route = process.env.REACT_APP_API_URL + '/user/join/'
		callApi('POST', route, null, { signup_email, company: 'test_company_1', referral_id: "1234" })
		.then(json => {
			if (json.status === 'success') {
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

export const setPassword = (new_password1, new_password2, uid, token, email) => (
	dispatch => {
		dispatch({ type: SET_PASSWORD })

		const route = process.env.REACT_APP_REHIVE_API_URL + '/auth/password/reset/confirm/'
		callApi('POST', route, null, { new_password1, new_password2, uid, token })
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: LOGIN })
					const route = process.env.REACT_APP_REHIVE_API_URL + '/auth/login/'
					callApi('POST', route, null, { user: email, password: new_password1, company: 'test_company_1' })
						.then(json => {
							if (json.status === 'success') {
								checkStellarUsername(json.data.token)
									.then(res => {
										console.log("CHECK STELLAR USERNAME RESULT", res);
										if (!res.username) {
											setStellarUsername(email, json.data.token)
												.then(userSetRes => {
													console.log("SET STELLAR USERNAME RESULT", userSetRes);
													triggerReward({
														data: {
															currency: json.data.user.currency,
															email
														},
														company: "test_company_1",
														event: "user.create"
													})
														.then(triggerRewardRes => {
															console.log("TRIGGER TOKEN REWARD RESULT", triggerRewardRes);
															dispatch({ type: LOGIN_SUCCESS, data: json.data })
														})
												})
										} else {
											dispatch({ type: LOGIN_SUCCESS, data: json.data })
										}
									})
							} else {
								dispatch({ type: LOGIN_ERROR, err: json.message })
							}
						})
						.catch(err => {
							dispatch({ type: LOGIN_ERROR })
						})
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
		const route = process.env.REACT_APP_REHIVE_API_URL + '/auth/login/'
		// TODO: using hardcoded company here
		callApi('POST', route, null, { user, password, company: 'test_company_1' })
			.then(json => {
				if (json.status === 'success') {
						dispatch({ type: LOGIN_SUCCESS, data: json.data })
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

const setStellarUsername = (signup_email, token) => {
	const route = process.env.REACT_APP_STELLAR_SERVICE_URL + '/user/username/set/'
	return callApi('POST', route, token, { username: signup_email })
		.catch(err => {
			return err
		})
}

const checkStellarUsername = (token) => {
	const route = process.env.REACT_APP_STELLAR_SERVICE_URL + '/user/account/'
	return callApi('GET', route, token)
		.catch(err => {
			return err
		})
}

const triggerReward = (data) => {
	const route = process.env.REACT_APP_API_URL + '/admin/webhook/'
	// TODO: Using hardcoded auth secret here. This must be changed/removed
	let headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': 'secret fa3e1a21-e6f2-428f-94ea-3b9b4017c3c2'
	}

	let config = {
		// credentials: 'include',
		method: 'POST',
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