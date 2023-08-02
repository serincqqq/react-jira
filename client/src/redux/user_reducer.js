import { SET_LOGIN_USER_DATA } from './constant'
const initialState = {
  loginUserData: null,
}
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_USER_DATA:
      return {
        ...state,
        loginUserData: action.payload,
      }
    default:
      return state
  }
}

export default rootReducer
