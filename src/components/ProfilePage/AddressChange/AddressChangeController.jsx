import React, { useState } from 'react'
import AddressChangeMain from './AddressChangeMain'
import AddressChangeEdit from './AddressChangeEdit'

const AddressChangeController = props => {
  // Whether user has clicked address edit or add
  const [editMode, setEditMode] = useState(false)
  // Changing the edit mode
  const changeEditMode = modeBoolean => setEditMode(modeBoolean) 
  return (
    <React.Fragment>
      { /* Either It must display all addresses, or it must show the edit page */ }
      { editMode ? <AddressChangeEdit changeEditMode={changeEditMode} /> 
        : <AddressChangeMain changeEditMode={changeEditMode} />
      }
    </React.Fragment>
  ) 
}

export default AddressChangeController