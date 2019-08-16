import React, { useState } from 'react'
// Components
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer'
import LoginRegisterModal from './components/LoginRegisterModal/LoginRegisterModal'
// Pages
import LandingPage from './pages/LandingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
// React-router
import { Switch, Route, Redirect } from 'react-router-dom'
// Assets
import norton from './images/assurances/norton.png'
import CheckoutPage from './pages/CheckoutPage';
function App() {

  // Overlay state
  const [overLayStatus, setOverlayStatus] = useState(false)
  // Login / Register Modal State
  const [authStatus, setAuthStatus] = useState(false)
  // Login / Register modal mode state
  const [authModalMode, setAuthModalMode] = useState('login')

  // Toggling the overlay
  const decideOverlayState = overlayState => setOverlayStatus(overlayState)
  
  // Close the modal and close the overlay as well
  const closeModal = () => { setAuthStatus(false); decideOverlayState(false) }
  
  // Open the modal and open the overlay as well
  const openModal = modalMode => {
    // Mode of the modal
    setAuthModalMode(modalMode)
    // Switching on the modal
    setAuthStatus(true)
    // Switching on the overlay
    decideOverlayState(true)
  }

  return (
    <div className="App">
      { overLayStatus && <div style={overlayStyles} className='App__overlay'></div> }
      { authStatus && <LoginRegisterModal authModalMode={ authModalMode } onClick={ closeModal }/> }
      <NavBar onClick={openModal}/>
      <div className='container' style={{ padding: '1.5rem 2.2rem' }}>
        { /* All Routes */ }
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

const overlayStyles = {
  position: 'absolute', 
  minHeight: '100%', 
  minWidth: '100%', 
  background: 'rgba(192, 192, 192, .6)', 
  zIndex: '3' 
}

export default App;
