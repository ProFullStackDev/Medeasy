import React from 'react'
import '../styles/components/AlertMesage.scss'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAlertAlerts } from '../redux/selectors/alertSelectors'
import PropTypes from 'prop-types'

const AlertMessage = ({ alerts }) => {
  return (
    alerts.map(({ id, alertType, message }) => 
      <div key={id} className={`AlertMessage ${alertType}`}>
        { message }
      </div> ) 
  )
}

AlertMessage.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = createStructuredSelector({
  alerts: selectAlertAlerts
})

export default connect(mapStateToProps)(AlertMessage)