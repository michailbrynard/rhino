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
								dispatch({ type: LOGIN_SUCCESS, data: json.data })
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