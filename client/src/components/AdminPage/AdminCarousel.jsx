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
      { totalPages > 1 ? <span style={{ cursor: 'pointer' }}><LeftArrow /></span> : null }
        <div className="AdminCarousel__circles">
          { numbers }
        </div>
      { totalPages > 1 ? <span style={{ cursor: 'pointer' }}><RightArrow /></span> : null }
    </div>
  )
}

export default AdminCarousel
