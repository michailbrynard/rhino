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
import Landing from './components/landing'

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: 'rgb(60, 141, 188)'
	},
	appBar: {
	},
});

export default () => {

	return (
		<MuiThemeProvider muiTheme={muiTheme}>
			<Router>
				<div>
					<Route exact path='/' component={Landing} />
					<div style={{
						marginLeft: '266px',
						marginRight: '20px'
					}}>
						{
							['/home', '/wallet', '/market'].map((route, index) => (
								<Route key={index} exact path={route} component={Nav} />
							))
						}
						<Route exact path='/home' component={Home} />
						<Route exact path='/wallet' component={Wallet} />
						<Route exact path='/market' component={Market} />
						
					</div>
				</div>
			</Router>
		</MuiThemeProvider>
	)
}