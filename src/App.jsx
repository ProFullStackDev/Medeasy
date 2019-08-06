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
function App() {
  const [overLayStatus, setOverlayStatus] = useState(false)
  const decideOverlayState = overlayState => setOverlayStatus(overlayState)
  return (
    <div className="App">
      { overLayStatus && <div style={{ position: 'absolute', minHeight: '100%', minWidth: '100%', background: 'rgba(192, 192, 192, .6)', zIndex: '1' }} className='App__overlay'></div> }
      <NavBar />
      <div className='container' style={{ padding: '1.5rem 2.2rem' }}>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/about' render={() => <h1>Hi</h1>} />
          <Route exact path='/customer' render={() => <h1>Hi</h1>} />
          <Route exact path='/privacy' render={() => <h1>Hi</h1>} />
          <Route exact path='/product/:name' component={ProductDetailPage} />
          <Route exact path='/cart' render={(routeParams) => <ShoppingCartPage {...routeParams} changeOverlayState={decideOverlayState} />} />
          <Redirect to='/' />
        </Switch>
        <img src={norton} alt='norton' style={{ position: 'absolute', bottom: '15rem', right: '2.5rem' }}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
