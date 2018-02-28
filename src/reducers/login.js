import {
	LOGIN_ERROR,
	LOGIN_SUCCESS,
	LOGIN
} from '../actions'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
	switch (action.type) {
		case LOGIN:
			return merge({}, {
				loading: true
			})
		case LOGIN_SUCCESS:
			// TODO: store data from login success and redirect to dashboard. Also, protect routes in App.js
			return merge({}, {
				data: action.data,
				loading: false
			})
		case LOGIN_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		default:
			return state
	}
}