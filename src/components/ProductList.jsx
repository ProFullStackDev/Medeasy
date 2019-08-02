import React from 'react'
import ProductListItem from './ProductListItem'
import '../styles/components/ProductList.scss'

const ProductList = ({ products }) => {
  return (
    <div className='ProductList'>
      { products.map(product => <ProductListItem id={ product.id } product={product} />) }
    </div>
  )
}
 
export default ProductList