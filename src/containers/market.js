import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Loader from '../components/loader'
import { BigNumber } from 'bignumber.js' 

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
		const { data, createDebit, debit_data, debit_loading, debit_error } = this.props
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
					<div style={{
						alignContent: 'center',
						textAlign: 'center',
					}}>
						<h3>Are you sure you want to purchase this perk?</h3>
						{
							debit_error ?
								<h3>{debit_error}</h3> : null
						}
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
						debit_loading ?
						<Loader/> :
						<div>
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
											<div className='col-12'>
												<Paper style={style.card} zDepth={3}>
													<div style={style.card_left}>
														<img style={style.card_left_img} src='trading1.svg' alt='earn' />
													</div>
													<div style={style.card_right} className='right'>
														<h3>Purchase Perks</h3>
														<p>Use your tokens to purchase perks</p>
													</div>
												</Paper>
												<br />
											</div>
											{
												data && data.length > 0 ?
													data.map((item, index) => {
														const x = new BigNumber(item.perk_amount)
														const perk_amount = x.dividedBy(10000000).toString()
														return (
															<div key={index} className='col-12'>
																<Paper style={style.card} zDepth={3}>
																	<div style={style.card_left}>
																		<img style={style.card_left_img} alt='logo' src='trading1.svg' />
																	</div>
																	<div style={style.card_right} className='right'>
																		<h3>{item.perk_name}</h3>
																		<p>{item.description}</p>
																		<h1>{perk_amount} {user_data && user_data.currency && user_data.currency.code}</h1>
																		<RaisedButton onClick={() => this.setState({ perk_amount: perk_amount })} className="f-right" primary={true} label="Buy"/>
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
		const { loading, data, createDebit, debit_data, debit_loading, debit_error } = this.props
		return (
			<div>
				{
					loading ?
					<Loader/> :
					<Market debit_data={debit_data} debit_loading={debit_loading} debit_error={debit_error} createDebit={createDebit} data={data}/>
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { data, loading } = state.perk
	return {
		data,
		loading,
		debit_data: state.transaction.data,
		debit_loading: state.transaction.loading,
		debit_error: state.transaction.err
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPerkData: bindActionCreators(getPerkData, dispatch),
		createDebit: bindActionCreators(createDebit, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketContainer)