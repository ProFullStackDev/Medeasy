import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import alertReducer from './reducers/alertReducer'
import inventoryReducer from './reducers/inventoryReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  inventory: inventoryReducer
})

export default rootReducer
