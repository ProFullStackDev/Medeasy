import React from 'react'
import '../styles/components/CustomButton.scss'

const CustomButton = ({ disabled, extraStyle, specialBgColor, isSubmitButton, children, fontSize, onClick }) => {
  return (
    <button disabled={disabled} onClick={onClick} style={{ background: `${ specialBgColor ? specialBgColor : null }`, fontSize, padding: `${isSubmitButton ? '1.5rem 2.5rem' : '1rem 2rem' }`, ...extraStyle }} type={isSubmitButton ? 'submit' : '' } className='CustomButton'>
      {children}
    </button>
  )
}

export default CustomButton