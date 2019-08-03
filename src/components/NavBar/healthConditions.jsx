import React from 'react'
import '../../styles/components/NavBarDropdowns.scss'

const HealthConditions = (props) => {
  return (
    <div className='HealthConditions dropdown'>
      <ul className='HealthConditions__list'>
        <li className='HealthConditions__list--item'>
          <p className='title'>Insomnia</p>
          <span>Ambien</span>
        </li>
        <li className='HealthConditions__list--item'>
          <p className='title'>ED</p>
          <span>Cialis</span>
          <span>Viagra</span>
        </li>
        <li className='HealthConditions__list--item'>
          <p className='title'>Obesity</p>
          <span>Phenetermine</span>
          <span>Phenetermine</span>
          <span>Phenetermine</span>
          <span>Phenetermine</span>
        </li>
        <li className='HealthConditions__list--item'>
          <p className='title'>Blood Pressure</p>
          <span>Bunex</span>
          <span>Betacap</span>
        </li>
      </ul>
    </div>
  )
}
 
export default HealthConditions;