import {
	GET_WALLET_DATA_ERROR,
	GET_WALLET_DATA_SUCCESS,
	GET_WALLET_DATA
} from '../actions'

import { merge } from 'lodash'

export default (state = { loading: false, data: [], err: null }, action) => {
	switch (action.type) {
		case GET_WALLET_DATA:
			return merge({}, {
				loading: true
			})
		case GET_WALLET_DATA_SUCCESS:
			return merge({}, {
				data: action.data,
				loading: false
			})
		case GET_WALLET_DATA_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		default:
			return state
	}
}