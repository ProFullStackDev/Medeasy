import React from 'react'
// Components
import Conditions from './Conditions'
// Images
import { ReactComponent as DownArrowIcon } from '../../images/downarrow.svg'
import { ReactComponent as SearchIcon } from '../../images/search.svg'

const NavBarLower = props => {
  return (
    <div className='NavBar__lower'>
      <div className='container'>
        <ul className='NavBar__lower--categories'>
          <li className='NavBar__lower--category'>
            <span>Conditions</span>
            <DownArrowIcon alt='down-arrow' />
            <Conditions />
          </li>
          <li className='NavBar__lower--category'>
            <span>Anxiety & Seizure</span>
          </li>
          <li className='NavBar__lower--category'>
            <span>Pain Killers</span>
          </li> 
          <li className='NavBar__lower--category'>
            <span>Health Conditions</span>
          </li>
        </ul>
        <div className='NavBar__lower--search'>
          <form className='NavBar__lower--search-text'>
            <input type='text' placeholder='Search for products' />
            <SearchIcon alt='Search fr' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default NavBarLower