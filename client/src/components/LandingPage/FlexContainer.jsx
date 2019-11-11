import React from 'react'
import styled from 'styled-components'

const FlexContainerStyle = styled.div`
  width: 100%;
  border-radius: 5px;
  margin: 6rem 0;
  background: #f1f2f6;
  padding: 2rem;
  padding-top: 6rem;
  position: relative;
`

const FlexContainerTitle = styled.h2`
  padding: 1rem;
  background-color: #7AC7B8;
  width: 20%;
  border-radius: 1rem;
  margin: 0 auto;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  position: absolute;
  left: 50%;
  top: -2rem;
  transform: translate(-50%);
`

export const FlexContainer = ({ titleName, children }) => {
  return (
    <FlexContainerStyle>
      <FlexContainerTitle>{titleName}</FlexContainerTitle>
      { children }
    </FlexContainerStyle>
  )
}
