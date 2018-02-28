import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon'
import Snackbar from 'material-ui/Snackbar';


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loader from '../components/loader'
import { getHomeData } from '../actions'

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			notifications: [
				{
					title: "TEST NOTIFICATION 1",
					text: "This is a test notification"
				}
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

		const { home_data, loading, history} = this.props
		console.log("PRINT ENV URL", process.env);
		return (
			<div className='container'>
				{
					home_data ?
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
									<div className='container'>
										<div className='row'>
											<div className='col-4'>
												<br />
												<img className='container' src='logo.png' />
											</div>
											<div className='col-8 right'>
												<h3>{home_data.company.name}</h3>
												<p>{home_data.company.product}</p>
												<span>{home_data.company.description}</span>
												<br /><br />
												<RaisedButton label="Visit Site" secondary={true} />
											</div>
										</div>
									</div>
								</Paper>
								<br />
							</div>
							<div className='col-12'>
								<Paper style={style.card} zDepth={3}>
									<div className='container'>
										<div className='row'>
											<div className='col-6'>
												<h1>
													{home_data.wallet.balance}
													<br />
													{home_data.wallet.currency_code}
												</h1>
											</div>
											<div className='col-6 right'>
												<h3>Balance</h3>
												<br /><br />
												<RaisedButton onClick={() => history.push('/wallet')} label="Wallet" secondary={true} />
											</div>
										</div>
									</div>
								</Paper>
								<br />
							</div>
							<div className='col-12'>
								<Paper style={style.card} zDepth={3}>
									<div className='container'>
										<div className='row'>
											<div className='col-4'>
												<br />
												<img className='container' src='coins.svg' />
											</div>
											<div className='col-8 right'>
												<h3>Earn Tokens</h3>
												<br /><br />
												<RaisedButton label="Rewards" secondary={true} />
											</div>
										</div>
									</div>
								</Paper>
								<br />
							</div>
							<div className='col-12'>
								<Paper style={style.card} zDepth={3}>
									<div className='container'>
										<div className='row'>
											<div className='col-4'>
												<br />
												<img className='container' src='trading.svg' />
											</div>
											<div className='col-8 right'>
												<h3>Redeem Tokens</h3>
												<br /><br />
												<RaisedButton onClick={() => history.push('/market')} label="Perks" secondary={true} />
											</div>
										</div>
									</div>
								</Paper>
								<br />
							</div>
						</div> :
						<p>No data to show</p>
				}
			</div>
		)
	}
}

class HomeContainer extends Component {
	componentDidMount() {
		const { getHomeData } = this.props
		getHomeData()
	}

	render() {
		const { loading, home_data, history } = this.props

		return (
			<div>
				{
					loading && !home_data ?
						<Loader /> :
						<Home history={history} home_data={home_data} />
				}
			</div>
		)
	}
}

const style = {
	card: {
		height: 250,
		display: 'flex',
		alignItems: 'center',
		position: 'relative'
	},
	
};

function mapStateToProps(state) {
	const { home_data, loading } = state.home

	return {
		loading,
		home_data
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getHomeData: bindActionCreators(getHomeData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);