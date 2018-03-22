import {
	GET_REWARD_REQUESTS_ERROR,
	GET_REWARD_REQUESTS_SUCCESS,
	GET_REWARD_REQUESTS
} from '../actions/reward_requests'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
	switch (action.type) {
		case GET_REWARD_REQUESTS:
			return merge({}, {
				loading: true
			})
		case GET_REWARD_REQUESTS_SUCCESS:
			return merge({}, {
				data: action.data,
				loading: false
			})
		case GET_REWARD_REQUESTS_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		default:
			return state
	}
}