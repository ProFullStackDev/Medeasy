import React from 'react'
import { ReactComponent as LeftArrow } from '../../images/ladminarrow.svg'
import { ReactComponent as RightArrow } from '../../images/radminarrow.svg'
import '../../styles/components/AdminCarousel.scss'

const AdminCarousel = ({ totalPages, currentPageNumber, onClick }) => {
  const numbers = []
  for (let number = 1; number <= totalPages; number++)
    numbers.push(<div onClick={() => onClick(number)} key={number} className={`AdminCarousel__circle ${currentPageNumber === number ? 'active' : ''}`}>{number}</div>)
  return (
    <div className='AdminCarousel'>
      <span style={{ cursor: 'pointer' }}><LeftArrow /></span>
        <div className="AdminCarousel__circles">
          { numbers }
        </div>
      <span style={{ cursor: 'pointer' }}><RightArrow /></span>
    </div>
  )
}

export default AdminCarousel
