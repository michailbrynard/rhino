export const SIGNUP = "SIGNUP"
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const SIGNUP_ERROR = "SIGNUP_ERROR"

export const signup = (signup_email) => (
	dispatch => {
		dispatch({ type: SIGNUP })

		fetch(process.env.REACT_APP_API_URL + '/api/user/join/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ signup_email, company: 'dragon', referal_id: "d0a009c9-b5bc-4239-93d2-2f54220076a2" })
		})
		.then(response => {
			return response.json()
		})
		.then(json => {
			if(json.status === 'success') {
				dispatch({ type: SIGNUP_SUCCESS, data: json.data })
			} else {
				dispatch({ type: SIGNUP_ERROR, err: json.message })
			}
		})
		.catch(err => {
			dispatch({ type: SIGNUP_ERROR })
		})
	}
)

export const LOGIN = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"

export const login = (user, password) => (
	dispatch => {
		dispatch({ type: LOGIN })

		fetch(process.env.REACT_APP_REHIVE_API_URL + '/auth/login/', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user, password, company: 'dragon' })
		})
			.then(response => {
				return response.json()
			})
			.then(json => {
				if (json.status === 'success') {
					dispatch({ type: LOGIN_SUCCESS, data: json.data })
				} else {
					dispatch({ type: LOGIN_ERROR, err: json.message })
				}
			})
			.catch(err => {
				dispatch({ type: LOGIN_ERROR })
			})
	}
)

export const LOGOUT = "LOGOUT"

export const logout = () => (
	dispatch => {
		dispatch({ type: LOGOUT })
	}
)

export const GET_HOME_DATA = "GET_HOME_DATA"
export const GET_HOME_DATA_SUCCESS = "GET_HOME_DATA_SUCCESS"
export const GET_HOME_DATA_ERROR = "GET_HOME_DATA_ERROR"

export const getHomeData = () => {
  return dispatch => {
		// token = localStorage.getItem('token')
    dispatch({ type: GET_HOME_DATA })
    // fetch(`http://localhost:8001/`, {
    //   credentials: 'include',
    //   mode: 'cors',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   }
    //   headers: {
    //     authorization: `Bearer ${ token }`
    //   }
    // })
    // .then(response => response.json())
    // .then(json => {
			// NOTE: Simulating server latency and getting data
			setTimeout(() => {
				dispatch({
					type: GET_HOME_DATA_SUCCESS, data: {
						company: {
							name: "Super Test Co",
							product: "Pro(duct) Test",
							description: "This is a test product for a test company"
						},
						wallet: {
							balance: 11.11,
							currency_code: "BITS"
						}
					}
				})
			}, 3000)
      
		// })
		// .catch(err => {
		// 	dispatch({ type: GET_HOME_DATA_ERROR, err })
		// })
  }
}