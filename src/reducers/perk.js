import {
	GET_PERK_DATA_ERROR,
	GET_PERK_DATA_SUCCESS,
	GET_PERK_DATA,

	CREATE_DEBIT,
	CREATE_DEBIT_SUCCESS,
	CREATE_DEBIT_ERROR
} from '../actions'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
	switch (action.type) {
		case GET_PERK_DATA:
		case CREATE_DEBIT:
			return merge({}, {
				loading: true
			})
		case GET_PERK_DATA_SUCCESS:
			return merge({}, {
				data: action.data,
				loading: false
			})
		case GET_PERK_DATA_ERROR:
		case CREATE_DEBIT_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		case CREATE_DEBIT_SUCCESS:
			return merge({}, {
				debit_data: action.data,
				loading: false
			})
		default:
			return state
	}
}