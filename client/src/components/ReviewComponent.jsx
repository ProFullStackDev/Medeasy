import React from 'react'
import styled from 'styled-components'

const ReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 1.5rem 3.5rem;
  align-items: center;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  position: relative;
`

const ImageCircle = styled.img`
  border-radius: 50%;
  max-width: 10rem;
  max-height: 10rem;
  margin-bottom: 2rem;
`

const Review = styled.blockquote`
  font-size: 1.8rem;
  color: #888;
  text-align: left;
  line-height: 1.5;
  font-style: italic;
`

const ReviewName = styled.cite`
  margin-top: 1rem;
  display: block;
  width: max-content;
  font-size: 2rem;
  font-weight: bold;
  color: #222;
  position: absolute;
  bottom: 1.5rem;
`

export const ReviewComponent = ({ name, review, personImage }) => {
  return (
    <ReviewStyle>
      <ImageCircle src={personImage} alt='Reviewer' />
      <Review>
        <q>&nbsp;{review}&nbsp;</q>
        <ReviewName>- {name}</ReviewName>
      </Review>
    </ReviewStyle>
  )
}
