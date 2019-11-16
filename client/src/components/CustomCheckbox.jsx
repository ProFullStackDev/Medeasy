import React from 'react'
import '../styles/components/CustomCheckBox.scss'
import { ReactComponent as TickMarkIcon } from '../images/tickmark.svg'

const CustomCheckBox = ({ onClick, value }) => {
  return (
    <div className='CustomCheckBox'>
      <div className={`CustomCheckBox__check ${value ? 'activated' : ''}`} onClick={onClick} >
        { value ? <TickMarkIcon /> : null }
      </div>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Remember me</p>
    </div>
  )
}

export default CustomCheckBox