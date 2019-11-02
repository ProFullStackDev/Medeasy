import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import alertReducer from './reducers/alertReducer'
import inventoryReducer from './reducers/inventoryReducer'
import profileReducer from './reducers/profileReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  inventory: inventoryReducer,
  profile: profileReducer
})

export default rootReducer
