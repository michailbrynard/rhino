import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import { RaisedButton, Dialog, FlatButton, TextField } from 'material-ui';
import moment from 'moment'
import { BigNumber } from 'bignumber.js'
import { getWalletData } from '../actions/wallet'
import { createSend } from '../actions/transaction'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from '../components/loader'
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

		const x = data && data.balance && new BigNumber(data.balance.balance)
		const balance = x && x.dividedBy(10000000).toString() + ' ' + data.balance.currency.code
		
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
										<Paper style={style.balance_card} zDepth={3}>
											<div className='container'>
												<p>Balance</p>
												<h1>{ balance } </h1>
											</div>
											<div className='row'>
												<div className='col-6-sm'>
													<RaisedButton onClick={() => this.handleToken_dialog_msg("Receive Tokens")} primary={true} label="Receive" />
												</div>
												<div className='col-6-sm'>
													<RaisedButton onClick={() => this.handleToken_dialog_msg("Send Tokens")} primary={true} label="Send" />
												</div>
											</div>
											<br />
										</Paper>
									</div>
									<div className='col-12'>
										<Paper style={style.transaction_card} zDepth={3}>
											<div className='container'>
												<div className='row'>
													<br />
													<h3>Transactions</h3>
												</div>
												{
													data && data.transactions && data.transactions.length > 0 ?
														data.transactions.map((t, index) => {
															const x = new BigNumber(t.amount)
															const amount = x.dividedBy(10000000).toString()
															return (
																<div key={index} className='row'>
																	<h5 className='f-right'>{amount}</h5>
																	<h5 className='f-left'>{moment(t.created).fromNow()} ({t.status})</h5>
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
					title={this.state.token_dialog_msg}
					actions={[
						<FlatButton
							label="Close"
							primary={true}
							onClick={this.handleClose}
						/>,
						<FlatButton
							label="Submit"
							primary={true}
							onClick={() => {
								const data = {
									reference: this.state.recipient,
									currency: 'SHAPE',
									amount: this.state.amount * 10000000,
									memo: this.state.memo
								}
								createSend(data)
							}}
						/>
					]}
					modal={false}
					open={this.state.token_dialog_msg ? true : false}
					onRequestClose={this.handleClose}
					style={{ textAlign: 'center' }}
				>
					{
						this.state.token_dialog_msg === "Receive Tokens" ?
							<img style={{
								height: 300,
								width: 300
							}} src="qr.jpg" alt='qr' /> : (
								<div className="center">
									<p><b>Add a trustline in the receiving wallet before sending:</b><br />
									Asset: SHAPE<br />
									Issuer: BPRS63VQIKJP5VNNEV3TQEH6FCVMTZ6ZHK4CJFPLKKPXLBVYFZ62HJP</p>
									<TextField 
										value={this.state.recipient} 
										type="text" 
										hintText="Email or stellar address" 
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
									<TextField 
										value={this.state.memo} 
										type="text" 
										onChange={e => this.setState({ memo: e.target.value })}
										hintText="Memo" 
									/>
								</div>
							)
					}
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