import React from 'react'
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux'

import Nav from './containers/nav'
import Home from './containers/home'
import Wallet from './containers/wallet'
import Market from './containers/market'
import Landing from './containers/landing'
import Settings from './containers/settings'


import { configureStore } from './store'
import { grey200, blue800, blue700, blue500 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: blue800,
		primary2Color: blue700,
		primary3Color: blue500,
		canvasColor: grey200,
		accent1Color: blue800,
		accent2Color: blue700,
		accent3Color: blue500,
	},
	appBar: {
	},
});

const store = configureStore()
// Protect routes after login works
export default () => {

	const token = localStorage.getItem('token')
	return (
		<Provider store={store}>
			<MuiThemeProvider muiTheme={muiTheme}>
				<Router>
					<div>
						{
							token ?
								<div style={{
									marginLeft: '266px',
									marginRight: '20px'
								}}>
									{
										['/', '/wallet', '/market', '/settings'].map((route, index) => (
											<Route key={index} exact path={route} component={Nav} />
										))
									}
									<Route exact path='/' component={Home} />
									<Route exact path='/wallet' component={Wallet} />
									<Route exact path='/market' component={Market} />
									<Route exact path='/settings' component={Settings} />

								</div> :
								<Route exact path='/' component={Landing} />
						}
					</div>
				</Router>
			</MuiThemeProvider>
		</Provider>
	)
}