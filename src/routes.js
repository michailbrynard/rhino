import React, {Component} from 'react'
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

import { callApi } from './utils'

import { configureStore } from './store'
import { pink700, cyan300, grey600, black } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: pink700,
		primary2Color: grey600,
		primary3Color: cyan300,
		canvasColor: cyan300,
		accent1Color: pink700,
		accent2Color: grey600,
		accent3Color: cyan300,
	},
	appBar: {
	},
});

const store = configureStore()
// Protect routes after login works
export default class extends Component {

	componentDidMount() {
		const token = localStorage.getItem('token')

		if (token) {
			const route = process.env.REACT_APP_REHIVE_API_URL + '/user/'
			callApi('GET', route, token)
				.then(json => {
					if (json.status !== 'success') {
						this.logoutInvalidToken()
					}
				})
				.catch(err => {
					this.logoutInvalidToken()
				})
		}
	}

	logoutInvalidToken = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		window.location = '/'
	}

render() {
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
												<Route exact path='/reward_requests' component={RewardRequests} /> :
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
}