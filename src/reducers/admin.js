import {
	ADD_PERK_DATA_ERROR,
	ADD_PERK_DATA_SUCCESS,
	ADD_PERK_DATA,
	ADD_REWARD_DATA_ERROR,
	ADD_REWARD_DATA_SUCCESS,
	ADD_REWARD_DATA
} from '../actions/transaction'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
	switch (action.type) {
		case ADD_PERK_DATA:
		case ADD_REWARD_DATA:
			return merge({}, {
				loading: true
			})
		case ADD_PERK_DATA_SUCCESS:
		case ADD_REWARD_DATA_SUCCESS:
			window.location.reload()
			return merge({}, {
				loading: false,
				data: action.data
			})
		case ADD_PERK_DATA_ERROR:
		case ADD_REWARD_DATA_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		default:
			return state
	}
}