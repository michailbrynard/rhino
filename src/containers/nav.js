import React, { Component } from 'react'
import { FlatButton } from 'material-ui'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import { yellow600, grey600, blue300, blue700, white } from 'material-ui/styles/colors';

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
			<h3 key={0} className='center'>{user_data.company}</h3>,
			<MenuItem
				key={1}
				style={style.drawer_link_highlight(path, '/')}
				leftIcon={<FontIcon style={style.drawer_link_icon(path, '/')} className="material-icons">change_history</FontIcon>}
				onClick={() => history.push('/')}>
				<span style={style.drawer_link}>Home</span>
			</MenuItem>,

			<MenuItem
				key={2}
				style={style.drawer_link_highlight(path, '/wallet')}
				leftIcon={<FontIcon style={style.drawer_link_icon(path, '/wallet')} className="material-icons">crop_square</FontIcon>}
				onClick={() => history.push('/wallet')}>
				<span style={style.drawer_link}>Wallet</span>
			</MenuItem>,

			<MenuItem
				key={3}
				style={style.drawer_link_highlight(path, '/earn')}
				leftIcon={<FontIcon style={style.drawer_link_icon(path, '/earn')} className="material-icons">star_border</FontIcon>}
				onClick={() => history.push('/earn')}>
				<span style={style.drawer_link}>Rewards</span>
			</MenuItem>,

			<MenuItem
				key={4}
				style={style.drawer_link_highlight(path, '/market')}
				leftIcon={<FontIcon style={style.drawer_link_icon(path, '/market')} className="material-icons">crop_7_5</FontIcon>}
				onClick={() => history.push('/market')}>
				<span style={style.drawer_link}>Market</span>
			</MenuItem>,

			<MenuItem
				key={5}
				style={style.drawer_link_highlight(path, '/settings')}
				leftIcon={<FontIcon style={style.drawer_link_icon(path, '/settings')} className="material-icons">details</FontIcon>}
				onClick={() => history.push('/settings')}>
				<span style={style.drawer_link}>Settings</span>
			</MenuItem>,

			<List key={6} style={style.user_nav_view}>
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
				<FontIcon onClick={() => { this.setState({ open: !this.state.open }) }} style={style.nav_menu_icon} className="material-icons">menu</FontIcon>
				<FlatButton onClick={() => logout()} style={style.logout_btn} label="Logout" />
				<br/>
				<Drawer onClick={() => this.setState({ open: false })} className="drawer left">
					{ drawer_contents.map(i => i) }
				</Drawer>
				<Drawer docked={false} onRequestChange={() => this.setState({ open: false })} open={this.state.open} className="mobile_drawer left">
					{ drawer_contents.map(i => i) }
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