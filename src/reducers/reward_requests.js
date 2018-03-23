import {
	GET_REWARD_REQUESTS_ERROR,
	GET_REWARD_REQUESTS_SUCCESS,
	GET_REWARD_REQUESTS,

	APPROVE_REWARD,
	APPROVE_REWARD_ERROR,
	APPROVE_REWARD_SUCCESS
} from '../actions/reward_requests'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
	switch (action.type) {
		case GET_REWARD_REQUESTS:
		case APPROVE_REWARD:
			return merge({}, {
				loading: true
			})
		case GET_REWARD_REQUESTS_SUCCESS:
			return merge({}, {
				data: action.data,
				loading: false
			})
		case GET_REWARD_REQUESTS_ERROR:
		case APPROVE_REWARD_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		case APPROVE_REWARD_SUCCESS:
			window.location.reload()
			return merge({}, state, {
				loading: false
			})
		default:
			return state
	}
}