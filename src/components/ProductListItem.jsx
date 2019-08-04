import React from 'react'
import CustomButton from '../components/CustomButton'
import '../styles/components/ProductListItem.scss'
import { Link } from 'react-router-dom'

const ProductListItem = ({ product: { imageUrl, name, price, id }, history}) => {
  return (
    <div className='ProductListItem'>
      <img src={imageUrl} alt='product' className='ProductListItem__image' />
      <div className='ProductListItem__details'>
        <Link to={`/product/${name.toLowerCase().replace(' ', '-')}`}><p className='ProductListItem__details--title'>{ name }</p></Link>
        <span className='ProductListItem__details--count' style={{ fontSize: '1rem' }}>Pack of 50 Tablets</span>
        <h3 className='ProductListItem__details--price'>${ price }</h3>
      </div>
      <CustomButton fontSize='1.4rem'>Add to cart</CustomButton>
    </div>
  )
}

export default ProductListItem