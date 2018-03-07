import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { Tabs, Tab } from 'material-ui/Tabs';

import { SmallLoader } from '../components/loader'

import { getSignupCountData } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'



class SignupCount extends Component {

	componentDidMount() {
		const { getSignupCountData, params } = this.props
		const user_data = JSON.parse(localStorage.getItem('user'))
		console.log("PARAMS", params);
		getSignupCountData(user_data.company)
	}
	render() {
		const { history, signupCountData } = this.props
		const { err, loading, data } = signupCountData

		return (
			<div>
					<div style={style.content}>
						{
							loading ?
							<SmallLoader/> :
							(
								err ?
								<h3>{err}</h3> :
								(
										data && <div>
											<h1 style={style.header}>108 801</h1>
											<span>USERS SIGNED UP</span>
										</div>
								)
							)
						}
					</div>
					<div style={style.overlay}></div>
				<div className='row'>
					<div className='col-12 center'>
						<img alt='logo' style={style.image} src='./rehive-logo1.svg' />
					</div>
				</div>
			</div>
		)
	}
}

class RewardCount extends Component {

	componentDidMount() {
		const { getSignupCountData, params } = this.props
		const user_data = JSON.parse(localStorage.getItem('user'))
		console.log("PARAMS", params);
		getSignupCountData(user_data.company)
	}
	render() {
		const { history } = this.props

		return (
			<div>
				<div style={style.content}>
					<div>
						<h1 style={style.header}>1108 8011</h1>
						<span>REWARDS CLAIMED</span>
					</div>
				</div>
				<div style={style.overlay}></div>
				<div className='row'>
					<div className='col-12 center'>
						<img alt='logo' style={style.image} src='./rehive-logo1.svg' />
					</div>
				</div>
			</div>
		)
	}
}

const style = {
	content: {
		position: 'absolute',
		top: 0, left: 0, bottom: 0, right: 0,
		zIndex: 11,
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'center',
		alignContent: 'center',
		alignItems: 'center',
		color: '#fff'
	},
	header: {
		fontSize: '108px',
		margin: '5px'
	},
	overlay: {
		position: 'absolute',
		top: 0, left: 0, bottom: '-50px', right: 0,
		backgroundColor: '#333',
		zIndex: 10,
		opacity: 0.9
	},
	image: {
		margin: 'auto',
		display: 'block',
		height: '80vh',
		width: 'auto'
	}
}

class Count extends Component {
	render() {
		const { history, match, getSignupCountData, signupCountData } = this.props

		return (
			<div>
				<AppBar
					title={<img alt='logo' className='header-img' src='./logo.svg' />}
					showMenuIconButton={false}
				/>
				<Tabs>
					<Tab label="Signups">
						<SignupCount getSignupCountData={getSignupCountData} params={match.params} signupCountData={signupCountData} />
					</Tab>
					<Tab label="Rewards Claimed">
						<RewardCount getSignupCountData={getSignupCountData} params={match.params} />
					</Tab>
				</Tabs>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { data, loading, err } = state.signup_count
	return {
		signupCountData: {
			data,
			loading,
			err
		}
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getSignupCountData: bindActionCreators(getSignupCountData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Count)