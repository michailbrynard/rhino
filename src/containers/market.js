import React from 'react'
import Paper from 'material-ui/Paper';

export default () => (
	<div>
		<div className='row'>
			<div className='col-12'>
				<h2>Market</h2>
			</div>
			<div className='col-8'>
				<Paper style={style} zDepth={3}>
					<div className='container'>
						<p>Perk 1</p>
						<h3>GUT 11</h3>
					</div>
				</Paper>
				<Paper style={style} zDepth={3}>
					<div className='container'>
						<p>Perk 2</p>
						<h3>GUT 10</h3>
					</div>
				</Paper>
				<Paper style={style} zDepth={3}>
					<div className='container'>
						<p>Perk 3</p>
						<h3>GUT 33</h3>
					</div>
				</Paper>
			</div>
			<div className='col-4'>
				<div className='container center'>
					<p>Balance</p>
					<h2>GUT 123.456</h2>
				</div>
			</div>
		</div>
	</div>
)

const style = {
	height: 140,
	width: '100%',
	margin: 10,
	textAlign: 'center',
	display: 'inline-block',
};