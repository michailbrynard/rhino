import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField/TextField';
import { RaisedButton, FlatButton } from 'material-ui';
import moment from 'moment'
import Loader from '../components/loader'
import { BigNumber } from 'bignumber.js' 
import company_data from './config.json'
import { addPerkData, deletePerkData } from '../actions/admin'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPerkData } from '../actions/perk'
import { createSend } from '../actions/transaction'
import { style } from '../style/'

class Market extends Component {
	constructor(props) {
		super(props)
		this.state = {
			perk_amount: false,
			modal_type: false,
			
			// For add
			name: "",
			description: "",
			amount: '',

			// For delete
			delete_name: null
		}
	}


	render() {
		const { data, createSend, debit_data, debit_loading, debit_error, addPerkData, deletePerkData } = this.props
		const user_data = JSON.parse(localStorage.getItem('user'))
		const isAdmin = user_data && user_data.groups.filter(i => i.name ===  'admin').length > 0;

		return (
			<div className='container'>
				<Dialog
					contentStyle={{ maxWidth: "360px" }}
					autoDetectWindowHeight={true}
					modal={false}
					open={this.state.modal_type ? true : false}
					onRequestClose={() => this.setState({ modal_type: null })}
				>
					<div style={{
						alignContent: 'center',
						textAlign: 'center',
					}}>
						<h3>{this.state.modal_type === "Delete" ? "Delete Perk" : "Add Perk" }</h3>
						<form onSubmit={(e) => {
							e.preventDefault()
							let data
							const token = localStorage.getItem('token')

							
							 if (this.state.modal_type === "Add") {
								data = { 
									company: process.env.REACT_APP_COMPANY_IDENTIFIER,
									perk_name: this.state.name, 
									description: this.state.description,
									perk_amount: this.state.amount
								}
								addPerkData(data, token)
							} else {
								deletePerkData(this.state.delete_name, token)
							}
						}}>
							{
								this.state.modal_type !== "Delete" ?
								<div>
										<TextField
											value={this.state.name}
											onChange={e => this.setState({ name: e.target.value })}
											hintText={this.state.modal_type + " Name"}
											type='text'
										/><br />
										<TextField
											value={this.state.description}
											onChange={e => this.setState({ description: e.target.value })}
											hintText={this.state.modal_type + " Description"}
											type='text'
										/><br />
										<TextField
											value={this.state.amount}
											onChange={e => this.setState({ amount: e.target.value })}
											hintText="Amount"
											type='number'
										/><br />
								</div> :
								<h5>Are you sure you want to delete this perk?</h5>
							}
							<FlatButton
								label="Cancel"
								primary={true}
								onClick={() => this.setState({ modal_type: null, delete_name: null })}
							/>
							<FlatButton
								label={this.state.modal_type === "Delete" ? "Delete" : "Add"}
								primary={true}
								keyboardFocused={true}
								type='submit'
							/>
						</form>
					</div>
				</Dialog>
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
							const data = {
								reference: company_data.admin_email,
								currency: user_data && user_data.currency && user_data.currency.code,
								amount: this.state.perk_amount
							}

							createSend(data)
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
												<Paper style={style.card_header} zDepth={3}>
													<div style={style.card_left}>
														<img style={style.card_left_img} src='trading1.svg' alt='earn' />
													</div>
													<div style={style.card_right} className='right'>
														<h3>Purchase Perks</h3>
														<p>Use your tokens to buy Supporter perks!</p>
														{ isAdmin ? <RaisedButton fullWidth={true} onClick={() => this.setState({ modal_type: "Add" })} className="f-right" primary={true} label="Add Perk" /> : null}
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
																	{
																		isAdmin ?
																		<i style={style.settings_close} onClick={() => this.setState({ modal_type: "Delete", delete_name: item.identifier })} className="material-icons f-right">close</i> :
																		null
																	}
																	<div style={style.card_left}>
																		<img style={style.card_left_img} alt='logo' src='trading1.svg' />
																	</div>
																	<div style={style.card_right} className='right'>
																		<h3>{item.perk_name}</h3>
																		<p>{item.description}</p>
																		<h1>{perk_amount} {user_data && user_data.currency && user_data.currency.code}</h1>
																		<RaisedButton onClick={() => this.setState({ perk_amount: item.perk_amount })} className="f-right" primary={true} label="Buy"/>
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
		const { loading, data, createSend, debit_data, debit_loading, debit_error, addPerkData, deletePerkData, add_result } = this.props

		if (add_result) {
			window.location.reload()
		}

		return (
			<div>
				{
					loading ?
					<Loader/> :
					<Market 
						debit_data={debit_data} 
						debit_loading={debit_loading} 
						debit_error={debit_error} 
						createSend={createSend} 
						data={data}
						addPerkData={addPerkData}
						deletePerkData={deletePerkData}
					/>
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
		debit_error: state.transaction.err,

		add_result: state.admin && state.admin.data
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPerkData: bindActionCreators(getPerkData, dispatch),
		createSend: bindActionCreators(createSend, dispatch),

		addPerkData: bindActionCreators(addPerkData, dispatch),
		deletePerkData: bindActionCreators(deletePerkData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketContainer)