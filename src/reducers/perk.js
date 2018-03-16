import {
	GET_PERK_DATA_ERROR,
	GET_PERK_DATA_SUCCESS,
	GET_PERK_DATA
} from '../actions/perk'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
	switch (action.type) {
		case GET_PERK_DATA:
			return merge({}, {
				loading: true
			})
		case GET_PERK_DATA_SUCCESS:
			return merge({}, {
				data: action.data,
				loading: false
			})
		case GET_PERK_DATA_ERROR:
			return merge({}, state, {
				err: action.err,
				loading: false
			})
		default:
			return state
	}
}