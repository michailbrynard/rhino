import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton'
import { SmallLoader } from '../components/loader'
import { style } from '../style'
import { resetPassword } from '../actions/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Landing extends Component {

	state = {
		email: ""
	};

	render() {
		const { resetPassword, resetPasswordErr, resetPasswordLoading, data, history } = this.props

		return (
			<div>
				<AppBar iconElementRight={<FlatButton onClick={() =>  history.push('/')} style={style.logout_btn} label="Home" />} showMenuIconButton={false} />

				<div className='spacer'></div>
				<div style={{ color: 'white' }} className='row'>
					<div className='col-8'>
						{
							data === 'success' ?
							<div>
								<h1 className='title'>Success</h1>
								<p className='subtitle'>Please check your email for the reset password link</p>
								<br/>
								<a href='/resetpassword' onClick={() => { window.location.reload() }}>Didn't receive an email? Click here to try again</a>
							</div> :
							data === 'error' ?
							<div>
								<h1 className='title'>Error</h1>
								<p className='subtitle'>Error sending reset password link</p>
							</div> :
							<div>
								<h1 className='title'>Reset Password</h1>
								<p className='subtitle'>Enter your email to receive a link to set your password</p>
								{
									resetPasswordErr ?
										<p>Error: {resetPasswordErr}</p> : 
										null
								}
								<form onSubmit={(e) => {
									e.preventDefault()
									resetPassword(this.state.email)
								}}>
									<TextField
										hintStyle={{ color: "#999" }}
										inputStyle={{ color: "white" }}
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
							</div>
						}
						<br /><br />
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { err, data, loading } = state.reset_password
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