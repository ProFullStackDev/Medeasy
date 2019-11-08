import React from 'react'
import '../styles/components/CustomRadioButton.scss'

const CustomRadioButton = ({ mode, onClick, noName, selected, text }) => {
  const handleClick = () => onClick(mode)
  return (
    <div data-mode={mode} className='CustomRadioButton' onClick={handleClick}>
      <div onClick={handleClick}  className='CustomRadioButton__circle'>
        <div className={`CustomRadioButton__circle-active ${selected ? 'glow' : ''}`}></div>
      </div>
      { !noName && <p className='CustomRadioButton__text'>{ text }</p> }
    </div>
  )
}

export default CustomRadioButton;