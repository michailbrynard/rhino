import { callApi } from '../utils'

export const CREATE_DEBIT = "CREATE_DEBIT"
export const CREATE_DEBIT_SUCCESS = "CREATE_DEBIT_SUCCESS"
export const CREATE_DEBIT_ERROR = "CREATE_DEBIT_ERROR"

export const createDebit = (currency, amount) => (
	dispatch => {
		dispatch({ type: CREATE_DEBIT })
		const route = process.env.REACT_APP_REHIVE_API_URL + '/transactions/debit/'
		const token = localStorage.getItem('token')
		callApi('POST', route, token, { currency, amount })
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: CREATE_DEBIT_SUCCESS, data: json.data })
				} else {
					dispatch({ type: CREATE_DEBIT_ERROR, err: json.message })
				}
			})
			.catch(err => {
				dispatch({ type: CREATE_DEBIT_ERROR })
			})
	}
)