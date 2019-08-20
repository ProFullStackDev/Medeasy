import React, { useState } from 'react'
import CustomButton from '../CustomButton'
import AddressChangeMain from './AddressChangeMain'
import AddressChangeEdit from './AddressChangeEdit'

// These States might get transferred in Redux ..
// Hence plan accordingly

const AddressChangeController = props => {
  // Whether user has clicked address edit or add
  const [editMode, setEditMode] = useState(false)
  return (
    <React.Fragment>
      { /* Either It must display all addresses, or it must show the edit page */ }
      <AddressChangeMain />
    </React.Fragment>
  ) 
}

export default AddressChangeController