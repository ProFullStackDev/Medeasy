import React from 'react'
import '../styles/components/AlertMesage.scss'

const AlertMessage = ({ message, alertType }) => {
  return (
    <div className={`AlertMessage ${alertType}`}>
      { message }
    </div>
  )
}

export default AlertMessage