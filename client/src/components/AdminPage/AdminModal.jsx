import React from 'react'
import '../styles/components/AdminModal.scss'
import CustomButton from './CustomButton'

const AdminModal = ({ title, subTitle }) => {
  return (
    <div className='AdminModal'>
      <h2 className='AdminModal__title'>{ title }</h2>
      <p className='AdminModal__subtitle'>{ subTitle }</p>
      <div className='AdminModal__buttons'>
        <CustomButton>Cancel</CustomButton>
        <CustomButton specialBgColor='#D44A4A'>Delete</CustomButton>
      </div> 
    </div>
  )
}

export default AdminModal
