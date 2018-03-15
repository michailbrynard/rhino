import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon'
import Snackbar from 'material-ui/Snackbar';
import { getWalletData } from '../actions/wallet'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loader from '../components/loader'
import { style } from '../style/'

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
			snackbar_open: false,
			loading: false
		}
	}

	handleSnackbarClose = () => {
		this.setState({
			snackbar_open: false,
		});
	};

	componentDidMount() {
		this.setState({ loading: true })
		fetch('./config.json')
			.then(response => response.json())
			.then(json => {
				console.log(json);
				this.setState({ loading: false, company_data: json })
			})

	}

	render() {

		const { history, loading, err, data } = this.props

		const { company_data } = this.state

		return (
			<div className='container'>
				{
					loading || this.state.loading ?
					<Loader/> :
						(
							err ?
							<h3>{err}</h3> :
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
														this.setState({
															notifications: this.state.notifications,
															snackbar_open: true
														})
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
												<img style={style.card_left_img} src='logo1.svg' alt='logo' />
											</div>
											<div style={style.card_right} className='right'>
												<h3>{ company_data && company_data.card_display_name }</h3>
												<p className='cardtext'>{ company_data && company_data.description }</p>
												<a href="https://rehive.com" rel="noopener noreferrer" target="_blank"><RaisedButton label="Visit Site" secondary={true} /></a>
											</div>
										</Paper>
										<br />
									</div>
									<div className='col-12'>
										<Paper style={style.card} zDepth={3}>
											<div style={style.card_left}>
												<br />
												<h1 className='card-heading'>
													{data && data.balance && data.balance.balance}
													<br />
													{data && data.balance && data.balance.currency && data.balance.currency.code}
												</h1>
											</div>
											<div style={{ width: '200px' }} className='right'>
												<h3 className='card-heading'>Balance</h3>
												<p className='cardtext'> View your token balance and transaction history in your wallet. </p>
												<br /><br />
												<RaisedButton onClick={() => history.push('/wallet')} label="Wallet" secondary={true} />
											</div>
										</Paper>
										<br />
									</div>
									<div className='col-12'>
										<Paper style={style.card} zDepth={3}>
											<div style={style.card_left}>
												<img style={style.card_left_img} src='coins1.svg' alt='coins' />
											</div>
											<div style={style.card_right} className='right'>
												<h3 className='card-heading'>Earn Tokens</h3>
												<p className='cardtext'> Earn tokens by completing rewards! </p>
												<br /><br />
												<RaisedButton onClick={() => history.push('/earn')} label="Rewards" secondary={true} />
											</div>
										</Paper>
										<br />
									</div>
									<div className='col-12'>
										<Paper style={style.card} zDepth={3}>
											<div style={style.card_left}>
												<img style={style.card_left_img} src='trading1.svg' alt='market' />
											</div>
											<div style={style.card_right} className='right'>
												<h3 className='card-heading'>Redeem Perks</h3>
												<p className='cardtext'> Use tokens to purchase exclusive perks on the Marketplace.  </p>
												<br /><br />
												<RaisedButton onClick={() => history.push('/perks')} label="Perks" secondary={true} />
											</div>
										</Paper>
										<br />
									</div>
								</div>
						)
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