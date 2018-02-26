import {
	GET_DATA_ERROR,
  GET_DATA_SUCCESS,
  GET_DATA
} from '../actions'

import { merge } from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
		case GET_DATA:
      return merge({}, {
        loading: true
      })
    case GET_DATA_SUCCESS:
      return merge({}, {
        room: action.data
      })
    case GET_DATA_ERROR:
      return merge({}, state, {
        err: action.err
      })
    default:
      return state
  }
}