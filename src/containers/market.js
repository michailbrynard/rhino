import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import Loader from '../components/loader'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPerkData } from '../actions'
import { style } from '../style'

const Market = ({ data }) => (
	<div className='container'>
		<div className='row'>
		<br/>
			{
				data && data.length > 0 ?
				data.map((item, index) => (
						<div key={index} className='col-12'>
							<Paper style={style.card} zDepth={3}>
								<div style={style.card_left}>
									<img style={style.card_left_img} src='logo.png' />
								</div>
								<div style={style.card_right} className='right'>
									<h3>{item.perk_name}</h3>
									<h1>{item.perk_amount} HIVE</h1>
								</div>
							</Paper>
							<br />
						</div>

				)) :
					<div className='col-12'>
						<Paper style={style.transaction_card} zDepth={3}>
							<div className='container center'>
								<br />
								<h3>No perks</h3>
								<br />
							</div>
						</Paper>
						<br />
					</div>
			}
		</div>
	</div>
)

class MarketContainer extends Component {
	componentDidMount() {
		const user_data = JSON.parse(localStorage.getItem('user'))
		this.props.getPerkData(user_data.company)
	}

	render() {
		const { loading, data } = this.props
		return (
			<div>
				{
					loading ?
					<Loader/> :
					<Market data={data}/>
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { data, loading } = state.perk
	return {
		data,
		loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPerkData: bindActionCreators(getPerkData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketContainer)