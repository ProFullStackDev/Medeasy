import React from 'react'
import '../styles/components/CustomBadge.scss'

const CustomBadge = ({ badgeValue, selected, onClick }) => {
  const handleClick = () => {
    onClick(badgeValue)
  }
  return (
    <div onClick={handleClick} className={`CustomBadge ${selected ? 'activeBadge': ''}`}>
      {badgeValue}
    </div>
  )
}

export default CustomBadge