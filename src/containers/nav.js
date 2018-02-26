import React from 'react'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'

export default ({ history }) => (
	<div>
		<Drawer>
			<AppBar showMenuIconButton={false} title="Launcher" />
			<MenuItem
				leftIcon={<FontIcon className="material-icons">home</FontIcon>}
				onClick={() => history.push('/home')}>Home
			</MenuItem>
			<MenuItem 
				leftIcon={<FontIcon className="material-icons">account_balance_wallet</FontIcon>}
				onClick={() => history.push('/wallet')}>Wallet
			</MenuItem>
			<MenuItem 
				leftIcon={<FontIcon className="material-icons">shopping_basket</FontIcon>}
				onClick={() => history.push('/market')}>Market
			</MenuItem>
			<MenuItem 
				leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
				onClick={() => history.push('/settings')}>Settings
			</MenuItem>
			<List style={{
				position: 'absolute',
				bottom: 0,
				left: 0,
				right: 0
			}}>
				<ListItem
					onClick={() => history.push('/')}
					primaryText="Test Co"
					secondaryText="test@co.co"
					leftAvatar={<Avatar src="https://img00.deviantart.net/c9b6/i/2012/264/2/e/avatar_angelina_by_edit_express-d34muar.jpg" />}
				/>
			</List>
		</Drawer>
	</div>
)