import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fetchAllCategories } from '../../redux/actions/inventoryActions'

const Condtions = ({ conditions, fetchAllCategories }) => {
  return !conditioms (
    <div >
      
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  conditions: fetchAllCategories
})

export default connect(mapStateToProps, { fetchAllCategories })(Condtions)
