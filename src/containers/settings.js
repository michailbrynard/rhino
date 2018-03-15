import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import { style } from '../style/'
import TextField from 'material-ui/TextField/TextField';
import Loader from '../components/loader'
import { RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs'
import { getCampaignData } from '../actions/campaign'
import Toggle from 'material-ui/Toggle';
import { getPerkData } from '../actions/perk'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import company_data from './config.json'
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
	render() {

		const { reward_data, perk_data } = this.props
		return (
			<div className='container'>
				<br />
				<h3>Rewards</h3>
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
				<h3>Perks</h3>
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
				<RaisedButton onClick={this.submit} label="Submit" />
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