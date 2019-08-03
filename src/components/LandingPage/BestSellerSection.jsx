import React from 'react'
import temporaryImg from '../../images/klonopin.png'
import ProductList from '../../components/ProductList'


const products = [
  {
    id: 1,
    name: 'Modalert 200mg',
    price: '180',
    imageUrl: temporaryImg
  },
  {
    id: 2,
    name: 'Ol-Tram 30mg',
    price: '250',
    imageUrl: temporaryImg
  },
  {
    id: 3,
    name: 'Pain-O-Soma 30mg',
    price: '200',
    imageUrl: temporaryImg
  },
]

const BestSellerSection = props => {
  return (
    <div className='LandingPage__best-products'>
      <h3 className='LandingPage__best-products--title'>Best Sellers</h3>
      <ProductList products={products} />
    </div>
  )
}

export default BestSellerSection