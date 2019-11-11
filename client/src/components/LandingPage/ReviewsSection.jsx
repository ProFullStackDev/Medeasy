import React from 'react'
import { FlexContainer } from './FlexContainer'

export const ReviewsSection = ({ reviews }) => {
  return (
    <FlexContainer titleName='reviews'>
      <ul style={{ margin: '3rem 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 'minmax(15rem, max-content)' }}>
        { reviews.map((review, index) => <li key={index} className='review-item' style={{ padding: '0 2rem', alignSelf: 'center', height: '100%' }}>
          <p style={{ marginBottom: '1rem', lineHeight: 1.5 }}>{review.text}</p>
          <h4>{review.createdAt}</h4>
        </li>) }
      </ul>
    </FlexContainer>
  )
}
