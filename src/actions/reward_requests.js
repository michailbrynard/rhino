import { callApi } from '../utils'

export const GET_REWARD_REQUESTS = "GET_REWARD_REQUESTS"
export const GET_REWARD_REQUESTS_SUCCESS = "GET_REWARD_REQUESTS_SUCCESS"
export const GET_REWARD_REQUESTS_ERROR = "GET_REWARD_REQUESTS_ERROR"

export const getRewardRequests = (company) => {
	return dispatch => {
		const token = localStorage.getItem('token')
		dispatch({ type: GET_REWARD_REQUESTS })
		const route = process.env.REACT_APP_API_URL + '/admin/campaign/reward/' + company + '/'
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

export const APPROVE_REWARD = "APPROVE_REWARD"
export const APPROVE_REWARD_SUCCESS = "APPROVE_REWARD_SUCCESS"
export const APPROVE_REWARD_ERROR = "APPROVE_REWARD_ERROR"

export const approveReward = (data) => {
	return dispatch => {
		dispatch({ type: APPROVE_REWARD })
		const route = process.env.REACT_APP_API_URL + '/admin/campaign/reward/approve/'
		const token = localStorage.getItem('token')
		return callApi('POST', route, token, data)
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: APPROVE_REWARD_SUCCESS, data: json.status })
				} else {
					dispatch({ type: APPROVE_REWARD_ERROR, err: json.message })
				}
			})
			.catch(err => {
				dispatch({ type: APPROVE_REWARD_ERROR, err })
			})
	}
}

export const REJECT_REWARD = "REJECT_REWARD"
export const REJECT_REWARD_SUCCESS = "REJECT_REWARD_SUCCESS"
export const REJECT_REWARD_ERROR = "REJECT_REWARD_ERROR"

export const rejectReward = (data) => {
	return dispatch => {
		dispatch({ type: REJECT_REWARD })
		const route = process.env.REACT_APP_API_URL + '/admin/campaign/reward/reject/'
		const token = localStorage.getItem('token')
		return callApi('POST', route, token, data)
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: REJECT_REWARD_SUCCESS, data: json.status })
				} else {
					dispatch({ type: REJECT_REWARD_ERROR, err: json.message })
				}
			})
			.catch(err => {
				dispatch({ type: REJECT_REWARD_ERROR, err })
			})
	}
}