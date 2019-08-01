import React from 'react'
import { NavLink } from 'react-router-dom'
import copyright from '../images/copyright.svg'
import '../styles/components/Footer.scss'

const Footer = (props) => {
  return (
    <div className='Footer'>
      <nav className='Footer__nav'>
        <NavLink className='Footer__nav-link' exact to='/'>Home</NavLink>
        <NavLink className='Footer__nav-link' exact to='/about'>About us</NavLink>
        <NavLink className='Footer__nav-link' exact to='/customer'>Customer Service</NavLink>
        <NavLink className='Footer__nav-link' exact to='/privacy'>Privacy Policy</NavLink>
        <NavLink className='Footer__nav-link' exact to='/contact'>Contact us</NavLink>
      </nav>
      <div className='Footer__copyright'>
        <img src={ copyright } alt='copyright'/>
        <span className='Footer__copyright--text'>2019 <span style={{ color: '#1b6355' }}>MedEasy</span>. All Rights Reserved</span>
      </div>
    </div>
  )
}
 
export default Footer;