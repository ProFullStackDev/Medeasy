import React from 'react'
// Components
import Adhd from '../NavBar/Adhd'
import AnxietySeizure from '../NavBar/AnxietySeizure'
import PainKillers from '../NavBar/PainKillers'
import HealthConditions from '../NavBar/HealthConditions'
// Images
import downArrowBlack from '../../images/downArrowBlack.svg'
import downArrowImg from '../../images/downarrow.svg'
import searchImg from '../../images/search.svg'

const NavBarLower = props => {
  return (
    <div className='NavBar__lower'>
      <div className='container'>
        <ul className='NavBar__lower--categories'>
          <li className='NavBar__lower--category'>
            <span>ADHD</span>
            <img src={downArrowImg} alt='down-arrow' />
            <Adhd />
          </li>
          <li className='NavBar__lower--category'>
            <span>Anxiety & Seizure</span>
            <img src={downArrowImg} alt='down-arrow' />
            <AnxietySeizure />
          </li>
          <li className='NavBar__lower--category'>
            <span>Pain Killers</span>
            <img src={downArrowImg} alt='down-arrow' />
            <PainKillers />
          </li> 
          <li className='NavBar__lower--category'>
            <span>Health Conditions</span>
            <img src={downArrowImg} alt='down-arrow' />
            <HealthConditions />
          </li>
        </ul>
        <div className='NavBar__lower--search'>
          <div className='NavBar__lower--search-allcats'>
            <span>All Categories</span>
            <img src={downArrowBlack} alt='down-arrow' />
          </div>
          <form className='NavBar__lower--search-text'>
            <input type='text' />
            <input type='image' src={searchImg} alt='Search fr'/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NavBarLower