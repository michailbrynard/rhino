import { combineReducers } from 'redux'
import home from './home'
import signup from './signup'
import login from './login'
import campaign from './campaign'

export default combineReducers({
	home,
	signup,
	login,
	campaign
})