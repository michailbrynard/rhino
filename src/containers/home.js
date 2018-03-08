import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon'
import Snackbar from 'material-ui/Snackbar';
import { getWalletData } from '../actions'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loader from '../components/loader'
import { style } from '../style'

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			notifications: [
				// {
				// 	title: "TEST NOTIFICATION 1",
				// 	text: "This is a test notification"
				// }
			],
			snackbar_open: false
		}
	}

	handleSnackbarClose = () => {
		this.setState({
			snackbar_open: false,
		});
	};

	render() {

		const { history, loading, err, data } = this.props

		return (
			<div className='container'>
				{
					loading ?
					<Loader/> :
						<div className='row'>
							<Snackbar
								open={this.state.snackbar_open}
								message="Notification Dismissed"
								autoHideDuration={3000}
								onRequestClose={this.handleSnackbarClose}
							/>
							<br />
							{
								this.state.notifications.map((item, index) => (
									<div key={index} className='col-12'>
										<Paper style={style.card} zDepth={3}>
											<FontIcon onClick={() => {
												this.state.notifications.splice(index, 1)
												this.state.snackbar_open = true
												this.setState(this.state)
											}} style={{
												fontSize: 40,
												position: 'absolute',
												top: 10,
												right: 10
											}} className="material-icons">close</FontIcon>
											<div className='container'>
												<div className='row'>
													<div className='col-12 right'>
														<h3>{item.title}</h3>
														<p>{item.text}</p>
													</div>
												</div>
											</div>
										</Paper>
										<br />
									</div>
								))
							}
							<div className='col-12'>
								<Paper style={style.card} zDepth={3}>
									<div style={style.card_left}>
										<img style={style.card_left_img} src='rehive-logo1.svg' />
									</div>
									<div style={style.card_right} className='right'>
										<h3>Rehive</h3>
										<p className='cardtext'>From ideas to production, Rehive partners with start ups, enterprises and governments to accelerate fintech innovation and build amazing fintech products.</p>
										<a href="https://rehive.com" target="_blank"><RaisedButton label="Visit Site" secondary={true} /></a>
									</div>
								</Paper>
								<br />
							</div>
							<div className='col-12'>
								<Paper style={style.card} zDepth={3}>
									<div style={style.card_left}>
										<br />
										<h1 className='card-heading'>
											{data && data.balance && data.balance.balance }
											<br/>
											{data && data.balance && data.balance.currency && data.balance.currency.code}
										</h1>
									</div>
									<div style={{ width: '200px' }} className='right'>
										<h3 className='card-heading'>Balance</h3>
										<br /><br />
										<RaisedButton onClick={() => history.push('/wallet')} label="Wallet" secondary={true} />
									</div>
								</Paper>
								<br />
							</div>
							<div className='col-12'>
								<Paper style={style.card} zDepth={3}>
									<div style={style.card_left}>
										<img style={style.card_left_img} src='coins.png' />
									</div>
									<div style={style.card_right} className='right'>
										<h3 className='card-heading'>Earn Tokens</h3>
										<br /><br />
										<RaisedButton onClick={() => history.push('/earn')} label="Rewards" secondary={true} />
									</div>
								</Paper>
								<br />
							</div>
							<div className='col-12'>
								<Paper style={style.card} zDepth={3}>
									<div style={style.card_left}>
										<img style={style.card_left_img} src='trading.png' />
									</div>
									<div style={style.card_right} className='right'>
										<h3 className='card-heading'>Redeem Tokens</h3>
										<br /><br />
										<RaisedButton onClick={() => history.push('/market')} label="Perks" secondary={true} />
									</div>
								</Paper>
								<br />
							</div>
						</div>
				}
			</div>
		)
	}
}

class HomeContainer extends Component {
	componentDidMount() {
		this.props.getWalletData()
	}

	render() {
		const { data, loading, err, history } = this.props
		return (
			<Home history={history} data={data} loading={loading} err={err} />
		)
	}
}

function mapStateToProps(state) {
	return {
		data: state.wallet.data,
		loading: state.wallet.loading,
		err: state.wallet.err
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getWalletData: bindActionCreators(getWalletData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);