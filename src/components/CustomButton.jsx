import React from 'react'
const CustomButton = props => {
  return (
    <button type={props.isSubmitButton ? 'submit' : ''} className='CustomButton'>
      {props.value}
    </button>
  )
}

export default CustomButton