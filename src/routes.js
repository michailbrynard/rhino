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
import Earn from './containers/earn'
import Landing from './containers/landing'
import SetPassword from './containers/set_password'
import Settings from './containers/settings'
import Count from './containers/count'

import { configureStore } from './store'
import { yellow700, grey200, blue800, grey600, } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: yellow700,
		primary2Color: grey600,
		primary3Color: blue800,
		canvasColor: grey200,
		accent1Color: yellow700,
		accent2Color: grey600,
		accent3Color: blue800,
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
								<div className='main'>
									{
										['/', '/wallet', '/earn', '/market', '/settings'].map((route, index) => (
											<Route key={index} exact path={route} component={Nav} />
										))
									}
									<Route exact path='/' component={Home} />
									<Route exact path='/wallet' component={Wallet} />
									<Route exact path='/earn' component={Earn} />
									<Route exact path='/market' component={Market} />
									<Route exact path='/settings' component={Settings} />
								</div> :
								<div>
									<Route exact path='/' component={Landing} />
									<Route exact path='/setpassword' component={SetPassword} />
								</div>
						}
						<Route exact path='/count' component={Count} />
					</div>
				</Router>
			</MuiThemeProvider>
		</Provider>
	)
}