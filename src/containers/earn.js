import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import { BigNumber } from 'bignumber.js' 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getCampaignData, postClaimReward } from '../actions/campaign'
import Loader from '../components/loader'
import { style } from '../style/'

const Earn = ({ data, currency, postClaimReward }) => (
	<div className='container'>
		<div className='row'>
		<br/>
			<div className='col-12'>
				<Paper style={style.card_header} zDepth={3}>
					<div style={style.card_left}>
						<img style={style.card_left_img} src='coins1.svg' alt='earn' />
					</div>
					<div style={style.card_right} className='right'>
						<h3>Earn Rewards!</h3>
						<p>When completing tasks or achieving goals you are awarded tokens!</p>
					</div>
				</Paper>
				<br />
			</div>
			{
				data && data.length > 0 ?
				data.map((item, index) => {
					const x = new BigNumber(item.reward_amount)
					const reward_amount = x.dividedBy(10000000).toString()
					return (
						<div key={index} className='col-12'>
							<Paper style={style.card} zDepth={3}>
								<div style={style.card_left}>
									<img style={style.card_left_img} src='coins1.svg' alt='earn' />
								</div>
								<div style={style.card_right} className='right'>
									<h3>{item.reward_type.toUpperCase()}</h3>
									<p>{item.description}</p>
									<h1>{reward_amount} {currency}</h1>
									<RaisedButton onClick={() => { 
										const user_data = JSON.parse(localStorage.getItem('user'))

										let data = {
											company: user_data.company,
											reward_type: item.reward_type
										}
										postClaimReward(data)
									}} className="f-right" primary={true} label="Buy" />
								</div>
							</Paper>
							<br />
						</div>
					)
				}) : 
					<div className='col-12'>
						<Paper style={style.transaction_card} zDepth={3}>
							<div className='container center'>
								<br />
								<h3>No Rewards</h3>
								<br />
							</div>
						</Paper>
						<br />
					</div>
			}
		</div>
	</div>
)

class EarnContainer extends Component {

	componentDidMount() {
		const user_data = JSON.parse(localStorage.getItem('user'))
		this.props.getCampaignData(user_data.company)
	}

	render() {
		const { data, loading, postClaimReward } = this.props
		const user_data = JSON.parse(localStorage.getItem('user'))

		return (
			<div>
				{
					loading ?
					<Loader/> :
						<Earn postClaimReward={postClaimReward} data={data} currency={user_data && user_data.currency && user_data.currency.code} />
				}
			</div>
		)
	}
}



function mapStateToProps(state) {
	const { data, loading } = state.campaign
	return {
		data,
		loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getCampaignData: bindActionCreators(getCampaignData, dispatch),
		postClaimReward: bindActionCreators(postClaimReward, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EarnContainer)