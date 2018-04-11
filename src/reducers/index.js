import { combineReducers } from 'redux'
import signup from './signup'
import login from './login'
import campaign from './campaign'
import perk from './perk'
import set_password from './set_password'
import signup_count from './signup_count'
import wallet from './wallet'
import transaction from './transaction'
import admin from './admin'
import reward_requests from './reward_requests'
import reset_password from './reset_password'

export default combineReducers({
	signup,
	login,
	campaign,
	perk,
	set_password,
	signup_count,
	wallet,
	transaction,
	admin,
	reward_requests,
	reset_password
})