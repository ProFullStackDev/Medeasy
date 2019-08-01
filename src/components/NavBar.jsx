import React from 'react'
import medeasyLogo from '../images/medeasy-logo.png'
const NavBar = (props) => {
  return (
    <header className='NavBar'>
      <div className='NavBar__upper'>
        <div className='NavBar__upper-logo'>
          <img src={medeasyLogo} className='NavBar__upper-img' alt='medeasy-logo'></img>
        </div>
      </div>
      <div className='NavBar__lower'>

      </div>
    </header>
  )
}
 
export default NavBar;