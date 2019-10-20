import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import medeasyLogo from '../../images/medeasy-logo.png'
import '../../styles/components/AdminNavBar.scss'

const AdminNavBar = ({ history, url, navBarState }) => {
  return (
    <nav className={`AdminNavBar ${!navBarState ? 'closed' : ''}`}>
      <Link to={url}><img src={medeasyLogo} alt="Logo" className="AdminNavBar__logo"/></Link>
      <ul className='AdminNavBar__links'>
        <NavLink to={`${url}/products`} className='AdminNavBar__link' activeClassName='active'>Products</NavLink>
        <NavLink to={`${url}/coupons`} className='AdminNavBar__link' activeClassName='active'>Coupons</NavLink>
        <NavLink to={`${url}/orders`} className='AdminNavBar__link' activeClassName='active'>Orders</NavLink>
        <li onClick={() => {/** Logout functionality */}} className='AdminNavBar__link'>Logout</li>
      </ul>
    </nav>
  )
}

export default AdminNavBar
