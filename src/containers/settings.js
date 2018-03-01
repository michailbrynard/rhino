import React from 'react'
import Paper from 'material-ui/Paper';
import { style } from '../style'

export default () => (
	<div className='container'>
		<div className='row'>
		<br/>
			<div className='col-12'>
				<Paper style={style.transaction_card} zDepth={3}>
					<div className='container'>
						<br/>
						<h3>Settings</h3>
						<p>This is the settings component</p>
						<br/>
					</div>
				</Paper>
				<br />
			</div>
		</div>
	</div>
)
