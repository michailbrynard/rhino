import { combineReducers } from 'redux'
import signup from './signup'
import login from './login'
import campaign from './campaign'
import perk from './perk'

export default combineReducers({
	signup,
	login,
	campaign,
	perk
})