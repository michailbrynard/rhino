import React, { Component } from 'react'
import { FlatButton } from 'material-ui'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import { yellow700, grey600, blue300, blue700, white } from 'material-ui/styles/colors';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions'
import { style } from '../style'

class Nav extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}

	render() {
		const { history, match, logout } = this.props
		const { path } = match
		const user_data = JSON.parse(localStorage.getItem('user'))

		const drawer_contents = [
			<h3 className='center'>{user_data.company}</h3>,
			<MenuItem
				style={{
					backgroundColor: path === '/' ? blue700 : null
				}}
				leftIcon={<FontIcon style={{ color: path === '/' ? white : grey600, position: 'absolute', left: '40%' }} className="material-icons">change_history</FontIcon>}
				onClick={() => history.push('/')}>Home
			</MenuItem>,

			<MenuItem
				style={{
					backgroundColor: path === '/wallet' ? blue700 : null
				}}
				leftIcon={<FontIcon style={{ color: path === '/wallet' ? white : grey600, position: 'absolute', left: '40%' }} className="material-icons">crop_square</FontIcon>}
				onClick={() => history.push('/wallet')}>Wallet
			</MenuItem>,

			<MenuItem
				style={{
					backgroundColor: path === '/earn' ? blue700 : null
				}}
				leftIcon={<FontIcon style={{ color: path === '/earn' ? white : grey600, position: 'absolute', left: '40%' }} className="material-icons">star_border</FontIcon>}
				onClick={() => history.push('/earn')}>Rewards
			</MenuItem>,

			<MenuItem
				style={{
					backgroundColor: path === '/market' ? blue700 : null
				}}
				leftIcon={<FontIcon style={{ color: path === '/market' ? white : grey600, position: 'absolute', left: '40%' }} className="material-icons">crop_7_5</FontIcon>}
				onClick={() => history.push('/market')}>Market
			</MenuItem>,

			<MenuItem
				style={{
					backgroundColor: path === '/settings' ? blue700 : null
				}}
				leftIcon={<FontIcon style={{ color: path === '/settings' ? white : grey600, position: 'absolute', left: '40%' }} className="material-icons">details</FontIcon>}
				onClick={() => history.push('/settings')}>Settings
			</MenuItem>,

			<List style={style.user_nav_view}>
				<ListItem disabled style={{
					justifyContent: 'center',
					display: 'flex'
				}}>
				</ListItem>
				<ListItem
					disabled
					className='center'
					onClick={() => history.push('/')}
					primaryText={user_data.username}
					secondaryText={user_data.email}
				/>
			</List>
		]

		return (
			<div>
				<br />
				<FontIcon onClick={() => {
					this.setState({ open: !this.state.open })
				}} style={{ color: path === '/' ? white : grey600, position: 'absolute', left: 20, paddingTop: '5px' }} className="material-icons">menu</FontIcon>
				<FlatButton onClick={() => logout()} style={{
					float: 'right',
					color: 'white',
					zIndex: 104
				}} label="Logout" />
				<br/>
				<Drawer onClick={() => this.setState({ open: false })} className="drawer right">
					{
						drawer_contents.map(i => i)
					}
				</Drawer>

				<Drawer open={this.state.open} className="mobile_drawer right">
					{
						drawer_contents.map(i => i)
					}
				</Drawer>

			</div>
		)
	}

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