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
			width: window.innerWidth,
			open: false
		}
	}

  /**
   * Calculate & Update state of new dimensions
   */
	updateDimensions() {
		console.log("UPDATING WIDTH", this.state);
		let update_width = window.innerWidth - 100;

		if (this.state.width < 625) {
			this.setState({
				width: update_width,
				open: false
			})
		} else {
			this.setState({ width: update_width, open: true });
		}
	}

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions.bind(this));
	}

	render() {
		const { history, match, logout } = this.props
		const { path } = match
		const user_data = JSON.parse(localStorage.getItem('user'))

		return (
			<div>
				<br />
				<FlatButton onClick={() => logout()} style={{
					float: 'right',
					color: 'white'
				}} label="Logout" />
				<Drawer open={this.state.open} className="right">
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