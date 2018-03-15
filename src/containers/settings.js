import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import { style } from '../style/'
import TextField from 'material-ui/TextField/TextField';
import Loader, { SmallLoader } from '../components/loader'
import { RaisedButton, FlatButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs'
import { getCampaignData } from '../actions/campaign'
import Toggle from 'material-ui/Toggle';
import { getPerkData } from '../actions/perk'
import Dialog from 'material-ui/Dialog'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import company_data from './config.json'
import { callApi } from '../utils';
class Settings extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className='container'>
				<br />
				<h3>Company Info</h3>
				<TextField
					floatingLabelText="Display Name"
					value={company_data && company_data.display_name}
				/>

				<TextField
					hintText="Subtitle"
					value={company_data && company_data.subtitle}
					floatingLabelText="Subtitle"
					multiLine={true}
					rows={2}
				/>

				<TextField
					hintText="Card Display Name"
					value={company_data && company_data.card_display_name}
					floatingLabelText="Card Display Name"
				/>

				<TextField
					hintText="Description"
					value={company_data && company_data.description}
					floatingLabelText="Description"
					multiLine={true}
					rows={2}
				/>
				<br/>
				<RaisedButton onClick={this.submit} label="Submit" />
			</div>
		)
	}
}

class PerksRewards extends Component {

	constructor(props) {
		super(props)
		this.state = {
			addtype: false,
			name: "",
			amount: "",
			enabled: false,
			user_limit: "",
			volume_limit: "'"
		}
	}
	render() {

		const { reward_data, perk_data } = this.props
		return (
			<div className='container'>
				<Dialog
					contentStyle={{ maxWidth: "360px" }}
					autoDetectWindowHeight={true}
					modal={false}
					open={this.state.addtype ? true : false}
					onRequestClose={() => this.setState({ addtype: null })}
				>
					<div className='container center'>
						<h3>Add {this.state.addtype}</h3>
						<form onSubmit={(e) => {
							e.preventDefault()
							
							let route 
							let data = {
								company: process.env.REACT_APP_COMPANY_IDENTIFIER,
								start_date: '2018-03-01',
								end_date: '2018-04-01',
								reward_type: this.state.name,
								reward_amount: this.state.amount,
								status: 'true',
								volume_limit: this.state.volume_limit,
								user_limit: this.state.user_limit
							}
							console.log("DATA FOR SUBMIT", data);
							if (this.state.addtype === "Reward") {
								route = 'campaign/'
							}

							// TODO: Move this to redux action. 
							const token = localStorage.getItem('token')
							callApi('POST', process.env.REACT_APP_API_URL + '/admin/' + route, token, data)
							.then(result => {
								console.log("RESULT FROM POST");
								
							})

						}}>
							<TextField
								value={this.state.name}
								onChange={e => this.setState({ name: e.target.value })}
								hintText={this.state.addtype + " Name"}
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
							<Toggle
								label="Enabled"
								value={this.state.enabled}
								onChange={() => this.setState({ enabled: !this.state.enabled })}
							/>
							<FlatButton
								label="Cancel"
								primary={true}
								onClick={() => this.setState({ addtype: null })}
							/>
							<FlatButton
								label="Add"
								primary={true}
								keyboardFocused={true}
								type='submit'
							/>
						</form>
					</div>
				</Dialog>
				<br/>
				<div className='row'>
					<h3 className='f-left card-heading'>Rewards</h3>
					<RaisedButton className='f-right' onClick={() => this.setState({ addtype: "Reward" })} label="Add" />
				</div>
				<br/>
				{
					reward_data && reward_data.length > 0 ?
					reward_data.map((item, index) => (
							<Paper key={index} className='row'>
								<div className="container">
									<h5 className='f-right'>{item.reward_amount}</h5>
									<h5 className='f-left'>{item.reward_type.toUpperCase()}</h5>
									<Toggle
										label={item.status ? "Enabled" : "Disabled"}
										value={item.status}
									/>
								</div>
								<br/>
							</Paper>
					)) :
					<h5>No Rewards</h5>
				}
				<br/><br/>
				<div className='row'>
					<h3 className='f-left card-heading'>Perks</h3>
					<RaisedButton className='f-right' onClick={() => this.setState({ addtype: "Perk" })} label="Add" />
				</div>
				<br/>
				{
					perk_data && perk_data.length > 0 ?
						perk_data.map((item, index) => (
							<Paper key={index} className='row'>
								<div className="container">
									<h5 className='f-right'>{item.perk_amount}</h5>
									<h5 className='f-left'>{item.perk_name}</h5>
									<Toggle
										label={item.status ? "Enabled" : "Disabled"}
										value={item.status}
									/>
								</div>
								<br />
							</Paper>
						)) :
						<h5>No Perks</h5>
				}
			</div>
		)
	}
}

class SettingsContainer extends Component {

	componentDidMount() {
		const user_data = JSON.parse(localStorage.getItem('user'))
		this.props.getCampaignData(user_data.company)
		this.props.getPerkData(user_data.company)
	}

	render() {
		const { data, loading, loading_perks, perk_data } = this.props

		return (
			<div>
				{
					loading || loading_perks ?
						<Loader /> :
						<div className='container'>
							<div className='row'>
								<br />
								<div className='col-12'>
									<Paper style={style.settings_card} zDepth={3}>
										<Tabs>
											<Tab label="Company">
												<Settings />
											</Tab>
											<Tab label="Perks/Rewards">
												<PerksRewards perk_data={perk_data} reward_data={data} />
											</Tab>
										</Tabs>
									</Paper>
									<br />
								</div>
							</div>
						</div>
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { data, loading } = state.campaign
	return {
		data,
		perk_data: state.perk.data,
		loading_perks: state.perk.loading,
		loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPerkData: bindActionCreators(getPerkData, dispatch),
		getCampaignData: bindActionCreators(getCampaignData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)