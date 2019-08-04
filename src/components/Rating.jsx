import React from 'react'
import starWhite from '../images/starWhite.svg'

const Rating = ({ rating }) => {

  let background = ''
  if (rating === 5) background = '#19AB2B'
  else if (rating >= 4 && rating < 5) background = '#82B42C'
  else if (rating >= 3 && rating < 4) background = '#FDB529'
  else if (rating >= 2 && rating < 3) background = '#EB7724'
  else if (rating >= 0 && rating < 2) background = '#D11C1A'

  return (
    <div className='Rating' style={{ ...ratingStyles, background }}>
      <span className='Rating__rating'>
        { rating }
        <img style={{ marginLeft: '5px' }} src={ starWhite } alt='rating-star' />
      </span>
    </div>
  )
}

const ratingStyles = {
  padding: '5px',
  borderRadius: '5px',
  fontSize: '2rem',
  color: 'white'
}
 
export default Rating