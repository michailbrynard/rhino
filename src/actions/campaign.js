import { callApi } from '../utils'

export const GET_CAMPAIGN_DATA = "GET_CAMPAIGN_DATA"
export const GET_CAMPAIGN_DATA_SUCCESS = "GET_CAMPAIGN_DATA_SUCCESS"
export const GET_CAMPAIGN_DATA_ERROR = "GET_CAMPAIGN_DATA_ERROR"

export const getCampaignData = (company) => {
	return dispatch => {
		const token = localStorage.getItem('token')
		dispatch({ type: GET_CAMPAIGN_DATA })
		const route = process.env.REACT_APP_API_URL + '/user/campaign/' + company
		return callApi('GET', route, token)
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


export const CLAIM_REWARD_REQ = "CLAIM_REWARD_REQ"
export const CLAIM_REWARD_REQ_SUCCESS = "CLAIM_REWARD_REQ_SUCCESS"
export const CLAIM_REWARD_REQ_ERROR = "CLAIM_REWARD_REQ_ERROR"

export const postClaimReward = (data) => (
	dispatch => {
		dispatch({ type: CLAIM_REWARD_REQ })
		const route = process.env.REACT_APP_API_URL + '/user/campaign/reward/request/'
		const token = localStorage.getItem('token')

		callApi('POST', route, token, data)
			.then(json => {
				if (json.status === 'success') {
					window.location.reload()
					dispatch({ type: CLAIM_REWARD_REQ_SUCCESS, data: json.data })
				} else {
					dispatch({ type: CLAIM_REWARD_REQ_ERROR, err: json.message })
				}
			})
			.catch(err => {
				dispatch({ type: CLAIM_REWARD_REQ_ERROR })
			})

	}
)