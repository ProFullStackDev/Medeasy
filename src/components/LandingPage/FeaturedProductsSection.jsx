import React from 'react'
import ProductList from '../ProductList'

import temporaryImg from '../../images/klonopin.png'

const products = [
  {
    id: 1,
    name: 'Klonopin 2mg',
    price: '180',
    imageUrl: temporaryImg
  },
  {
    id: 2,
    name: 'Hydrocodone 30mg',
    price: '250',
    imageUrl: temporaryImg
  },
  {
    id: 3,
    name: 'Percocet 30mg',
    price: '200',
    imageUrl: temporaryImg
  },
  {
    id: 4,
    name: 'Ambien 10mg',
    price: '155',
    imageUrl: temporaryImg
  },
  {
    id: 5,
    name: 'Oxycodone 80mg',
    price: '230',
    imageUrl: temporaryImg
  }
]

const FeaturedProductsSection = props => {
  return (
    <div className='LandingPage__featured-products'>
      <h3 className='LandingPage__featured-products--title'>Featured Products</h3>
      <ProductList products={products} />
    </div>
  )
}
 
export default FeaturedProductsSection;