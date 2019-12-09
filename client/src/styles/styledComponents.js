import styled from 'styled-components'
// Styles
export const Title = styled.h2`
  margin-top: 2rem;
  font-weight: bolder;
  font-size: 2.5rem;
  text-transform: uppercase;
  color: black;
`

export const DescriptionContainer = styled.div`
  margin: 1.5rem 0;
  padding: 2rem;
  border-radius: 5px;
  width: 100%;
  min-height: 15rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  & p {
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
`