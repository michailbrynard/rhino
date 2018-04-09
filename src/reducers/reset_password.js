import {
	RESET_PASSWORD_ERROR,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD
} from '../actions/auth'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
	switch (action.type) {
		case RESET_PASSWORD:
			return merge({}, {
				loading: true
			})
		case RESET_PASSWORD_SUCCESS:
			return merge({}, {
				data: action.data,
				loading: false
			})
		case RESET_PASSWORD_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		default:
			return state
	}
}