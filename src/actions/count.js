import { callApi } from '../utils'

export const GET_SIGNUP_COUNT_DATA = "GET_SIGNUP_COUNT_DATA"
export const GET_SIGNUP_COUNT_DATA_SUCCESS = "GET_SIGNUP_COUNT_DATA_SUCCESS"
export const GET_SIGNUP_COUNT_DATA_ERROR = "GET_SIGNUP_COUNT_DATA_ERROR"

export const getSignupCountData = (company) => {
	return dispatch => {
		dispatch({ type: GET_SIGNUP_COUNT_DATA })
		const route = process.env.REACT_APP_API_URL + '/user/count/' + company + '/signup'
		callApi('GET', route)
			.then(response => response.json())
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: GET_SIGNUP_COUNT_DATA_SUCCESS, data: json.data })
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