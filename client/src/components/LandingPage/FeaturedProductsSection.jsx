import React from 'react'
import ProductList from '../ProductList'
import { FlexContainer } from './FlexContainer'

const FeaturedProductsSection = ({ products }) => {
  return products.length > 0 ? (
    <FlexContainer titleName='Featured'>
      <ProductList products={products} />
    </FlexContainer>
  ) : null
}
 
export default FeaturedProductsSection;