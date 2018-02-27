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
							<div className='col-4'>
								<br />
								<img className='container' src='logo.png' />
							</div>
							<div className='col-8 right'>
								<h3>Refer a Friend</h3>
								<p>Refer a friend to get 5 HIVE tokens</p>
								<h1>5 HIVE</h1>
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
							<div className='col-4'>
								<br />
								<img className='container' src='logo.png' />
							</div>
							<div className='col-8 right'>
								<h3>Share</h3>
								<p>Share to get 3 HIVE tokens</p>
								<h1>3 HIVE</h1>
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
		position: 'relative'
	},
};