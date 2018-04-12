import {
	GET_PERK_DATA_ERROR,
	GET_PERK_DATA_SUCCESS,
	GET_PERK_DATA,

	REDEEM_PERK,
	REDEEM_PERK_SUCCESS,
	REDEEM_PERK_ERROR
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

		case REDEEM_PERK:
			return merge({}, state, {
				loadingRedeem: true
			})
		case REDEEM_PERK_ERROR:
			return merge({}, state, {
				loadingRedeem: false,
				redeemErr: action.err
			})
		case REDEEM_PERK_SUCCESS:
			return merge({}, state, {
				data: action.data,
				loadingRedeem: false
			})
		default:
			return state
	}
}