import {
	GET_REWARD_COUNT_DATA_ERROR,
	GET_REWARD_COUNT_DATA_SUCCESS,
	GET_REWARD_COUNT_DATA
} from '../actions'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
	switch (action.type) {
		case GET_REWARD_COUNT_DATA:
			return merge({}, {
				loading: true
			})
		case GET_REWARD_COUNT_DATA_SUCCESS:
			return merge({}, {
				data: action.data,
				loading: false
			})
		case GET_REWARD_COUNT_DATA_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		default:
			return state
	}
}