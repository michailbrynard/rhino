import { callApi } from '../utils'

export const GET_REWARD_REQUESTS = "GET_REWARD_REQUESTS"
export const GET_REWARD_REQUESTS_SUCCESS = "GET_REWARD_REQUESTS_SUCCESS"
export const GET_REWARD_REQUESTS_ERROR = "GET_REWARD_REQUESTS_ERROR"

export const getRewardRequests = (company) => {
	return dispatch => {
		const token = localStorage.getItem('token')
		dispatch({ type: GET_REWARD_REQUESTS })
		const route = process.env.REACT_APP_API_URL + '/admin/campaign/reward/' + company
		return callApi('GET', route, token)
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: GET_REWARD_REQUESTS_SUCCESS, data: json.data.results })
				} else {
					dispatch({ type: GET_REWARD_REQUESTS_ERROR, err: json.message })
				}
			})
			.catch(err => {
				dispatch({ type: GET_REWARD_REQUESTS_ERROR, err })
			})
	}
}