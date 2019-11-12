import React from 'react'
import styled from 'styled-components'

const ProductsTitleContainer = styled.div`
  width: ${props => props.width || '100%'};
  display: flex;
  justify-content: space-between;
  color: white;
  font-weight: bold;
  font-size: 1.8rem;
  padding: 1.5rem 2rem;
  margin-bottom: 1rem;
  background: #7AC7B8;
  border-radius: 10rem;
`

export const ProductsTitle = ({ width, imageOnly }) => {
  return (
    <ProductsTitleContainer width={width}>
      <span>{ imageOnly ? 'Product Image' : 'S.No' }</span>
      <span>Name</span>
      <span>Dosage</span>
      <span>Quantity</span>
      <span>Price</span>
    </ProductsTitleContainer>
  )
}


export default ProductsTitle