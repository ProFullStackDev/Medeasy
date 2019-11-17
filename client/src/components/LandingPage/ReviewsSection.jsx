import React from 'react'
import { FlexContainer } from './FlexContainer'
import { ReviewComponent } from '../ReviewComponent'

// Images
import ReviewImage1 from '../../images/review1.jpg'
import ReviewImage2 from '../../images/review2.jpg'
import ReviewImage3 from '../../images/review3.jpg'
import ReviewImage4 from '../../images/review4.jpg'

const reviews = [
  {
    name: 'James Miller',
    review:
      'Wow! Super fast delivery and the quality of the product is even better. Thanks.',
    image: ReviewImage1
  },
  {
    name: 'Clifford Guevera',
    review:
      'I am grateful to you customer service team for being so helpful when placing my order.',
    image: ReviewImage2
  },
  {
    name: 'Kelly Malone',
    review:
      'I have been ordering from you now for some time and I just wanted to take this.',
    image: ReviewImage3
  },
  {
    name: 'Saddie Milner',
    review: 'Great Results Thanks.',
    image: ReviewImage4
  }
]

export const ReviewsSection = () => {
  return (
    <FlexContainer titleName='reviews'>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: 'minmax(32rem, max-content)',
          columnGap: '2.5rem',
          marginBottom: '2rem'
        }}>
        {reviews.map(({ review, name, image }, index) => (
          <ReviewComponent
            review={review}
            personImage={image}
            name={name}
            key={index}
          />
        ))}
      </div>
    </FlexContainer>
  )
}

export default ReviewsSection
