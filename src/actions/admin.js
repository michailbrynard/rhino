import { callApi } from '../utils'

export const ADD_PERK_DATA = "ADD_PERK_DATA"
export const ADD_PERK_DATA_SUCCESS = "ADD_PERK_DATA_SUCCESS"
export const ADD_PERK_DATA_ERROR = "ADD_PERK_DATA_ERROR"

export const addPerkData = (data, token) => {
	return dispatch => {
		dispatch({ type: ADD_PERK_DATA })
		const route = process.env.REACT_APP_API_URL + '/admin/perk/'
		return callApi('POST', route, token, data)
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: ADD_PERK_DATA_SUCCESS, data: json.data.results })
				} else {
					dispatch({ type: ADD_PERK_DATA_ERROR, err: json.message })
				}
			})
			.catch(err => {
				dispatch({ type: ADD_PERK_DATA_ERROR, err })
			})
	}
}



export const ADD_REWARD_DATA = "ADD_REWARD_DATA"
export const ADD_REWARD_DATA_SUCCESS = "ADD_REWARD_DATA_SUCCESS"
export const ADD_REWARD_DATA_ERROR = "ADD_REWARD_DATA_ERROR"

export const addRewardData = (data, token) => {
	return dispatch => {
		dispatch({ type: ADD_REWARD_DATA })
		const route = process.env.REACT_APP_API_URL + '/admin/campaign/'
		return callApi('POST', route, token, data)
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: ADD_REWARD_DATA_SUCCESS, data: json.data.results })
				} else {
					dispatch({ type: ADD_REWARD_DATA_ERROR, err: json.message })
				}
			})
			.catch(err => {
				dispatch({ type: ADD_REWARD_DATA_ERROR, err })
			})
	}
}