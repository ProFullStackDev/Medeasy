import React from 'react'
import PropTypes from 'prop-types'
import CustomButton from '../CustomButton'
import { Link } from 'react-router-dom'

import '../../styles/components/AdminCard.scss'

const AdminCard = ({ title, value, btnRequired, btnText, btnLink }) => {
  return (
    <div className='AdminCard'>
      <h2 className='AdminCard__title'>{ title }</h2>
      <p className='AdminCard__value'>{ value }</p>
      { btnRequired && <CustomButton><Link to={`/admin/dashboard/${btnLink}`}>{btnText}</Link></CustomButton> }
    </div>
  )
}

AdminCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  btnRequired: PropTypes.bool,
  btnText: PropTypes.string
}

export default AdminCard
