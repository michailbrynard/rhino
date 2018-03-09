import { callApi } from '../utils'

export const GET_WALLET_DATA = "GET_WALLET_DATA"
export const GET_WALLET_DATA_SUCCESS = "GET_WALLET_DATA_SUCCESS"
export const GET_WALLET_DATA_ERROR = "GET_WALLET_DATA_ERROR"

export const getWalletData = (company, reward_type) => {
	return dispatch => {
		const token = localStorage.getItem('token')
		dispatch({ type: GET_WALLET_DATA })
		getBalanceData(token)
		.then(r => {
			getTransactionData(token)
				.then(tr => {
					dispatch({
						type: GET_WALLET_DATA_SUCCESS,
						data: {
							balance: r.data && r.data.results && r.data.results[0] && r.data.results[0].currencies && r.data.results[0].currencies[0] ? r.data.results[0].currencies[0] : 0,
							transactions: tr && tr.data && tr.data.results ? tr.data.results : []
						}
					})
				})
		})
		.catch(err => {
			dispatch({ type: GET_WALLET_DATA_ERROR })
		})
	}
}

const getBalanceData = (token) => {
	const route = process.env.REACT_APP_REHIVE_API_URL + '/accounts/'
	return callApi('GET', route, token)
		
}

const getTransactionData = (token) => {
	const route = process.env.REACT_APP_REHIVE_API_URL + '/transactions/'
	return callApi('GET', route, token)
}