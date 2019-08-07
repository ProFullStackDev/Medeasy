import React, { useState } from 'react'
// Components
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer'
// Pages
import LandingPage from './pages/LandingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
// React-router
import { Switch, Route, Redirect } from 'react-router-dom'
// assets 
import norton from './images/assurances/norton.png'
import CheckoutPage from './pages/CheckoutPage';
function App() {
  const [overLayStatus, setOverlayStatus] = useState(false)
  // Toggling the overlay
  const decideOverlayState = overlayState => setOverlayStatus(overlayState)
  return (
    <div className="App">
      { overLayStatus && <div style={{ position: 'absolute', minHeight: '100%', minWidth: '100%', background: 'rgba(192, 192, 192, .6)', zIndex: '3' }} className='App__overlay'></div> }
      <NavBar />
      <div className='container' style={{ padding: '1.5rem 2.2rem' }}>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/about' render={() => <h1>Hi</h1>} />
          <Route exact path='/customer' render={() => <h1>Hi</h1>} />
          <Route exact path='/privacy' render={() => <h1>Hi</h1>} />
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
    </div>
  );
}

export default App;
