import React from 'react'
// Components
import Adhd from './Adhd'
import AnxietySeizure from './AnxietySeizure'
import PainKillers from './PainKillers'
import HealthConditions from './healthConditions'
// Images
import { ReactComponent as DownArrowBlackIcon } from '../../images/downArrowBlack.svg'
import { ReactComponent as DownArrowIcon } from '../../images/downarrow.svg'
import { ReactComponent as SearchIcon } from '../../images/search.svg'

const NavBarLower = props => {
  return (
    <div className='NavBar__lower'>
      <div className='container'>
        <ul className='NavBar__lower--categories'>
          <li className='NavBar__lower--category'>
            <span>ADHD</span>
            <DownArrowIcon alt='down-arrow' />
            <Adhd />
          </li>
          <li className='NavBar__lower--category'>
            <span>Anxiety & Seizure</span>
            <DownArrowIcon alt='down-arrow' />
            <AnxietySeizure />
          </li>
          <li className='NavBar__lower--category'>
            <span>Pain Killers</span>
            <DownArrowIcon alt='down-arrow' />
            <PainKillers />
          </li> 
          <li className='NavBar__lower--category'>
            <span>Health Conditions</span>
            <DownArrowIcon alt='down-arrow' />
            <HealthConditions />
          </li>
        </ul>
        <div className='NavBar__lower--search'>
          <div className='NavBar__lower--search-allcats'>
            <span>All Categories</span>
            <DownArrowBlackIcon alt='down-arrow' />
          </div>
          <form className='NavBar__lower--search-text'>
            <input type='text' />
            <SearchIcon alt='Search fr' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default NavBarLower