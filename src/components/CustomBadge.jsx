import React from 'react'
import '../styles/components/CustomBadge.scss'

const CustomBadge = ({ badgeValue }) => {
  return (
    <div className='CustomBadge'>
      {badgeValue}
    </div>
  )
}

export default CustomBadge