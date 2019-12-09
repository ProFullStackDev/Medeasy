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
import DeliveryReturnsPage from './pages/DeliveryReturnsPage'
import BitcoinTutorialPage from './pages/BitcoinTutorialPage'

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
        render={() => (
          <AffliatesPage
            descriptionName='Affliates'
            content='Become an affiliate with Medeasy'
          />
        )}
      />
      <Route
        exact
        path='/bitcoin-tutorial'
        render={() => (
          <BitcoinTutorialPage
            descriptionName='How to buy Bitcoins'
            content='Get an idea on how to buy and pay through Bitcoin'
          />
        )}
      />
      <Route
        exact
        path='/delivery'
        render={routeProps => (
          <DeliveryReturnsPage
            {...routeProps}
            content='Know about our delivery policy'
            descriptionName='Delivery and Returns'
          />
        )}
      />
      <Route
        exact
        path='/privacy'
        render={routeProps => (
          <PrivacyPolicyPage
            {...routeProps}
            descriptionName='Privacy Policy'
            content='Our Privacy Policy'
          />
        )}
      />
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
