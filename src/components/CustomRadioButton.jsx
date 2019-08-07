import React from 'react'

const CustomRadioButton = ({ selected, text }) => {
  return (
    <div className='CustomRadioButton'>
      <div className='CustomRadioButton__circle'>
        <div className={`CustomRadioButton__circle-active ${selected ? 'glow' : ''}`}></div>
      </div>
      <p className='CustomRadioButton__text'>{ text }</p>
    </div>
  )
}

export default CustomRadioButton