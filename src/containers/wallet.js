import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import { RaisedButton, Dialog, FlatButton } from 'material-ui';


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
		return (
			<div className='container'>
				<div className='row'>
				<br/>
					<div className='col-12'>
						<Paper style={style.balance_card} zDepth={3}>
							<div className='container'>
								<p>Balance</p>
								<h1>11.11 HIVE</h1>
							</div>
							<div className='row'>
								<div className='col-6'>
									<RaisedButton onClick={() => this.handleToken_dialog_msg("Receive Tokens") } primary={true} label="Receive Tokens" />
								</div>
								<div className='col-6'>
									<RaisedButton onClick={() => this.handleToken_dialog_msg("Send Tokens")} primary={true} label="Send Tokens" />
								</div>
							</div>
							<br />
						</Paper>
					</div>
					<div className='col-12'>
						<Paper zDepth={3}>
							<div className='container'>
								<div className='row'>
									<br />
									<h3>Transactions</h3>
								</div>
								<div className='row'>
									<h5 className='f-right'>-200</h5>
									<h5 className='f-left'>6 hours ago</h5>
								</div>
								<div className='row'>
									<h5 className='f-right'>400</h5>
									<h5 className='f-left'>7 hours ago</h5>
								</div>
								<div className='row'>
									<h5 className='f-right'>200</h5>
									<h5 className='f-left'>9 hours ago</h5>
								</div>
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

const style = {
	balance_card: {
		width: '100%',
		textAlign: 'center',
		display: 'inline-block',
	},
	card: {
		height: 80,
		width: '100%'
	}
};