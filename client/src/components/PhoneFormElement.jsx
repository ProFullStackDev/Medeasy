import React from 'react'
import CustomFormElement from '../components/CustomFormElement'
import '../styles/components/PhoneFormElement.scss'
const PhoneFormElement = ({ value, onChange, required, name }) => {
  return (
    <div style={ { width: '100%' } }>
      <label htmlFor='phnumber'>Phone Number *</label>
      <div className='PhoneFormElement' style={{ marginBottom: '1.5rem' }}>
        <div className='PhoneFormElement-code'>+1</div>
        <CustomFormElement required={required} type='number' noStyle noLabel value={value} onChange={onChange} name={name ? name : 'phNumber'} id='phnumber' />
      </div>
    </div>
  )
}


export default PhoneFormElement