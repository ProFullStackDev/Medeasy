import React, { useState } from 'react'
import ProfilePageNavBar from '../components/ProfilePage/ProfilePageNavBar'
import ProfilePageDisplay from '../components/ProfilePage/ProfilePageDisplay'

import '../styles/pages/ProfilePage.scss'

const ProfilePage = props => {
  const [profileSubState, setProfileSubState] = useState('manageAddress')
  const handleSubStateChange = mode => setProfileSubState(mode)
  return (
    <div className='ProfilePage'>
      <ProfilePageNavBar setCurrentMode={handleSubStateChange} currentMode={profileSubState} />
      <ProfilePageDisplay currentMode={profileSubState} />
    </div>
  )
}

export default ProfilePage