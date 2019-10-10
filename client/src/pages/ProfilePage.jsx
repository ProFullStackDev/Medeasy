import React, { useState } from 'react'
import ProfilePageNavBar from '../components/ProfilePage/ProfilePageNavBar'
import ProfilePageDisplay from '../components/ProfilePage/ProfilePageDisplay'

import '../styles/pages/ProfilePage.scss'

const ProfilePage = props => {
  const [profileSubState, setProfileSubState] = useState('creditCard')
  const handleSubStateChange = mode => setProfileSubState(mode)
  return (
    <section className='ProfilePage'>
      <ProfilePageNavBar setCurrentMode={handleSubStateChange} currentMode={profileSubState} />
      <ProfilePageDisplay currentMode={profileSubState} />
    </section>
  )
}

export default ProfilePage