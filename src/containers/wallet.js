import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import { RaisedButton, Dialog, FlatButton, TextField } from 'material-ui';
import moment from 'moment'
import { BigNumber } from 'bignumber.js'
import { getWalletData } from '../actions/wallet'
import { createSend } from '../actions/transaction'
import FontIcon from "material-ui/FontIcon";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from '../components/loader'
import CopyToClipboard from 'react-copy-to-clipboard'
import { style } from '../style/'

class Wallet extends Component {
	state = {
		token_dialog_msg: "",
		recipient: '',
		memo: '',
		amount: ''
	};

	handleToken_dialog_msg = (msg) => {
		this.setState({ token_dialog_msg: msg });
	};

	handleClose = () => {
		this.setState({ token_dialog_msg: "" });
	};

	render() {

		const { data, loading, err, createSend } = this.props

		const user_data = JSON.parse(localStorage.getItem('user'))

		const x = data && data.balance && new BigNumber(data.balance.available_balance)
		const balance = x && x.dividedBy(10000000).toString() + ' ' + data.balance.currency.code

		const issuer = 'GBIR5GY3XE35Q7BFQ2FUVTB4VMQYD4VRZ36Q4OAVKFBJBK343KNOSNL3';

		const amount_is_greater = this.state.amount > x;
		
		return (
			<div className='container'>
				{
					loading ?
					<Loader/> :
						(
							err ?
							<h3>{err}</h3> :
								<div className='row'>
									<br />
									<div className='col-12'>
										<Paper style={style.card} zDepth={3}>
											<div style={style.card_left}>
												<img style={style.card_left_img} src='trading1.svg' alt='logo' />
											</div>
											<div style={{ width: '200px' }} className='right'>
												<h3 className='card-heading'>Balance</h3>
												
												<h2>{balance}</h2>
												
												<br />
												<RaisedButton style={{ width: '100%', marginBottom: '5px' }} onClick={() => this.handleToken_dialog_msg("Send")} primary={true} label="Send" />
												<RaisedButton style={{ width: '100%' }} onClick={() => this.handleToken_dialog_msg("Withdraw")} primary={true} label="Withdraw" />
											</div>
										</Paper>
										<br />
									</div>

									<div className='col-12'>
										<Paper style={style.transaction_card} zDepth={3}>
											<div className='container'>
												<div className='row'>
													<br />
													<h3 className='transaction-heading' >Transactions</h3>
												</div>
												{
													data && data.transactions && data.transactions.length > 0 ?
														data.transactions.map((t, index) => {
															const x = new BigNumber(t.amount)
															const amount = x.dividedBy(10000000).toString()
															return (
																
																<div key={index} className='row'>
																	<img style={style.card_transactions_img} src='coins1.svg' alt='logo' />
																	<h5 style={{
																		paddingTop: '14px'
																	}}>
																		{amount}<br/>
																		<small>{moment(t.created).fromNow()} ({t.status})</small>
																	</h5>
																</div>
															)
														}) :
														<div className='row'>
															<h5 className='f-left'>No Transactions</h5>
														</div>
												}
											</div>
										</Paper>
									</div>
								</div>
						)
				}
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
					open={this.state.token_dialog_msg ? true : false}
					onRequestClose={this.handleClose}
				>
					<div style={{
							alignContent: 'center',
							textAlign: 'center',
						}} className="center">
						{
							this.state.token_dialog_msg === "Withdraw" ?
							<div>
								<h3>{this.state.token_dialog_msg} Tokens</h3>
								<b>Add a trustline in the receiving wallet before withdrawing:</b><br/>
								<p style={{ display: 'inline' }}>Asset: RHC <br/>Issuer:</p> <TextField style={{ width: '60%'}} name="issuer" ref="issuer" value={issuer} disabled />
								<CopyToClipboard style={{paddingLeft: '5px'}} text={issuer} onCopy={() => alert("Copied")}>
									<FontIcon className="material-icons">content_copy</FontIcon>
								</CopyToClipboard>
								<br/>
							</div> : <h3>{this.state.token_dialog_msg} Tokens</h3>
						}
						<TextField 
							value={this.state.recipient} 
							type="text" 
							hintText={ this.state.token_dialog_msg === 'Withdraw' ? "Stellar Address" : "Email"}
							onChange={e => this.setState({ recipient: e.target.value })}
						/>
						<br/>
						<TextField 
							value={this.state.amount} 
							type="number"
							onChange={e => this.setState({ amount: e.target.value })}
							hintText="Amount" 
						/>
						<br/>
						{
							this.state.token_dialog_msg === 'Withdraw' ?
							<TextField 
								value={this.state.memo} 
								type="text" 
								onChange={e => this.setState({ memo: e.target.value })}
								hintText="Memo" 
							/> : null
						}
						<br/>
						{
							amount_is_greater ?
							<p>Insufficient funds</p> : null
						}
						<FlatButton
							label="Close"
							primary={true}
							onClick={this.handleClose}
						/>
						<FlatButton
							label="Submit"
							primary={true}
							disabled={amount_is_greater}
							onClick={() => {
								const data = {
									reference: this.state.recipient,
									currency: user_data && user_data.currency && user_data.currency.code,
									amount: this.state.amount * 10000000,
									company: user_data && user_data.company
								}

								if (this.state.memo) {
									data['memo'] = this.state.memo
								}
								createSend(data)
							}}
						/>
					</div>
				</Dialog>
			</div>
		)
	}
}

class WalletContainer extends Component {
	componentDidMount() {
		this.props.getWalletData()
	}

	render() {
		const { data, loading, err, createSend } = this.props
		return (
			<Wallet data={data} loading={loading} createSend={createSend} err={err}/>
		)
	}
}

function mapStateToProps(state) {
	return {
		data: state.wallet.data,
		loading: state.wallet.loading,
		err: state.wallet.err
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getWalletData: bindActionCreators(getWalletData, dispatch),
		createSend: bindActionCreators(createSend, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer)