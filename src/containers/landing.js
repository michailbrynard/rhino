import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import Loader, { SmallLoader } from '../components/loader'

import { signup, login } from '../actions/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'


class Landing extends Component {

	state = {
		open: false,
		email: "",
		password: "",
		loading: false
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};


	componentDidMount() {
		this.setState({ loading: true })
		fetch('./config.json')
		.then(response => response.json())
		.then(json => {
			console.log(json);
			this.setState({ loading: false, data: json })
		})

	}

	render() {
		const { signup, login, signupErr, signupData, signupLoading, loginErr, loginLoading } = this.props
		
		var pattern = '\\+'
		var reg = new RegExp(pattern, '');

		const notAllowedEmail = this.state.email.search(reg) > -1 ? true : false

		return (
			<div>
				<AppBar
					showMenuIconButton={false}
				/>

				<Dialog
					repositionOnUpdate={false}
					autoDetectWindowHeight={false}
					autoScrollBodyContent={false}
					contentStyle={{
					  width: '100%',
					  maxWidth: '450px',
					  maxHeight: '100% !important'
					}}
					bodyStyle={{
					   maxHeight: '100% !important'
					}}
					style={{
					   paddingTop:'0 !important',
					   marginTop:'-65px !important',
					   bottom: '0 !important',
					   overflow: 'scroll !important',
					   height: 'auto !important'
					}}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					{
						loginLoading ?
							<SmallLoader /> :
							<form style={{
								alignContent: 'center',
								textAlign: 'center',
							}} onSubmit={(e) => {
								e.preventDefault()
								login(this.state.email, this.state.password)
							}}>
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
								<div className='row'>
									<br/>
									<Link to='/resetpassword'>Reset Password</Link>
									<br/><br/>
								</div>
							</form>
					}
				</Dialog>

				<div className='spacer'></div>
				{
					this.state.loading ?
					<Loader/> :
						<div className='row'>

							{
								signupData ?
									<div className='col-10 center row'>
										<h1 className='title landing-msg'>Thank you for signing up to {signupData.company}</h1>
										<p className='subtitle'>Check your email for the link to create your password and login</p>
										<a href='/resetpassword' onClick={() => { window.location.reload() }}>Didn't receive an email? Click here to try again</a>
									</div> :
									<div className='landing-row'>
										<div className='container'>
											<h1 className='title'>{this.state.data && this.state.data.display_name}</h1>
											<p className='subtitle'>{this.state.data && this.state.data.subtitle}</p>
											<p>{this.state.data && this.state.data.description}</p>
											{
												signupErr ?
													<p>Error: {signupErr}</p> : 
													notAllowedEmail ? <span style={{color: 'red'}}>Email with '+' not allowed</span> : null
											}
											<form onSubmit={(e) => {
												e.preventDefault()
												signup(this.state.email)
											}}>
												{
													signupLoading ?
														<SmallLoader /> :
														<RaisedButton href="https://wallet.rehive.com/rhino" label="Access your wallet" secondary={true} />
												}
											</form>
											<br /><br />
										</div>
									</div>
							}
						</div>
				}
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