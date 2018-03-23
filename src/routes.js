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
import RewardRequests from './containers/reward_requests'

import { configureStore } from './store'
import { purpleA700, blue800, grey600, white } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: purpleA700,
		primary2Color: grey600,
		primary3Color: blue800,
		canvasColor: white,
		accent1Color: purpleA700,
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

	const user_data = JSON.parse(localStorage.getItem('user'))
	const isAdmin = user_data && user_data.groups.filter(i => i.name === 'admin').length > 0;

	const nav_routes = ['/', '/wallet', '/earn', '/perks']

	if (isAdmin) { 
		nav_routes.push('/reward_requests') 
		nav_routes.push('/settings')
	}


	return (
		<Provider store={store}>
			<MuiThemeProvider muiTheme={muiTheme}>
				<Router>
					<div>
						{
							token ?
								<div className='main'>
									{
										nav_routes.map((route, index) => (
											<Route key={index} exact path={route} component={Nav} />
										))
									}
									<Route exact path='/' component={Home} />
									<Route exact path='/wallet' component={Wallet} />
									<Route exact path='/earn' component={Earn} />
									<Route exact path='/perks' component={Market} />
									{
										isAdmin ? 
											<Route exact path='/reward_requests' component={RewardRequests}/> :
											null
									}
									{
										isAdmin ?
											<Route exact path='/settings' component={Settings} /> :
											null
									}
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