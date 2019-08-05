import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import medeasyLogo from '../../images/medeasy-logo.png'
import cartImg from '../../images/cart.svg'
import contactImg from '../../images/contactus.svg'

const NavBarUpper = (props) => {
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
          <span className='NavBar__upper-other-auth'><Link to='/login'>Login</Link> | <Link to='/register'>Signup</Link></span>
          <Link to='/cart'>
            <div className='NavBar__upper-other-cart'>
              <img alt='cart-img' className='NavBar__upper-other-cart--image' src={cartImg} />
              <span className='NavBar__upper-other-cart--count'>3</span>
            </div>
          </Link>
          <Link to='/contact' className='NavBar__upper-other-contact'>
            <img alt='contact-img' src={contactImg} style={{ marginRight: '.5rem' }} />
            Contact us
          </Link>
        </div>
      </div>
    </div>
  )
}
 
export default NavBarUpper