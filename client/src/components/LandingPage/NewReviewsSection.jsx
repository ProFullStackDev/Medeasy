import React from 'react'
import styled from 'styled-components'
import { ReviewComponent } from '../ReviewComponent'

// Images
import ReviewImage1 from '../../images/review1.jpg'
import ReviewImage2 from '../../images/review2.jpg'
import ReviewImage3 from '../../images/review3.jpg'
import ReviewImage4 from '../../images/review4.jpg'

// Styles
const ReviewsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Decoration = styled.span`
  background: #426f66;
  max-width: 3px;
  border-radius: 10rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`

const LeftContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
  margin-top: 10.5rem;
`
const RightContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 1.5rem;
`
const Title = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  color: #426f66;
  margin-right: 3rem;
`



export const NewReviewsSection = () => {
  return (
    <ReviewsContainer>
      <LeftContainer>
        <Title>Here is what our customers have to say</Title>
        <div
          style={{
            marginTop: '5px',
            display: 'flex',
            flexBasis: '5%',
            flexDirection: 'column'
          }}>
          <Decoration style={{ height: '20px' }}></Decoration>
          <Decoration style={{ height: '6px' }}></Decoration>
          <Decoration style={{ height: '6px' }}></Decoration>
        </div>
      </LeftContainer>
      <RightContainer>
        
      </RightContainer>
    </ReviewsContainer>
  )
}

export default NewReviewsSection
