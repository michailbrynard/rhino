import {
	SIGNUP_ERROR,
	SIGNUP_SUCCESS,
	SIGNUP
} from '../actions/auth'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
	switch (action.type) {
		case SIGNUP:
			return merge({}, {
				loading: true
			})
		case SIGNUP_SUCCESS:
			return merge({}, {
				data: action.data,
				loading: false
			})
		case SIGNUP_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		default:
			return state
	}
}