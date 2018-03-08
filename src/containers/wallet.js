import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import { RaisedButton, Dialog, FlatButton } from 'material-ui';
import moment from 'moment'

import { style } from '../style'

export default class extends Component {
	state = {
		token_dialog_msg: "",
	};

	handleToken_dialog_msg = (msg) => {
		this.setState({ token_dialog_msg: msg });
	};

	handleClose = () => {
		this.setState({ token_dialog_msg: "" });
	};

	render() {

		const user_data = JSON.parse(localStorage.getItem('user'))

		return (
			<div className='container'>
				<div className='row'>
					<br />
					<div className='col-12'>
						<Paper style={style.balance_card} zDepth={3}>
							<div className='container'>
								<p>Balance</p>
								<h1>{user_data && user_data.balance && user_data.balance.balance} {user_data && user_data.currency && user_data.currency.code}</h1>
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
									user_data && user_data.transactions && user_data.transactions.length > 0 ?
									user_data.transactions.map((t, index) => (
											<div className='row'>
												<h5 className='f-right'>{t.tx_type === 'credit' ? '+' : '-'}{t.amount}</h5>
												<h5 className='f-left'>{moment(t.created).fromNow()}</h5>
											</div>
									)) :
										<div className='row'>
											<h5 className='f-right'></h5>
											<h5 className='f-left'>No Transactions</h5>
										</div>
								}
							</div>
						</Paper>
					</div>
				</div>
				<Dialog
					title={this.state.token_dialog_msg}
					actions={[
						<FlatButton
							label="Close"
							primary={true}
							onClick={this.handleClose}
						/>
					]}
					modal={false}
					open={this.state.token_dialog_msg ? true : false}
					onRequestClose={this.handleClose}
				>
					Dialog for {this.state.token_dialog_msg}
					{
						this.state.token_dialog_msg === "Receive Tokens" ?
							<img style={{
								height: 300,
								width: 300
							}} src="qr.jpg" /> : null
					}
				</Dialog>
			</div>
		)
	}
}