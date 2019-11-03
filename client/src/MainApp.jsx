import React, { Fragment, useState } from 'react'

// Components
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
// Pages
import LandingPage from './pages/LandingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
import ProfilePage from './pages/ProfilePage'
import LoginRegisterModal from './pages/LoginRegisterModal/LoginRegisterModal'
// React-router
import { Switch, Route, Redirect } from 'react-router-dom'
// Assets
import norton from './images/assurances/norton.png'
import CheckoutPage from './pages/CheckoutPage'

const AdminApp = () => {

  // Overlay state
  const [overLayStatus, setOverlayStatus] = useState(false)

  // Toggling the overlay
  const decideOverlayState = overlayState => setOverlayStatus(overlayState)

  return (
    <Fragment>
      { overLayStatus && <div style={overlayStyles} className='App__overlay'></div> }
      <NavBar />
      <div className='container' style={{ padding: '1.5rem 2.2rem' }}>
        { /* All Routes */ }
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/login' component={LoginRegisterModal} />
          <Route exact path='/register' component={LoginRegisterModal} />
          <Route exact path='/about' render={() => <h1>About page</h1>} />
          <Route exact path='/customer' render={() => <h1>Customer page</h1>} />
          <Route exact path='/privacy' render={() => <h1>Privacy Policy</h1>} />
          <PrivateRoute path='/profile' component={ProfilePage} />
          <Route exact path='/product/:name' component={ProductDetailPage} />
          <Route exact path='/cart' render={routeParams => <ShoppingCartPage {...routeParams} changeOverlayState={decideOverlayState} />} />
          <Route exact path='/checkout/account' render={routeParams => <CheckoutPage {...routeParams} changeOverlayState={decideOverlayState} />} />
          <Redirect to='/' />
        </Switch>
      </div>
      <div className='App__secure'>
        <img src={norton} alt='norton'/>
      </div>
      <Footer />
    </Fragment>
  )
}

const overlayStyles = {
  position: 'absolute', 
  minHeight: '100%', 
  minWidth: '100%', 
  background: 'rgba(192, 192, 192, .6)', 
  zIndex: '3' 
}

export default AdminApp
