import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { SmallLoader } from '../components/loader'

import { resetPassword } from '../actions/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class Landing extends Component {

	state = {
		email: ""
	};

	render() {
		const { history, resetPassword, resetPasswordErr, resetPasswordLoading, data } = this.props
		if (data === 'success') history.push('/') 

		return (
			<div>
				<AppBar title="Launcher" showMenuIconButton={false} />

				<div className='spacer'></div>
				<div style={{ color: 'white' }} className='row'>
					<div className='col-12 center landing-row'>
						<h1 className='title'>Reset Password</h1>
						<p className='subtitle'>Enter your email to receive a link to set your password</p>
						{
							resetPasswordErr ?
								<p>Error: {resetPasswordErr}</p> : 
								null
						}
						<form onSubmit={(e) => {
							e.preventDefault()
							const params = new URLSearchParams(this.props.location.search);
							const uid = params.get('uid');
							const paramtoken = params.get('token');
							const email = params.get('email');
							const { password, passwordConf } = this.state
							resetPassword(password, passwordConf, uid, paramtoken, email)
						}}>
							<TextField
								hintStyle={{ color: "#999" }}
								value={this.state.email}
								type="email"
								onChange={e => this.setState({ email: e.target.value })}
								hintText="Email"
							/><br />
							{
								resetPasswordLoading ?
									<SmallLoader /> :
									<RaisedButton type='submit' label="Submit" secondary={true} />
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
		resetPasswordErr: err,
		resetPasswordLoading: loading,
		data
	}
}

function mapDispatchToProps(dispatch) {
	return {
		resetPassword: bindActionCreators(resetPassword, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)