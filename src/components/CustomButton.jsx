import React from 'react'
import '../styles/components/CustomButton.scss'

const CustomButton = ({ specialBgColor, isSubmitButton, children, fontSize }) => {
  return (
    <button style={{ background: `${ specialBgColor ? specialBgColor : null }`, fontSize, padding: `${isSubmitButton ? '1.5rem 2.5rem' : '1rem 2rem' }` }} type={isSubmitButton ? 'submit' : ''} className='CustomButton'>
      {children}
    </button>
  )
}

export default CustomButton