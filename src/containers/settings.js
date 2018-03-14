import React from 'react'
import Paper from 'material-ui/Paper';
import { style } from '../style/'
import TextField from 'material-ui/TextField/TextField';

export default () => (
	<div className='container'>
		<div className='row'>
		<br/>
			<div className='col-12'>
				<Paper style={style.transaction_card} zDepth={3}>
					<div className='container'>
						<br/>
						<h3>Settings</h3>
						<h5>Company Info</h5>
						<TextField floatingLabelText="Display Name"></TextField>
						<TextField
							hintText="Subtitle"
							floatingLabelText="Subtitle"
							multiLine={true}
							rows={2}
						/><br />
						<br/>
					</div>
				</Paper>
				<br />
			</div>
		</div>
	</div>
)
