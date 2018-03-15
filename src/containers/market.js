import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Loader from '../components/loader'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPerkData } from '../actions/perk'
import { createDebit } from '../actions/transaction'
import { style } from '../style/'

class Market extends Component {
	constructor(props) {
		super(props)
		this.state = {
			perk_amount: false
		}
	}

	render() {
		const { data, createDebit, debit_data } = this.props
		const user_data = JSON.parse(localStorage.getItem('user'))

		return (
			<div className='container'>
				<Dialog
					contentStyle={{ maxWidth: "360px" }}
					autoDetectWindowHeight={true}
					modal={false}
					open={this.state.perk_amount ? true : false}
					onRequestClose={() => this.setState({ perk_amount: ''})}
				>
					<div className='container center'>
						<h3>Are you sure you want to purchase this perk?</h3>
						<form onSubmit={(e) => {
							e.preventDefault()
							createDebit(user_data && user_data.currency && user_data.currency.code, this.state.perk_amount)
						}}>
							<FlatButton
								label="Cancel"
								primary={true}
								onClick={() => this.setState({ perk_amount: '' })}
							/>
							<FlatButton
								label="Yes"
								primary={true}
								keyboardFocused={true}
								type='submit'
							/>
						</form>
					</div>
				</Dialog>
				<div >
					<br />
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
							</div> :
							<div className='row'>
								{
									data && data.length > 0 ?
										data.map((item, index) => (
											<div key={index} className='col-12'>
												<Paper onClick={() => this.setState({ perk_amount: item.perk_amount })} style={style.card} zDepth={3}>
													<div style={style.card_left}>
														<img style={style.card_left_img} alt='logo' src='logo.png' />
													</div>
													<div style={style.card_right} className='right'>
														<h3>{item.perk_name}</h3>
														<h1>{item.perk_amount} {user_data && user_data.currency && user_data.currency.code}</h1>
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
	}
}

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