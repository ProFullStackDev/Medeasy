import React, { Fragment } from 'react'
// Components
import Conditions from './Conditions'
// Images
import { ReactComponent as DownArrowIcon } from '../../images/downarrow.svg'
import { ReactComponent as SearchIcon } from '../../images/search.svg'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryCategories, selectInventoryProducts } from '../../redux/selectors/inventorySelectors'

const NavBarLower = ({ conditions, products }) => {

  const handleClick = () => {
    document.querySelector('.Conditions').style.display = 'none'
  }

  return (
    <div className='NavBar__lower'>
      <div className='container'>
        <ul className='NavBar__lower--categories'>
          <li className='NavBar__lower--category' onMouseOver={() => document.querySelector('.Conditions').style.display = 'grid'}>
            <span>Conditions</span>
            { conditions && products ? <Fragment><DownArrowIcon alt='down-arrow' />
            <Conditions onClick={ handleClick } /></Fragment> : null}
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

const mapStateToProps = createStructuredSelector({
  conditions: selectInventoryCategories,
  products: selectInventoryProducts
})

export default connect(mapStateToProps)(NavBarLower)