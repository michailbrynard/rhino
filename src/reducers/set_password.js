import {
	SET_PASSWORD_ERROR,
	SET_PASSWORD_SUCCESS,
	SET_PASSWORD
} from '../actions/auth'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
	switch (action.type) {
		case SET_PASSWORD:
			return merge({}, {
				loading: true
			})
		case SET_PASSWORD_SUCCESS:
			return merge({}, {
				data: action.data,
				loading: false
			})
		case SET_PASSWORD_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		default:
			return state
	}
}