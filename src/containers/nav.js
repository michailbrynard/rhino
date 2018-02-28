import React from 'react'
import { FlatButton } from 'material-ui'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import { blue300, blue800 } from 'material-ui/styles/colors';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions'

const Nav = ({ history, match, logout }) => {
	const user_data = JSON.parse(localStorage.getItem('user'))

	const { path } = match
	return (
		<div>
			<br/>
			<FlatButton onClick={() => logout()} style={{
				float: 'right'
			}} label="Logout"/>
			<Drawer>
				<AppBar showMenuIconButton={false} title={user_data.company} />
				<MenuItem
					style={{
						backgroundColor: path === '/' ? blue300 : null
					}}
					leftIcon={<FontIcon style={{ color: blue800 }} className="material-icons">home</FontIcon>}
					onClick={() => history.push('/')}>Home
			</MenuItem>
				<MenuItem
					style={{
						backgroundColor: path === '/wallet' ? blue300 : null
					}}
					leftIcon={<FontIcon style={{ color: blue800 }} className="material-icons">account_balance_wallet</FontIcon>}
					onClick={() => history.push('/wallet')}>Wallet
			</MenuItem>
				<MenuItem
					style={{
						backgroundColor: path === '/market' ? blue300 : null
					}}
					leftIcon={<FontIcon style={{ color: blue800 }} className="material-icons">shopping_basket</FontIcon>}
					onClick={() => history.push('/market')}>Market
			</MenuItem>
				<MenuItem
					style={{
						backgroundColor: path === '/settings' ? blue300 : null
					}}
					leftIcon={<FontIcon style={{ color: blue800 }} className="material-icons">settings</FontIcon>}
					onClick={() => history.push('/settings')}>Settings
			</MenuItem>
				<List style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0
				}}>
					<ListItem
						onClick={() => history.push('/')}
						primaryText="Test Co"
						secondaryText="test@co.co"
						leftAvatar={<Avatar src="https://img00.deviantart.net/c9b6/i/2012/264/2/e/avatar_angelina_by_edit_express-d34muar.jpg" />}
					/>
				</List>
			</Drawer>
		</div>
	)
}

function mapStateToProps(state) {

	return {
		data: state.login
	}
}

function mapDispatchToProps(dispatch) {
	return {
		logout: bindActionCreators(logout, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)