import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import medeasyLogo from '../../images/medeasy-logo.png'
import '../../styles/components/AdminNavBar.scss'

import { connect } from 'react-redux'
import { logout } from '../../redux/actions/authActions'

const AdminNavBar = ({ url, navBarState, logout }) => {

  const handleClick = () => logout(true)

  return (
    <nav className={`AdminNavBar ${!navBarState ? 'closed' : ''}`}>
      <Link to={url}><img src={medeasyLogo} alt="Logo" className="AdminNavBar__logo"/></Link>
      <ul className='AdminNavBar__links'>
        <NavLink to={`${url}/products`} className='AdminNavBar__link' activeClassName='active'>Products</NavLink>
        <NavLink to={`${url}/coupons`} className='AdminNavBar__link' activeClassName='active'>Coupons</NavLink>
        <NavLink to={`${url}/orders`} className='AdminNavBar__link' activeClassName='active'>Orders</NavLink>
        <NavLink to={`${url}/categories`} className='AdminNavBar__link' activeClassName='active'>Catgeories</NavLink>
        <li onClick={handleClick} className='AdminNavBar__link'>Logout</li>
      </ul>
    </nav>
  )
}

export default connect(null, { logout })(AdminNavBar)
