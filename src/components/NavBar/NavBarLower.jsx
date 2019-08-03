import React from 'react'
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
          </li>
          <li className='NavBar__lower--category'>
            <span>Anxiety & Seizure</span>
            <img src={downArrowImg} alt='down-arrow' />
          </li>
          <li className='NavBar__lower--category'>
            <span>Pain Killers</span>
            <img src={downArrowImg} alt='down-arrow' />
          </li> 
          <li className='NavBar__lower--category'>
            <span>Health Conditions</span>
            <img src={downArrowImg} alt='down-arrow' />
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