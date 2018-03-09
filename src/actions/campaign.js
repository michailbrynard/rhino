import { callApi } from '../utils'

export const GET_CAMPAIGN_DATA = "GET_CAMPAIGN_DATA"
export const GET_CAMPAIGN_DATA_SUCCESS = "GET_CAMPAIGN_DATA_SUCCESS"
export const GET_CAMPAIGN_DATA_ERROR = "GET_CAMPAIGN_DATA_ERROR"

export const getCampaignData = (company) => {
	return dispatch => {
		dispatch({ type: GET_CAMPAIGN_DATA })
		const route = process.env.REACT_APP_API_URL + '/user/campaign/' + company
		return callApi('GET', route)
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