import React from 'react'
import '../../styles/components/NavBarDropdowns.scss'

const PainKillers = (props) => {
  return (
    <div className='PainKillers dropdown'>
      <ul className='PainKillers__list'>
        <li className='PainKillers__list-item'>Oxycodone</li>
        <li className='PainKillers__list-item'>Hydrocodone</li>
        <li className='PainKillers__list-item'>Codeine</li>
        <li className='PainKillers__list-item'>Percocet</li>
        <li className='PainKillers__list-item'>Soma</li>
        <li className='PainKillers__list-item'>Tramadol</li>
      </ul>
    </div>
  )
}
 
export default PainKillers;