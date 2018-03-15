import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import { style } from '../style/'
import TextField from 'material-ui/TextField/TextField';
import Loader from '../components/loader'
import { RaisedButton } from 'material-ui';

export default class extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false
		}
	}

	componentDidMount() {
		this.setState({ loading: true })
		fetch('./config.json')
			.then(response => response.json())
			.then(json => {
				console.log(json);
				this.setState({ loading: false, data: json })
			})

	}

	submit = () => {
		this.setState({ loading: true })
		const fs = require('fs');
		
		let data = JSON.stringify(this.state.data);
		fs.writeFileSync('./config.json', data);  
	}

	render() {
		const { loading, data } = this.state
		return (
			<div className='container'>
				<div className='row'>
					<br />
					<div className='col-12'>
						<Paper style={style.transaction_card} zDepth={3}>
							{
								loading ?
								<Loader/> :
									<div className='container'>
										<br />
										<h3>Settings</h3>
										<h5>Company Info</h5>
										<TextField 
											floatingLabelText="Display Name"
											value={data && data.display_name}
										/>

										<TextField
											hintText="Subtitle"
											value={data && data.subtitle}
											floatingLabelText="Subtitle"
											multiLine={true}
											rows={2}
										/>

										<TextField
											hintText="Card Display Name"
											value={data && data.card_display_name}
											floatingLabelText="Card Display Name"
										/>

										<TextField
											hintText="Description"
											value={data && data.description}
											floatingLabelText="Description"
											multiLine={true}
											rows={2}
										/>

									<RaisedButton onClick={this.submit} label="Submit" disabled={loading}/>
									</div>
							}
						</Paper>
						<br />
					</div>
				</div>
			</div>
		)
	}
}