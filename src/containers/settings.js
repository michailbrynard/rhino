import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import { style } from '../style/'
import TextField from 'material-ui/TextField/TextField';
import Loader from '../components/loader'
import { RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs'
import { getCampaignData } from '../actions/campaign'

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

		const { data } = this.props

		console.log("DATA IN PERKS", data);
		return (
			<div className='container'>
				<br />
				<h3>Rewards</h3>
				{
					data && data.length > 0 ?
					data.map((item, index) => (
							<div key={index} className='row'>
								<h5 className='f-right'>{item.reward_amount}</h5>
								<h5 className='f-left'>{item.reward_type}</h5>
							</div>
					)) :
					<h5>No Rewards</h5>
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
	}

	render() {
		const { data, loading } = this.props

		return (
			<div>
				{
					loading ?
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
												<PerksRewards data={data} />
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
		loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getCampaignData: bindActionCreators(getCampaignData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)