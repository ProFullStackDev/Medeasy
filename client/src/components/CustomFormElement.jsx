import React from 'react'
import '../styles/components/CustomFormElement.scss'

const CustomFormElement = ({ max, maxLength, required, pattern, placeholder, noStyle, noLabel, isTextArea, onChange, labelName, name, type, id, value }) => {
  return (
    <div className='CustomFormElement' style={ !noStyle ? { marginBottom: '1.5rem' } : null }>
      { !noLabel && <label htmlFor={id}>{labelName}</label> }
      { !isTextArea ? <input maxLength={maxLength} required={ required ? true : false } pattern={pattern} placeholder={placeholder} onChange={onChange} name={name} type={type} id={id} value={value} /> :
        <textarea maxLength={ maxLength } required={ required ? true : false } placeholder={placeholder} onChange={onChange} name={name} id={id} value={value} />
      }
    </div>
  )
}

export default CustomFormElement