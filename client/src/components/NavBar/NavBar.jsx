import React from 'react'
import NavBarUpper from './NavBarUpper'
import NavBarLower from './NavBarLower'
import '../../styles/components/NavBar.scss'

const NavBar = () => {
  return (
    <header className='NavBar'>
      <NavBarUpper />
      <NavBarLower />
    </header>
  )
}
 
export default NavBar;