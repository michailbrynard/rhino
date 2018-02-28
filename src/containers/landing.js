import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import { SmallLoader } from '../components/loader'

import { signup } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class Landing extends Component {

	state = {
		open: false,
		email: ""
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { history, signup, err, data, loading } = this.props

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
					console.log("LOGIN");
				}}
			/>,
		];

		return (
			<div>
				<AppBar title="Launcher" showMenuIconButton={false} iconElementRight={<FlatButton onClick={this.handleOpen} label="Login" />} />

				<Dialog
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					<div className='container center'>
						<h3>Login</h3>
						<TextField
							hintText="Email"
							type='email'
						/><br />
						<TextField
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
						data ?
							<div className='col-6 center landing-row'>
								<h1 className='title'>Thank you for signing up to { data.company }</h1>
								<p className='subtitle'>Check your email for the link to create your password and login</p>
							
							</div> :
							<div className='col-6 center landing-row'>
								<h1 className='title'>Product Name</h1>
								<p className='subtitle'>This is a short description of the product</p>
								{
									err ?
										<p>Error: {err}</p> : null
								}
								<TextField
									value={this.state.email}
									onChange={e => this.setState({ email: e.target.value })}
									hintText="Email"
								/><br />
								{
									loading ?
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
		err,
		data,
		loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		signup: bindActionCreators(signup, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)