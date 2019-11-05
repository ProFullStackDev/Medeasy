import React from 'react'
import ProductList from '../../components/ProductList'

const BestSellerSection = ({ products }) => {
  return (
    <div className='LandingPage__best-products'>
      <h3 style={{ textAlign: 'center', color: 'white', background: '#7ac7b8', fontWeight: 'normal', padding: '.5rem', borderRadius: '2rem', width: '20%', margin: '2.5rem auto', cursor: 'default' }} className='LandingPage__best-products--title'>Best Sellers</h3>
      <ProductList products={products} />
    </div>
  )
}

export default BestSellerSection