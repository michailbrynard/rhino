import {
	LOGIN_ERROR,
	LOGIN_SUCCESS,
	LOGIN,
	LOGOUT
} from '../actions'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
	switch (action.type) {
		case LOGIN:
			return merge({}, {
				loading: true
			})
		case LOGIN_SUCCESS:
			// NOTE: Storing token in localStorage for now
			localStorage.setItem('token', action.data.token)
			localStorage.setItem('user', JSON.stringify(action.data.user))
			window.location.reload()
			return merge({}, {
				loading: false
			})
		case LOGIN_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		case LOGOUT:
			localStorage.removeItem('token')
			localStorage.removeItem('user')
			window.location = '/'
			return merge({}, {
				loading: false
			})
		default:
			return state
	}
}