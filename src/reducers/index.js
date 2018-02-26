import {
	GET_HOME_DATA_ERROR,
  GET_HOME_DATA_SUCCESS,
  GET_HOME_DATA
} from '../actions'

import { merge } from 'lodash'

export default (state = { loading: false }, action) => {
  switch (action.type) {
		case GET_HOME_DATA:
      return merge({}, {
        loading: true
      })
    case GET_HOME_DATA_SUCCESS:
      return merge({}, {
        home_data: action.data
      })
    case GET_HOME_DATA_ERROR:
      return merge({}, state, {
        err: action.err
      })
    default:
      return state
  }
}