import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Loader from '../components/loader'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getRewardRequests, approveReward, rejectReward } from '../actions/reward_requests'

import { style } from '../style/'

class RewardRequests extends Component {
	constructor(props) {
		super(props)
		this.state = {
			reward_identifier: false
		}
	}

	render() {
		const { data, err, approveReward, rejectReward } = this.props
		
		return (
			<div className='container'>
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
					open={this.state.reward_identifier ? true : false}
					onRequestClose={() => this.setState({ reward_identifier: '' })}
				>
					<div style={{
						alignContent: 'center',
						textAlign: 'center',
					}}>
						<h3>Are you sure you want to {
							this.state.reject ? "reject" : "approve"
						} this request?</h3>
						{
							err ?
								<h3>{err}</h3> : null
						}
						<form onSubmit={(e) => {
							e.preventDefault()
							if (this.state.reject) {
								rejectReward({ identifier: this.state.reward_identifier })
							} else {
								approveReward({ identifier: this.state.reward_identifier })
							}
						}}>
							<FlatButton
								label="Cancel"
								primary={true}
								onClick={() => this.setState({ reward_identifier: '', reject: null })}
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
				<div className='row'>
					<div className='col-12'>
						<Paper style={style.card_header} zDepth={3}>
							<div style={style.card_left}>
								<img style={style.card_left_img} src='trading1.svg' alt='earn' />
							</div>
							<div style={style.card_right} className='right'>
								<h3>Reward Requests</h3>
								<p>Approve reward claim requests</p>
							</div>
						</Paper>
						<br />
					</div>
					{
						data && data.filter(i => i.state === 'pending').length > 0 ?
							data.filter(i => i.state === 'pending').map((item, index) => {
								return (
									<div key={index} className='col-12'>
										<Paper style={style.card} zDepth={3}>
											<div style={style.card_left}>
												<img style={style.card_left_img} alt='logo' src='trading1.svg' />
											</div>
											<div style={style.card_right} className='right'>
												<h3>{item.reward_type}</h3>
												<p>{item.user}</p>
												<div>
													{
														item.state === 'pending' ?
															<RaisedButton fullWidth={true} onClick={() => this.setState({ reward_identifier: item.identifier })} className="f-right" primary={true} label="Approve" /> :
															<RaisedButton className="f-right" disabled={true} label="Approved" />
													}
												</div>
													<br/><br/><br/>
												<div>
													{
														item.state === 'pending' ?
															<RaisedButton fullWidth={true} onClick={() => this.setState({ reward_identifier: item.identifier, reject: true })} className="f-right" primary={true} label="Reject" /> :
															null
													}
												</div>
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
										<h3>No Reward Requests</h3>
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

class RewardRequestsContainer extends Component {
	componentDidMount() {
		const user_data = JSON.parse(localStorage.getItem('user'))
		this.props.getRewardRequests(user_data.company)
	}

	render() {
		const { loading, data, err, approveReward, rejectReward } = this.props
		return (
			<div>
				{
					loading ?
						<Loader /> :
						err ?
						<div className="container center">
								<h3>An error occurred</h3>
						</div> :
							<RewardRequests err={err} data={data} approveReward={approveReward} rejectReward={rejectReward} />
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { data, loading, err } = state.reward_requests
	return {
		data,
		loading,
		err
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getRewardRequests: bindActionCreators(getRewardRequests, dispatch),
		approveReward: bindActionCreators(approveReward, dispatch),
		rejectReward: bindActionCreators(rejectReward, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardRequestsContainer)