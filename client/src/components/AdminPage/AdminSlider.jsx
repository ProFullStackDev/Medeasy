import React, { useState } from 'react'
import PropTypes from 'prop-types'

import '../styles/components/AdminSlider.scss'

const AdminSlider = ({ checked }) => {
  const [activeState, setActiveState] = useState(checked)
  const handleClick = () => setActiveState(!activeState)
  return (
    <div className='AdminSlider' onClick={handleClick}>
      <div className={`AdminSlider__circle ${activeState ? 'active' : ''}`}></div>
    </div>
  )
}

AdminSlider.propTypes = {
  checked: PropTypes.bool
}

export default AdminSlider
