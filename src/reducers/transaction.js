import {
	CREATE_SEND_ERROR,
	CREATE_SEND_SUCCESS,
	CREATE_SEND,
	CREATE_DEBIT_ERROR,
	CREATE_DEBIT_SUCCESS,
	CREATE_DEBIT
} from '../actions/transaction'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
	switch (action.type) {
		case CREATE_SEND:
		case CREATE_DEBIT:
			return merge({}, {
				loading: true
			})
		case CREATE_SEND_SUCCESS:
		case CREATE_DEBIT_SUCCESS:
		window.location.reload()
			return merge({}, {
				loading: false,
				data: action.data
			})
		case CREATE_SEND_ERROR:
		case CREATE_DEBIT_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		default:
			return state
	}
}