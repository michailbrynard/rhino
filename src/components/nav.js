import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List'
export default ({ history }) => (
	<div>
		<Drawer>
			<AppBar title="Launcher" />
			<List>
				<ListItem
					onClick={ () => history.push('/') }
					primaryText="Test Co"
					secondaryText="test@co.co"
					leftAvatar={<Avatar src="https://img00.deviantart.net/c9b6/i/2012/264/2/e/avatar_angelina_by_edit_express-d34muar.jpg" />}
				/>
			</List>
			<MenuItem onClick={() => history.push('/wallet')}>Wallet</MenuItem>
			<MenuItem onClick={() => history.push('/market')}>Market</MenuItem>
			<MenuItem onClick={() => history.push('/settings')}>Settings</MenuItem>
		</Drawer>
	</div>
)