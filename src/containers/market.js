import React from 'react'
import Paper from 'material-ui/Paper';

export default () => (
	<div className='container'>
		<div className='row'>
		<br/>
			<div className='col-12'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<div className='row'>
							<div className='col-6'>
								<br /><br/>
								<img className='container' src='logo.png' />
							</div>
							<div className='col-6 right'>
								<h3>Item Name</h3>
								<p>Item Description</p>
								<h1>11 HIVE</h1>
							</div>
						</div>
					</div>
				</Paper>
				<br />
			</div>
			<div className='col-12'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<div className='row'>
							<div className='col-6'>
								<br /><br/>
								<img className='container' src='logo.png' />
							</div>
							<div className='col-6 right'>
								<h3>Item 2 Name</h3>
								<p>Item 2 Description</p>
								<h1>22 HIVE</h1>
							</div>
						</div>
					</div>
				</Paper>
				<br />
			</div>
		</div>
	</div>
)


const style = {
	card: {
		height: 250,
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		borderRadius: '10px'
	},
};