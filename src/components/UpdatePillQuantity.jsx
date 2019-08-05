import React from 'react'
import CustomBadge from '../components/CustomBadge'
import CustomButton from '../components/CustomButton'
import '../styles/components/UpdatePillQuantity.scss'

const UpdatePillQuantity = props => {
  return (
    <div className='UpdatePillQuantity'>
      <p style={{ fontSize: '2.5rem' }} className='UpdatePillQuantity__title'>Update Pill Quantity</p>
      <div className='UpdatePillQuantity__pills'>
        <CustomBadge badgeValue='50 Pills'/>
        <CustomBadge badgeValue='100 Pills'/>
        <CustomBadge badgeValue='150 Pills'/>
        <CustomBadge badgeValue='200 Pills'/>
      </div>
      <div className='UpdatePillQuantity__buttons'>
        <CustomButton specialBgColor='#d44a4a' fontSize='2rem'>Cancel</CustomButton>
        <CustomButton fontSize='2rem'>Update</CustomButton>
      </div>
    </div>
  )
}

export default UpdatePillQuantity