import React from 'react'
import Paper from 'material-ui/Paper';

export default () => (
	<div>
		<div className='row'>
			<div className='col-12'>
				<h2>Wallet</h2>
			</div>
			<div className='col-12'>
				<Paper style={style.balance_card} zDepth={3}>
					<div className='container'>
						<p>Balance</p>
						<h1>GUT 2300.3459</h1>
					</div>
				</Paper>
			</div>
			<div className='col-12'>
				<h2>Transactions</h2>
			</div>
			<div className='col-12'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<h5 className='f-right'>-200</h5>
						<h5 className='f-left'>6 hours ago</h5>
					</div>
				</Paper>
			</div>
			<div className='col-12'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<h5 className='f-right'>400</h5>
						<h5 className='f-left'>7 hours ago</h5>
					</div>
				</Paper>
			</div>
			<div className='col-12'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<h5 className='f-right'>600</h5>
						<h5 className='f-left'>1 day ago</h5>
					</div>
				</Paper>
			</div>
		</div>
	</div>
)

const style = {
	balance_card: {
		height: 155,
		width: '100%',
		margin: 10,
		textAlign: 'center',
		display: 'inline-block',
	},
	card: {
		height: 80,
		width: '100%',
		margin: 10
	}
};