import {
	ADD_PERK_DATA_ERROR,
	ADD_PERK_DATA_SUCCESS,
	ADD_PERK_DATA,

	ADD_REWARD_DATA_ERROR,
	ADD_REWARD_DATA_SUCCESS,
	ADD_REWARD_DATA,

	DELETE_PERK_DATA,
	DELETE_PERK_DATA_SUCCESS,
	DELETE_PERK_DATA_ERROR,

	DELETE_REWARD_DATA,
	DELETE_REWARD_DATA_SUCCESS,
	DELETE_REWARD_DATA_ERROR
} from '../actions/admin'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
	switch (action.type) {
		case ADD_PERK_DATA:
		case ADD_REWARD_DATA:
		case DELETE_PERK_DATA:
		case DELETE_REWARD_DATA:
			return merge({}, {
				loading: true
			})
		case ADD_PERK_DATA_SUCCESS:
		case ADD_REWARD_DATA_SUCCESS:
		case DELETE_PERK_DATA_SUCCESS:
		case DELETE_REWARD_DATA_SUCCESS:
			return merge({}, {
				loading: false,
				data: action.data
			})
		case ADD_PERK_DATA_ERROR:
		case ADD_REWARD_DATA_ERROR:
		case DELETE_PERK_DATA_ERROR:
		case DELETE_REWARD_DATA_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		default:
			return state
	}
}