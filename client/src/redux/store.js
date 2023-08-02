import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import userReducer from './user_reducer'
import thunk from 'redux-thunk'
export default createStore(userReducer, applyMiddleware(thunk))
