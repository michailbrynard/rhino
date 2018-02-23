import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Nav from './components/nav'
import Home from './components/home'
import Wallet from './components/wallet'
import Market from './components/market'

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: 'rgb(60, 141, 188)'
	},
	appBar: {
	},
});

export default () => (
	<MuiThemeProvider muiTheme={muiTheme}>
		<Router>
			<div>
				<Route path='*' component={Nav}/>
				<div style={{
					marginLeft: '266px',
					marginRight: '20px'
				}}>
					<Route exact path="/" component={Home} />
					<Route path="/wallet" component={Wallet} />
					<Route path="/market" component={Market} />
				</div>
			</div>
		</Router>
	</MuiThemeProvider>
)