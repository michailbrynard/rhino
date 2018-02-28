import { combineReducers } from 'redux'
import home from './home'
import signup from './signup'
import login from './login'

export default combineReducers({
	home,
	signup,
	login
})