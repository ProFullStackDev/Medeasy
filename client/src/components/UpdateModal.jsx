import React, { useState } from 'react'
import CustomBadge from '../components/CustomBadge'
import CustomButton from '../components/CustomButton'
import '../styles/components/UpdateModal.scss'

import { connect } from 'react-redux'
import { updateCartItem } from '../redux/actions/cartActions'

const UpdateModal = ({ title, values, disableOverlay, prevVal, type, itemId, updateCartItem }) => {
  const [selectedVal, setSelectedVal] = useState(prevVal)

  const handleClick = () => {
    disableOverlay()
    let value = ''
    if (type === 'dosage') value = selectedVal.replace(' ', '')
    else value = selectedVal.split(' ')[0]
    updateCartItem(itemId, type, value)
  }

  return (
    <div className='UpdateModal'>
      <p style={{ fontSize: '2.5rem' }} className='UpdateModal__title'>{title}</p>
      <div className='UpdateModal__badges'>
        { values.map((value, index) => <CustomBadge onClick={val => setSelectedVal(val)} selected={selectedVal === value} key={index} badgeValue={value} />)}
      </div>
      <div className='UpdateModal__buttons'>
        <CustomButton specialBgColor='#d44a4a' fontSize='2rem' onClick={disableOverlay}>Cancel</CustomButton>
        { /* Implement disable feature for update button */ }
        <CustomButton onClick={handleClick} fontSize='2rem'>Update</CustomButton>
      </div>
    </div>
  )
}

export default connect(null, { updateCartItem })(UpdateModal)