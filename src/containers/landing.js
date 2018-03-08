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


class Landing extends Component {

	state = {
		open: false,
		email: "",
		password: ""
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { history, signup, login, signupErr, signupData, signupLoading, loginErr, loginData, loginLoading } = this.props

		return (
			<div>
				<AppBar
					title={<img alt='logo' className='header-img' src='./logo.svg' />}
					showMenuIconButton={false}
					iconElementRight={<FlatButton onClick={this.handleOpen} label="Login" />}
				/>

				<Dialog
					contentStyle={{ maxWidth: "360px" }}
					autoDetectWindowHeight={true}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					<div className='container center'>
						<h3>Login</h3>
						{
							loginErr ?
								<p>Error: {loginErr}</p> : null
						}
						{
							loginLoading ?
								<SmallLoader /> :
								<form onSubmit={(e) => {
									e.preventDefault()
									login(this.state.email, this.state.password)
								}}>
									<TextField
										value={this.state.email}
										onChange={e => this.setState({ email: e.target.value })}
										hintText="Email"
										type='email'
									/><br />
									<TextField
										value={this.state.password}
										onChange={e => this.setState({ password: e.target.value })}
										hintText="Password"
										type='password'
									/><br />
									<FlatButton
										label="Cancel"
										primary={true}
										onClick={this.handleClose}
									/>
									<FlatButton
										label="Login"
										primary={true}
										keyboardFocused={true}
										type='submit'
									/>
								</form>
						}
					</div>
				</Dialog>

				<div className='spacer'></div>
				<div className='row'>
					<div className='col-6 center'>
						<br />
						<img alt='logo' className='landing-img' src='./rehive-logo1.svg' />
					</div>
					{
						signupData ?
							<div className='col-6 center row'>
								<h1 className='title'>Thank you for signing up to {signupData.company}</h1>
								<p className='subtitle'>Check your email for the link to create your password and login</p>

							</div> :
							<div className='col-6  landing-row'>
								<h1 className='title'>Rehive fintech platform</h1>
								<p className='subtitle'>Welcome to the Rehive supporter platform! Sign up for exciting rewards and updates on everything Rehive!</p>
								{
									//signupErr ?
									//	<p>Error: {signupErr}</p> : null
								}
								<form onSubmit={(e) => {
									e.preventDefault()
									signup(this.state.email)
								}}>
									<TextField
										inputStyle={{ color: "white" }}
										hintStyle={{ color: "#999" }}
										value={this.state.email}
										onChange={e => this.setState({ email: e.target.value })}
										hintText="Email"
									/>
									{
										signupLoading ?
											<SmallLoader /> :
											<RaisedButton style={{ marginLeft: '8px' }} type='submit' label="Join" secondary={true} />
									}
								</form>
								<br /><br />
							</div>
					}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		signupErr: state.signup.err,
		signupData: state.signup.data,
		signupLoading: state.signup.loading,
		loginErr: state.login.err,
		loginData: state.login.data,
		loginLoading: state.login.loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		signup: bindActionCreators(signup, dispatch),
		login: bindActionCreators(login, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)