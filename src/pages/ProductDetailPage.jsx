import React from 'react'
import '../styles/pages/ProductDetailPage.scss'
// components
import ProductImageCarousel from '../components/ProductDetailPage/ProductImageCarousel'
import ProductInformation from '../components/ProductDetailPage/ProductInformation'

const ProductDetailPage = (props) => {
  return (
    <div className='ProductDetailPage'>
      <div className='ProductDetailPage__informations'>
        <ProductImageCarousel />
        
      </div>
    </div>
  )
}
 
export default ProductDetailPage;