import React from 'react'
import Paper from 'material-ui/Paper';

export default () => (
	<div>
		<div className='row'>
			<div className='col-12'>
				<h2>Dashboard</h2>
			</div>
			<div className='col-12'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<h3>Company</h3>
					</div>
				</Paper>
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
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<h3>Get Tokens</h3>
					</div>
				</Paper>
			</div>
			<div className='col-12'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<h3>Spend Tokens</h3>
					</div>
				</Paper>
			</div>
		</div>
	</div>
)

const style = {
	card: {
		height: 80,
		width: '100%',
		margin: 10,
		textAlign: 'center',
		display: 'inline-block',
	},
	balance_card: {
		height: 155,
		width: '100%',
		margin: 10,
		textAlign: 'center',
		display: 'inline-block',
	},
};