import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';

export default class extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<AppBar title="Launcher" />
			</div>
		)
	}
}