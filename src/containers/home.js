import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loader from '../components/loader'
import { getHomeData } from '../actions'

const Home = ({ home_data, history }) => (
	<div className='container'>
		{
			home_data ?
				<div className='row'>
					<br />
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
										<br/><br/>
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
										<br/><br/>
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
										<br/><br/>
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
										<br/><br/>
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
		alignItems: 'center'
	},
	
};

function mapStateToProps(state) {
	const { home_data, loading } = state

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