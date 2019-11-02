import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import AddressChangeMain from './AddressChangeMain'
import AddressChangeEdit from './AddressChangeEdit'

const AddressChangeController = ({ match: { url } }) => {
  return (
    <React.Fragment>
      <Route exact path={`${url}`} component={AddressChangeMain} />
      <Route exact path={`${url}/create`} component={AddressChangeEdit} />
      <Route exact path={`${url}/edit/:addressId`} component={AddressChangeEdit} />
    </React.Fragment>
  ) 
}

export default withRouter(AddressChangeController)