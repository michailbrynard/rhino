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

		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.handleClose}
			/>,
			<FlatButton
				label="Login"
				primary={true}
				keyboardFocused={true}
				onClick={() => {
					login(this.state.email, this.state.password)
				}}
			/>,
		];

		return (
			<div>
				<AppBar title="Launcher" showMenuIconButton={false} iconElementRight={<FlatButton onClick={this.handleOpen} label="Login" />} />

				<Dialog
					actions={
						loginLoading ?
						[<SmallLoader/>] :
							actions
					}
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
					</div>
				</Dialog>
				
				<div className='spacer'></div>
				<div className='row'>
					<div className='col-6 center'>
						<br/>
						<img alt='logo' className='landing-img' src='./logo.png' />
					</div>
					{
						signupData ?
							<div className='col-6 center landing-row'>
								<h1 className='title'>Thank you for signing up to { signupData.company }</h1>
								<p className='subtitle'>Check your email for the link to create your password and login</p>
							
							</div> :
							<div className='col-6 center landing-row'>
								<h1 className='title'>Product Name</h1>
								<p className='subtitle'>This is a short description of the product</p>
								{
									signupErr ?
										<p>Error: {signupErr}</p> : null
								}
								<TextField
									value={this.state.email}
									onChange={e => this.setState({ email: e.target.value })}
									hintText="Email"
								/><br />
								{
									signupLoading ?
									<SmallLoader/> :
										<RaisedButton onClick={() => {
											signup(this.state.email)
										}} label="Join" secondary={true} />
								}
								<br /><br />
							</div>
					}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { err, data, loading } = state.signup
	return {
		signupErr: err,
		signupData: data,
		signupLoading: loading,
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