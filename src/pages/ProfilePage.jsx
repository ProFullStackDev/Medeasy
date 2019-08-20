import React from 'react'
import ProfilePageNavBar from '../components/ProfilePage/ProfilePageNavBar'
import ProfilePageDisplay from '../components/ProfilePage/ProfilePageDisplay'

import '../styles/pages/ProfilePage.scss'

const ProfilePage = props => {
  return (
    <div className='ProfilePage'>
      <ProfilePageNavBar />
      <ProfilePageDisplay />
    </div>
  )
}

export default ProfilePage