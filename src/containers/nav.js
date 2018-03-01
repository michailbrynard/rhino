import React from 'react'
import { FlatButton } from 'material-ui'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import { yellow700, grey600, blue300, blue700, white } from 'material-ui/styles/colors';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions'
import { style } from '../style'

const Nav = ({ history, match, logout }) => {
	const user_data = JSON.parse(localStorage.getItem('user'))

	const { path } = match
	return (
		<div>
			<br/>
			<FlatButton onClick={() => logout()} style={{
				float: 'right'
			}} label="Logout"/>
			<Drawer className="right">
				<AppBar showMenuIconButton={false} title={user_data.company} />
				<MenuItem
					style={{
						backgroundColor: path === '/' ? blue700 : null
					}}
					leftIcon={<FontIcon style={{ color: path === '/' ? white : grey600 }} className="material-icons">home</FontIcon>}
					onClick={() => history.push('/')}>Home
				</MenuItem>
				<MenuItem
					style={{
						backgroundColor: path === '/wallet' ? blue700 : null
					}}
					leftIcon={<FontIcon style={{ color: path === '/wallet' ? white : grey600 }} className="material-icons">account_balance_wallet</FontIcon>}
					onClick={() => history.push('/wallet')}>Wallet
				</MenuItem>
				<MenuItem
					style={{
						backgroundColor: path === '/earn' ? blue700 : null
					}}
					leftIcon={<FontIcon style={{ color: path === '/earn' ? white : grey600 }} className="material-icons">monetization_on</FontIcon>}
					onClick={() => history.push('/earn')}>Rewards
				</MenuItem>
				<MenuItem
					style={{
						backgroundColor: path === '/market' ? blue700 : null
					}}
					leftIcon={<FontIcon style={{ color: path === '/market' ? white : grey600 }} className="material-icons">shopping_basket</FontIcon>}
					onClick={() => history.push('/market')}>Market
			</MenuItem>
				<MenuItem
					style={{
						backgroundColor: path === '/settings' ? blue700 : null
					}}
					leftIcon={<FontIcon style={{ color: path === '/settings' ? white : grey600 }} className="material-icons">settings</FontIcon>}
					onClick={() => history.push('/settings')}>Settings
			</MenuItem>
				<List style={style.user_nav_view}>
					<ListItem disabled style={{
						justifyContent: 'center',
						display: 'flex'
					}}>
						<Avatar src="https://img00.deviantart.net/c9b6/i/2012/264/2/e/avatar_angelina_by_edit_express-d34muar.jpg" />
					</ListItem>
					<ListItem
						disabled
						className='center'
						onClick={() => history.push('/')}
						primaryText={user_data.username}
						secondaryText={user_data.email}
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