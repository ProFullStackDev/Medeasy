import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

// Pages
import LandingPage from './pages/LandingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
import ProfilePage from './pages/ProfilePage'
import LoginRegisterModal from './pages/LoginRegisterModal/LoginRegisterModal'
import PaymentConfirmedPage from './pages/PaymentConfimedPage'
import CheckoutPage from './pages/CheckoutPage'
import CategoryProductsPage from './pages/CategoryProductsPage'
import AffliatesPage from './pages/AffliatesPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

const MainRoutes = ({ decideOverlayState }) => {
  return (
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/login' component={LoginRegisterModal} />
      <Route exact path='/register' component={LoginRegisterModal} />
      <Route
        exact
        path='/payment/success'
        render={() => <h1>Success page</h1>}
      />
      <Route exact path='/payment/confirmed' component={PaymentConfirmedPage} />
      <Route
        exact
        path='/affliates'
        render={() => <AffliatesPage descriptionName='Affliates' />}
      />
      <Route exact path='/privacy' component={PrivacyPolicyPage} />
      <PrivateRoute path='/profile' component={ProfilePage} />
      <Route
        exact
        path='/condition/:conditionId'
        render={routeProps => (
          <CategoryProductsPage {...routeProps} descriptionName='Conditions' />
        )}
      />
      <Route exact path='/product/:productId' component={ProductDetailPage} />
      <Route
        exact
        path='/cart'
        render={routeParams => (
          <ShoppingCartPage
            {...routeParams}
            changeOverlayState={decideOverlayState}
          />
        )}
      />
      <Route
        path='/checkout'
        render={routeParams => (
          <CheckoutPage
            {...routeParams}
            changeOverlayState={decideOverlayState}
          />
        )}
      />
      <Redirect to='/' />
    </Switch>
  )
}

export default MainRoutes
