import { callApi } from '../utils'

export const GET_PERK_DATA = "GET_PERK_DATA"
export const GET_PERK_DATA_SUCCESS = "GET_PERK_DATA_SUCCESS"
export const GET_PERK_DATA_ERROR = "GET_PERK_DATA_ERROR"

export const getPerkData = (company) => {
	return dispatch => {
		const token = localStorage.getItem('token')
		dispatch({ type: GET_PERK_DATA })
		const route = process.env.REACT_APP_API_URL + '/user/perk/' + company + '/'
		return callApi('GET', route, token)
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