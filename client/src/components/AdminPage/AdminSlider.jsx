import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {changeProductAvailableState} from '../../redux/actions/inventoryActions'

import '../../styles/components/AdminSlider.scss'

const AdminSlider = ({ checked, productId, changeProductAvailableState }) => {
  const [activeState, setActiveState] = useState(checked)
  const handleClick = () => {
    setActiveState(!activeState)
    changeProductAvailableState(productId, !activeState)
  }
  return (
    <div className='AdminSlider' onClick={handleClick}>
      <div className={`AdminSlider__circle ${activeState ? 'active' : ''}`}></div>
    </div>
  )
}

AdminSlider.propTypes = {
  checked: PropTypes.bool
}

export default connect(null, { changeProductAvailableState })(AdminSlider)
