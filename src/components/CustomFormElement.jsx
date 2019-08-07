import React from 'react'
import '../styles/components/CustomFormElement.scss'

const CustomFormElement = ({ noStyle, noLabel, isTextArea, onChange, labelName, name, type, id, value }) => {
  return (
    <div className='CustomFormElement' style={ !noStyle ? { marginBottom: '1.5rem' } : null }>
      { !noLabel && <label htmlFor={id}>Name</label> }
      { !isTextArea ? <input onChange={onChange} name={name} type={type} id={id} value={value} /> :
        <textarea onChange={onChange} name={name} id={id} value={value} />
      }
    </div>
  )
}

export default CustomFormElement