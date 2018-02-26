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