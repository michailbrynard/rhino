import React from 'react'
import Paper from 'material-ui/Paper';

export default () => (
	<div>
		<div className='row'>
			<br/>
			<div className='col-6'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<div className='row'>
						<div className='col-4'>
							<br/>
							<img className='container' src='logo.png'/>
						</div>
							<div className='col-8 left'>
								<h3>Company Name</h3>
								<p>Product Name</p>
								<span>Product Description</span>
							</div>
						</div>
					</div>
				</Paper>
				<br/>
			</div>
			<div className='col-6'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<div className='row'>
							<div className='col-6'>
								<h1>
									233.6
									<br/>
									BITS
								</h1>
							</div>
							<div className='col-6'>
								<br/>
								<p>Balance</p>
							</div>
						</div>
					</div>
				</Paper>
				<br/>
			</div>
			<div className='col-6'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<div className='row'>
							<div className='col-4'>
								<br />
								<img className='container' src='logo.png' />
							</div>
							<div className='col-8 left'>
								<h3>Earn Tokens</h3>
							</div>
						</div>
					</div>
				</Paper>
				<br/>
			</div>
			<div className='col-6'>
				<Paper style={style.card} zDepth={3}>
					<div className='container'>
						<div className='row'>
							<div className='col-4'>
								<br />
								<img className='container' src='logo.png' />
							</div>
							<div className='col-8 left'>
								<h3>Redeem Tokens</h3>
							</div>
						</div>
					</div>
				</Paper>
				<br/>
			</div>
		</div>
	</div>
)

const style = {
	card: {
		height: 220,
		display: 'flex',
		alignItems: 'center'
	}
};