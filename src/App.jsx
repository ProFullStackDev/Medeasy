import React from 'react'
// Components
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer'
// Pages
import LandingPage from './pages/LandingPage'
// React-router
import { Switch, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className='container' style={{ padding: '1.5rem 2.2rem' }}>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Redirect to='/' />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
