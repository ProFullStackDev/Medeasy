import React from 'react'
import Rating from '../Rating'
import verifiedBuyerBadge from '../../images/verified.svg'
import '../../styles/components/ReviewListItem.scss'

const ReviewListItem = ({ name, date, rating, review }) => {
  return (
    <div className='ReviewListItem'>
      <div className='ReviewListItem__details'>
        <div className='ReviewListItem__details-user'>
          <span style={{ fontSize: '2rem' }} className='ReviewListItem__details-user--name'>
            { name }
          </span>
          <span className='ReviewListItem__details-user--date'>
            { date }
          </span>
        </div>
        <img src={verifiedBuyerBadge} alt='verified' />
      </div>
      <div className='ReviewListItem__ratings'>
        <span className='ReviewListItem__ratings--title'>Rated:</span>
        <Rating rating={rating} />
      </div>
      <p style={{ fontSize: '2rem' }} className='ReviewListItem__rating'>
        “{review}”
      </p>
    </div>
  )
}
 
export default ReviewListItem