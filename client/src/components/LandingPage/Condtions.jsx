import React from 'react'
import { FlexContainer } from './FlexContainer'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import anxietyImage from '../../images/anxiety.jpg'
import adhdImage from '../../images/adhd.jpg'
import edImage from '../../images/ed.jpg'
import insomniaImage from '../../images/insomnia.jpg'
import muscleImage from '../../images/muscle.jpg'
import painImage from '../../images/pain.jpg'
import smokingImage from '../../images/smoking.jpg'
import weightImage from '../../images/weight.jpg'

const ConditionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;
  row-gap: 2rem;
  grid-auto-rows: minmax(20rem, max-content);
`

const ConditionItem = styled.div`
  position: relative;
  background: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.45) 100%
    ),
    url(${({ image }) => image}) no-repeat;
  background-position: center;
  background-size: cover;
  color: white;
  height: 100%;
  transition: background 0.3s ease-in;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.8rem;
  justify-content: center;
  &:hover {
    transition: background-color 0.3s ease-in;
    background: linear-gradient(
        to bottom right,
        rgba(122, 199, 184, 0.5) 0%,
        rgba(122, 199, 184, 0.4) 100%
      ),
      url(${({ image }) => image}) no-repeat;
    background-position: center;
    background-size: cover;
    box-shadow: 0;
    cursor: pointer;
  }
`

const images = [
  adhdImage,
  edImage,
  weightImage,
  anxietyImage,
  insomniaImage,
  muscleImage,
  painImage,
  smokingImage
]

const Conditions = ({ conditions }) => {
  return (
    <FlexContainer titleName='Conditions'>
      <ConditionsContainer>
        {conditions.map((condition, index) => (
          <Link
            key={condition._id}
            to={`/condition/${condition._id}`}
            id={condition._id}>
            <ConditionItem image={images[index]}>
              {condition.name}
            </ConditionItem>
          </Link>
        ))}
      </ConditionsContainer>
    </FlexContainer>
  )
}

export default Conditions
