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
		passwordConf: "",
		password: ""
	};

	render() {
		const { history, signup, signupErr, signupLoading, loginErr, loginData, loginLoading } = this.props

		return (
			<div>
				<AppBar title="Launcher" showMenuIconButton={false} />

				<div className='spacer'></div>
				<div style={{ color: 'white' }} className='row'>
					<div className='col-12 center landing-row'>
						<h1 className='title'>Set Password</h1>
						<p className='subtitle'>Set your password to continue</p>
						{
							signupErr ?
								<p>Error: {signupErr}</p> : null
						}
						<form onSubmit={(e) => {
							e.preventDefault()
							console.log("PASSWORD FOR SUBMISSION", this.state);
						}}>
							<TextField
								inputStyle={{ color: "white" }}
								hintStyle={{ color: "#999" }}
								value={this.state.password}
								onChange={e => this.setState({ password: e.target.value })}
								hintText="Password"
							/><br />
							<TextField
								inputStyle={{ color: "white" }}
								hintStyle={{ color: "#999" }}
								value={this.state.passwordConf}
								onChange={e => this.setState({ passwordConf: e.target.value })}
								hintText="Confirm Password"
							/><br/>
							{
								signupLoading ?
									<SmallLoader /> :
									<RaisedButton type='submit' label="Set Password" secondary={true} />
							}
						</form>
						<br /><br />
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { err, data, loading } = state.signup
	return {
		signupErr: err,
		signupLoading: loading,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		signup: bindActionCreators(signup, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)