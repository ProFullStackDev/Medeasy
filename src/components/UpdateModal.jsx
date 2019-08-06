import React from 'react'
import CustomBadge from '../components/CustomBadge'
import CustomButton from '../components/CustomButton'
import '../styles/components/UpdateModal.scss'

const UpdateModal = ({title, values, disableOverlay}) => {
  return (
    <div className='UpdateModal'>
      <p style={{ fontSize: '2.5rem' }} className='UpdateModal__title'>{title}</p>
      <div className='UpdateModal__badges'>
        { values.map((value, index) => <CustomBadge key={index} badgeValue={value} />)}
      </div>
      <div className='UpdateModal__buttons'>
        <CustomButton specialBgColor='#d44a4a' fontSize='2rem' onClick={disableOverlay}>Cancel</CustomButton>
        { /* Implement disable feature for update button */ }
        <CustomButton fontSize='2rem' onClick={disableOverlay}>Update</CustomButton>
      </div>
    </div>
  )
}

export default UpdateModal