import React from 'react'
import CustomFormElement from '../components/CustomFormElement'
import '../styles/components/PhoneFormElement.scss'
const PhoneFormElement = ({ value, onChange }) => {
  return (
    <div style={ { width: '100%' } }>
      <label htmlFor='phnumber'>Phone Number</label>
      <div className='PhoneFormElement' style={{ marginBottom: '1.5rem' }}>
        <div className='PhoneFormElement-code'>+1</div>
        <CustomFormElement type='number' noStyle noLabel value={value} onChange={onChange} name='phNumber' id='phnumber' />
      </div>
    </div>
  )
}


export default PhoneFormElement