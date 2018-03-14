import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { SmallLoader } from '../components/loader'

import { setPassword } from '../actions/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class Landing extends Component {

	state = {
		passwordConf: "",
		password: ""
	};

	render() {
		const { history, setPassword, setPasswordErr, setPasswordLoading, data } = this.props
		if (data === 'success') history.push('/') 

		return (
			<div>
				<AppBar title="Launcher" showMenuIconButton={false} />

				<div className='spacer'></div>
				<div style={{ color: 'white' }} className='row'>
					<div className='col-12 center landing-row'>
						<h1 className='title'>Set Password</h1>
						<p className='subtitle'>Set your password to continue</p>
						{
							setPasswordErr ?
								<p>Error: {setPasswordErr}</p> : 
								(
									this.state.password.length > 0 && this.state.passwordConf.length > 0 &&
									this.state.password !== this.state.passwordConf &&
									<p>Passwords do not match</p>
								)
						}
						<form onSubmit={(e) => {
							e.preventDefault()
							const params = new URLSearchParams(this.props.location.search);
							const uid = params.get('uid');
							const paramtoken = params.get('token');
							const email = params.get('email');
							const { password, passwordConf } = this.state
							setPassword(password, passwordConf, uid, paramtoken, email)
						}}>
							<TextField
								hintStyle={{ color: "#999" }}
								value={this.state.password}
								type="password"
								onChange={e => this.setState({ password: e.target.value })}
								hintText="Password"
							/><br />
							<TextField
								hintStyle={{ color: "#999" }}
								value={this.state.passwordConf}
								type="password"
								onChange={e => this.setState({ passwordConf: e.target.value })}
								hintText="Confirm Password"
							/><br/>
							{
								setPasswordLoading ?
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
	const { err, data, loading } = state.set_password
	return {
		setPasswordErr: err,
		setPasswordLoading: loading,
		data
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setPassword: bindActionCreators(setPassword, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)