import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import { BigNumber } from 'bignumber.js' 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TextField from 'material-ui/TextField/TextField';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog'

import FlatButton from 'material-ui/FlatButton'

import DatePicker from 'material-ui/DatePicker';

import moment from 'moment'
import { getCampaignData, postClaimReward } from '../actions/campaign'
import { addRewardData, deleteRewardData } from '../actions/admin'

import Loader from '../components/loader'
import { style } from '../style/'

class Earn extends Component {
	constructor(props) {
		super(props)

		this.state = {
			modal_type: false,

			name: "",
			description: "",
			amount: '',
			enabled: false,
			user_limit: '',
			volume_limit: '',
			start_date: moment(),
			end_date: moment()
		}
	}

	render() {
		const { data, currency, postClaimReward,  addRewardData, deleteRewardData } = this.props

		const user_data = JSON.parse(localStorage.getItem('user'))
		const isAdmin = user_data && user_data.groups.filter(i => i.name ===  'admin').length > 0;

		return (
			<div className='container'>
			{
					isAdmin ?
					<Dialog
						repositionOnUpdate={false}
						autoDetectWindowHeight={false}
						autoScrollBodyContent={false}
						contentStyle={{
							width: '100%',
							maxWidth: '450px',
							maxHeight: '100% !important'
						}}
						bodyStyle={{
							maxHeight: '100% !important'
						}}
						style={{
							paddingTop:'0 !important',
							marginTop:'-65px !important',
							bottom: '0 !important',
							overflow: 'scroll !important',
							height: 'auto !important'
						}}
						open={this.state.modal_type ? true : false}
						onRequestClose={() => this.setState({ modal_type: null })}
					>
						<div style={{
							alignContent: 'center',
							textAlign: 'center',
						}}>
							<h3>{ this.state.modal_type + " Reward" }</h3>
							<form onSubmit={(e) => {
								e.preventDefault()
								let data
								const token = localStorage.getItem('token')

								
								if (this.state.modal_type === "Add") {
									data = {
										company: process.env.REACT_APP_COMPANY_IDENTIFIER,
										start_date: moment(this.state.start_date).format('YYYY-MM-DD'),
										end_date: moment(this.state.end_date).format('YYYY-MM-DD'),
										reward_type: this.state.name,
										description: this.state.description,
										reward_amount: this.state.amount,
										status: 'true',
										volume_limit: this.state.volume_limit,
										user_limit: this.state.user_limit
									}
									console.log('STATE', data);
									addRewardData(data, token)
								}  else {
									deleteRewardData(this.state.delete_name, token)
								}


							}}>
								{
									
									this.state.modal_type !== "Delete" ?
									<div>
											<TextField
												value={this.state.name}
												onChange={e => this.setState({ name: e.target.value })}
												hintText={"Reward Name"}
												type='text'
											/><br />
											<TextField
												value={this.state.description}
												onChange={e => this.setState({ description: e.target.value })}
												hintText={"Reward Description"}
												type='text'
											/><br />
											<TextField
												value={this.state.amount}
												onChange={e => this.setState({ amount: e.target.value })}
												hintText="Amount"
												type='number'
											/><br />
											<TextField
												value={this.state.volume_limit}
												onChange={e => this.setState({ volume_limit: e.target.value })}
												hintText="Volume Limit"
												type='number'
											/><br />
											<TextField
												value={this.state.user_limit}
												onChange={e => this.setState({ user_limit: e.target.value })}
												hintText="User Limit"
												type='number'
											/><br />
											<DatePicker value={this.state.start_date} onChange={(e, date) => this.setState({ start_date: date })} hintText="Start Date" />
											<DatePicker value={this.state.end_date} onChange={(e, date) => this.setState({ end_date: date })} hintText="End Date" />
											<br/>
											<Toggle
												label="Enabled"
												value={this.state.enabled}
												onChange={() => this.setState({ enabled: !this.state.enabled })}
											/>
									</div> :
									<h5>Are you sure you want to delete {this.state.delete_name}?</h5>
								}
								<FlatButton
									label="Cancel"
									primary={true}
									onClick={() => this.setState({ modal_type: null, delete_name: null })}
								/>
								<FlatButton
									label={this.state.modal_type || "Add"}
									primary={true}
									keyboardFocused={true}
									type='submit'
								/>
							</form>
						</div>
					</Dialog> :
					null
				}
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
								{ isAdmin ? <RaisedButton fullWidth={true} onClick={() => this.setState({ modal_type: "Add" })} className="f-right" primary={true} label="Add Reward" /> : null}
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
									{
										isAdmin ?
										<i style={style.settings_close} onClick={() => this.setState({ modal_type: "Delete", delete_name: item.reward_type })} className="material-icons f-right">close</i> :
										null
									}
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
													reward_type: item.reward_type,
													user: user_data.email,
													currency_code: currency
												}
												postClaimReward(data)
											}} className="f-right" primary={true} label="Claim" />

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
	}
}

class EarnContainer extends Component {

	componentDidMount() {
		const user_data = JSON.parse(localStorage.getItem('user'))
		this.props.getCampaignData(user_data.company)
	}

	render() {
		const { data, loading, postClaimReward,  addRewardData, deleteRewardData, add_result } = this.props
		const user_data = JSON.parse(localStorage.getItem('user'))

		if (add_result) {
			window.location.reload()
		}

		return (
			<div>
				{
					loading ?
					<Loader/> :
						<Earn 
							postClaimReward={postClaimReward} 
							data={data} 
							currency={user_data && user_data.currency && user_data.currency.code} 
							addRewardData={addRewardData}
							deleteRewardData={deleteRewardData}
						/>
				}
			</div>
		)
	}
}



function mapStateToProps(state) {
	const { data, loading } = state.campaign
	return {
		data,
		loading,
		add_result: state.admin && state.admin.data
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getCampaignData: bindActionCreators(getCampaignData, dispatch),
		postClaimReward: bindActionCreators(postClaimReward, dispatch),

		addRewardData: bindActionCreators(addRewardData, dispatch),
		deleteRewardData: bindActionCreators(deleteRewardData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EarnContainer)