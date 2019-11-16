import React from 'react'
import '../styles/components/CustomButton.scss'

const CustomButton = ({
  disabled,
  isLink,
  link,
  extraStyle,
  specialBgColor,
  isSubmitButton,
  children,
  fontSize,
  onClick
}) => {
  return !isLink ? (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        background: `${specialBgColor ? specialBgColor : null}`,
        fontSize,
        padding: `${isSubmitButton ? '1.5rem 2.5rem' : '1rem 2rem'}`,
        ...extraStyle
      }}
      type={isSubmitButton ? 'submit' : ''}
      className='CustomButton'
    >
      {children}
    </button>
  ) : (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      disabled={disabled}
      onClick={onClick}
      style={{
        background: `${specialBgColor ? specialBgColor : null}`,
        fontSize,
        display: 'inline-block',
        color: 'white',
        padding: `${isSubmitButton ? '1.5rem 2.5rem' : '1rem 2rem'}`,
        ...extraStyle
      }}
      type={isSubmitButton ? 'submit' : ''}
      className='CustomButton'
    >
      {children}
    </a>
  )
}

export default CustomButton
