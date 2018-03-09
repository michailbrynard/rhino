import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';

import { SmallLoader } from '../components/loader'

import { getSignupCountData } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'



class SignupCount extends Component {

	componentDidMount() {
		const { getSignupCountData } = this.props
		const user_data = JSON.parse(localStorage.getItem('user'))
		getSignupCountData(user_data.company)
	}
	render() {
		const { signupCountData } = this.props
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
											<h1 style={style.header}>{data}</h1>
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
		top: 0, left: 0, bottom: 0, right: 0,
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
	constructor(props) {
		super(props)
		this.state = {
			selectedReward: null
		}
	}
	componentDidMount() {
		const user_data = JSON.parse(localStorage.getItem('user'))
		this.props.getSignupCountData(user_data.company)
	}
	render() {
		const { match, getSignupCountData, signupCountData } = this.props

		return (
			<div>
				<AppBar
					title={<img alt='logo' className='header-img' src='./logo.svg' />}
					showMenuIconButton={false}
				/>
				<SignupCount getSignupCountData={getSignupCountData} params={match.params} signupCountData={signupCountData} />
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