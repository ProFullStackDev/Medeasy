import React from 'react'
import NavBarUpper from './NavBarUpper'
import NavBarLower from './NavBarLower'
import '../../styles/components/NavBar.scss'

const NavBar = ({ onClick }) => {
  return (
    <header className='NavBar'>
      <NavBarUpper onClick={onClick} />
      <NavBarLower />
    </header>
  )
}
 
export default NavBar;