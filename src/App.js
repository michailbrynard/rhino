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
import {  yellow700, grey200, grey600, blue800, blue700, blue500, blue400, blue100, blue200 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: yellow700,
		primary2Color: grey600,
		primary3Color: yellow700,
		canvasColor: grey200,
		accent1Color: yellow700,
		accent2Color: grey600,
		accent3Color: yellow700,
	},
	appBar: {
	},
});

const store = configureStore()

export default () => {
	return (
		<Provider store={store}>
			<MuiThemeProvider muiTheme={muiTheme}>
				<Router>
					<div>
						<Route exact path='/' component={Landing} />
						<div style={{
							marginLeft: '266px',
							marginRight: '20px'
						}}>
							{
								['/home', '/wallet', '/market', '/settings'].map((route, index) => (
									<Route key={index} exact path={route} component={Nav} />
								))
							}
							<Route exact path='/home' component={Home} />
							<Route exact path='/wallet' component={Wallet} />
							<Route exact path='/market' component={Market} />
							<Route exact path='/settings' component={Settings} />

						</div>
					</div>
				</Router>
			</MuiThemeProvider>
		</Provider>
	)
}