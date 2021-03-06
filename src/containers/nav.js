import React, { Component } from 'react'
import { FlatButton } from 'material-ui'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions/auth'
import { style } from '../style/'

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

		const isAdmin = user_data && user_data.groups.filter(i => i.name === 'admin').length > 0;

		const drawer_contents = [
			<MenuItem key={0}>
			<img style={style.card_navigation_img} src='coins1.svg' alt='logo' />
			<h3 >RHINO</h3>
			</MenuItem>,

			<MenuItem
				key={1}
				style={style.drawer_link_highlight(path, '/')}
				leftIcon={<img style={style.card_navigation_img2} src='trading1.svg' alt='logo' />}
				onClick={() => history.push('/')}>
				<span style={style.drawer_link}>Home</span>
			</MenuItem>,

			<MenuItem
				key={2}
				style={style.drawer_link_highlight(path, '/wallet')}
				leftIcon={<img style={style.card_navigation_img2} src='logo1.svg' alt='logo' />}
				onClick={() => history.push('/wallet')}>
				<span style={style.drawer_link}>Wallet</span>
			</MenuItem>,
			
			<MenuItem
				key={3}
				style={style.drawer_link_highlight(path, '/perks')}
				leftIcon={<img style={style.card_navigation_img2} src='logo2.svg' alt='logo' />}
				onClick={() => history.push('/perks')}>
				<span style={style.drawer_link}>Perks</span>
			</MenuItem>
		]

		if (isAdmin) {
			drawer_contents.push(
				<MenuItem
					key={5}
					style={style.drawer_link_highlight(path, '/reward_requests')}
					leftIcon={<img style={style.card_navigation_img2} src='logo1.svg' alt='logo' />}
					onClick={() => history.push('/reward_requests')}>
					<span style={style.drawer_link}>Requests</span>
				</MenuItem>,
			)
		}

		drawer_contents.push(
			<List key={drawer_contents.length + 1} style={style.user_nav_view}>
				<ListItem
					className='center'
					onClick={() => window.open('https://rehive.com', '_blank')}
					secondaryText="Powered by Rehive"
				/>
				<ListItem
					disabled
					className='center'
					onClick={() => history.push('/')}
					primaryText={user_data.username}
					secondaryText={user_data.email}
				/>
			</List>
		)

		return (
			<div>
				<br />
				<FontIcon onClick={() => { this.setState({ open: !this.state.open }) }} style={style.nav_menu_icon} className="material-icons">menu</FontIcon>
				<FlatButton onClick={() => logout()} style={style.logout_btn} label="Logout" />
				<FlatButton onClick={() => window.location.reload()} style={style.logout_btn} label="Refresh" />
				<br/>
				<Drawer onClick={() => this.setState({ open: false })} className="drawer">
					{ drawer_contents.map(i => i) }
				</Drawer>
				<Drawer width={225} docked={false} onRequestChange={() => this.setState({ open: false })} open={this.state.open} className="mobile_drawer">
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