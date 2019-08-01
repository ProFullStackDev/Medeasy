import React from 'react'
import downArrowImg from '../../images/downarrow.svg'
const NavBarLower = (props) => {
  return (
    <div className='NavBar__lower'>
      <div className='container'>
        <div className='NavBar__lower--categories'>
          
        </div>
        <div className='NavBar__lower--search'>
          <div className='NavBar__lower--search-allcats'>
            <span>All Categories</span>
            <img src={downArrowImg} alt='down-arrow' />
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default NavBarLower;