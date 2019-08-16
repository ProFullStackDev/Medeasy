import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import medeasyLogo from '../../images/medeasy-logo.png'
import { ReactComponent as CartIcon } from '../../images/cart.svg'
import { ReactComponent as ContactIcon } from '../../images/contactus.svg'

const NavBarUpper = ({ onClick }) => {
  // Triggering the login / register Modal
  const handleClick = event => onClick(event.target.dataset.authmode)
  return (
    <div className='NavBar__upper'>
      <div className='container'>
        <div className='NavBar__upper-logo'>
          <Link to='/'><img src={medeasyLogo} className='NavBar__upper-img' alt='medeasy-logo'/></Link>
        </div>
        <nav className='NavBar__upper-links'>
          <NavLink exact to='/' activeClassName='active'>Home</NavLink>
          <NavLink exact to='/about' activeClassName='active'>About Us</NavLink>
          <NavLink exact to='/customer' activeClassName='active'>Customer Service</NavLink>
          <NavLink exact to='/privacy' activeClassName='active'>Privacy Policy</NavLink>
        </nav>
        <div className='NavBar__upper-other'>
          <span className='NavBar__upper-other-auth'>
            <span onClick={ handleClick } style={{ cursor: 'pointer' }} data-authmode='login'>Login</span> | <span onClick={ handleClick } style={{ cursor: 'pointer' }} data-authmode='register'>Signup</span>
          </span>
          <Link to='/cart'>
            <div className='NavBar__upper-other-cart'>
              <CartIcon alt='cart-img' className='NavBar__upper-other-cart--image' />
              <span className='NavBar__upper-other-cart--count'>3</span>
            </div>
          </Link>
          <Link to='/contact' className='NavBar__upper-other-contact'>
            <ContactIcon alt='contact' style={{ marginRight: '.5rem' }} />
            Contact us
          </Link>
        </div>
      </div>
    </div>
  )
}
 
export default NavBarUpper