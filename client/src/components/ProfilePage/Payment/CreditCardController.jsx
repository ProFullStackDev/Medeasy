import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import CreditCardMain from './CreditCardMain'
import CreditCardEdit from './CreditCardEdit'

const CreditCardController = ({ match: { url } }) => {
  return (
    <React.Fragment>
      <Route exact path={`${url}`} component={CreditCardMain} />
      <Route exact path={`${url}/create`} component={CreditCardEdit} />
      <Route exact path={`${url}/edit/:cardId`} component={CreditCardEdit} />
    </React.Fragment>
  ) 
}

export default withRouter(CreditCardController)