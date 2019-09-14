import React from 'react'
import '../styles/components/CustomButton.scss'

const CustomButton = ({ extraStyle, specialBgColor, isSubmitButton, children, fontSize, onClick }) => {
  return (
    <button onClick={onClick} style={{ background: `${ specialBgColor ? specialBgColor : null }`, fontSize, padding: `${isSubmitButton ? '1.5rem 2.5rem' : '1rem 2rem' }`, ...extraStyle }} type={isSubmitButton ? 'submit' : '' } className='CustomButton'>
      {children}
    </button>
  )
}

export default CustomButton