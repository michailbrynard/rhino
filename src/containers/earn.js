import React, { Component } from 'react'
import Paper from 'material-ui/Paper';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getCampaignData } from '../actions'
import Loader from '../components/loader'

const Earn = ({ data }) => (
	<div className='container'>
		<div className='row'>
		<br/>
			{
				data && data.length > 0 ?
				data.map((item, index) => (
						<div className='col-12'>
							<Paper style={style.card} zDepth={3}>
								<div className='container'>
									<div className='row'>
										<div className='col-4'>
											<br />
											<img className='container' src='logo.png' />
										</div>
										<div className='col-8 right'>
											<h3>{ item.reward_type.toUpperCase() }</h3>
											<h1>{ item.reward_amount } HIVE</h1>
										</div>
									</div>
								</div>
							</Paper>
							<br />
						</div>
				)) : 
				<h3>No Rewards</h3>
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
		const { data, loading } = this.props
		
		return (
			<div>
				{
					loading ?
					<Loader/> :
						<Earn data={data} />
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
		position: 'relative',
		borderRadius: '10px'
	},
};

function mapStateToProps(state) {
	const { data, loading } = state.campaign
	return {
		data,
		loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getCampaignData: bindActionCreators(getCampaignData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EarnContainer)