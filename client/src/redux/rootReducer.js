import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import alertReducer from './reducers/alertReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer
})

export default rootReducer
