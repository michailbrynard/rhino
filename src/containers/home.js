import React from 'react'
import Paper from 'material-ui/Paper';

export default () => (
	<div>
		<div className='row'>
			<br/>
			<div className='col-6'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<h3>Company Name</h3>
						<p>Product Name</p>
						<span>Product Description</span>
					</div>
				</Paper>
				<br/>
			</div>
			<div className='col-6'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<p>Balance</p>
						<h1>CNS 2300.3459</h1>
					</div>
				</Paper>
				<br/>
			</div>
			<div className='col-6'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<h3>Get Tokens</h3>
					</div>
				</Paper>
				<br/>
			</div>
			<div className='col-6'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<h3>Spend Tokens</h3>
					</div>
				</Paper>
				<br/>
			</div>
		</div>
	</div>
)

const style = {
	card: {
		height: 200,
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center'
	}
};