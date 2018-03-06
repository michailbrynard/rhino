import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import { SmallLoader } from '../components/loader'

import { signup, login } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

let { IconButton, NavigationClose, Styles } = require('material-ui')


class Count extends Component {
	render() {
		const { history } = this.props

		return (
			<div>
				<AppBar
					title={<img alt='logo' className='header-img' src='./logo.svg' />}
					showMenuIconButton={false}
				/>
					<div style={{
						position: 'absolute',
						top: 0, left: 0, bottom: 0, right: 0,
						zIndex: 11,
						display: 'flex',
						justifyContent: 'center',
						textAlign: 'center',
						alignContent: 'center',
						alignItems: 'center',
						color: '#fff'
					}}>
						<div>
						<h1 style={{
							fontSize: '108px',
							margin: '5px'
						}}>108 801</h1>
						<span>USERS SIGNED UP</span>
						</div>
					</div>
					<div style={{
						position: 'absolute',
						top: 0, left: 0, bottom: 0, right: 0,
						backgroundColor: '#333',
						zIndex: 10,
						opacity: 0.9
					}}></div>
				<div className='row'>
					<div className='col-12 center'>
						<img alt='logo' style={{
							margin: 'auto',
							display: 'block',
							height: '80vh',
							width: 'auto'
						}} src='./rehive-logo1.svg' />
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Count)