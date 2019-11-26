import React from 'react'
import '../styles/components/CustomCheckBox.scss'
import { ReactComponent as TickMarkIcon } from '../images/tickmark.svg'

const CustomCheckBox = ({ onClick, value, text, customStyle, style }) => {
  return (
    <div
      className='CustomCheckBox'
      onClick={onClick}
      style={{ cursor: 'pointer', ...style }}
    >
      <div className={`CustomCheckBox__check ${value ? 'activated' : ''}`}>
        {value ? <TickMarkIcon /> : null}
      </div>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', ...customStyle }}>
        {text ? text : 'Remember me'}
      </p>
    </div>
  )
}

export default CustomCheckBox
