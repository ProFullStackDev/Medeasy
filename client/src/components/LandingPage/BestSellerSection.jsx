import React from 'react'
import ProductList from '../../components/ProductList'
import { FlexContainer } from './FlexContainer'

const BestSellerSection = ({ products }) => {
  return (
    <FlexContainer titleName='Best Sellers'>
      <ProductList products={products} />
    </FlexContainer>
  )
}

export default BestSellerSection