export const GET_DATA = "GET_DATA"
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS"
export const GET_DATA_ERROR = "GET_DATA_ERROR"

export const getData = () => {
  return dispatch => {
		// token = localStorage.getItem('token')
    // dispatch({ type: GET_DATA })
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
    //   dispatch({ type: GET_DATA_SUCCESS, data: json })
		// })
		// .catch(err => {
		// 	dispatch({ err: GET_DATA_ERROR})
		// })
  }
}