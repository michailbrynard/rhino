import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import Loader from '../components/loader'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPerkData } from '../actions/perk'
import { createDebit } from '../actions/transaction'
import { style } from '../style'

const Market = ({ data, createDebit, debit_data }) => (
	<div className='container'>
		<div >
		<br/>
			{
				debit_data ?
						<div className='col-12'>
							<Paper style={style.transaction_card} zDepth={3}>
								<div className='container center'>
									<br />
									<h3>Successfully Bought</h3>
									<br />
								</div>
							</Paper>
							<br />
						</div>:
					<div className='row'>
						{
							data && data.length > 0 ?
								data.map((item, index) => (
									<div key={index} className='col-12'>
										<Paper onClick={() => createDebit("HIVE", item.perk_amount)} style={style.card} zDepth={3}>
											<div style={style.card_left}>
												<img style={style.card_left_img} alt='logo' src='logo.png' />
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
		const { loading, data, createDebit, debit_data } = this.props
		return (
			<div>
				{
					loading ?
					<Loader/> :
					<Market debit_data={debit_data} createDebit={createDebit} data={data}/>
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { data, loading, debit_data } = state.perk
	return {
		data,
		loading,
		debit_data
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPerkData: bindActionCreators(getPerkData, dispatch),
		createDebit: bindActionCreators(createDebit, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketContainer)