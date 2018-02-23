import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { history } = this.props
		return (
			<div>
				<AppBar title="Launcher" showMenuIconButton={false} />
				<div className='spacer'></div>
				<div className='row'>
					<div className='col-6 center'>
						<br/>
						<img className='container' src='./logo.jpg' />
					</div>
					<div className='col-6 center'>
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