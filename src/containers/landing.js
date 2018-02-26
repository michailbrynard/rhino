import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class extends Component {
	render() {
		const { history } = this.props
		return (
			<div>
				<AppBar title="Launcher" showMenuIconButton={false} />
				<div className='spacer'></div>
				<div className='row'>
					<div className='col-6 center'>
						<br/>
						<img alt='logo' className='landing-img' src='./logo.png' />
					</div>
					<div className='col-6 center landing-row'>
						<h1 className='title'>Product Name</h1>
						<p className='subtitle'>This is a short description of the product</p>
							<TextField
								hintText="Email"
							/><br />
						<RaisedButton onClick={() => history.push('/home')} label="Join" secondary={true} />
						<br/><br/>
					</div>
				</div>
			</div>
		)
	}
}