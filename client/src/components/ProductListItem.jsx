import React from 'react'
import CustomButton from '../components/CustomButton'
import '../styles/components/ProductListItem.scss'
import { Link } from 'react-router-dom'

const ProductListItem = ({ product: { photos, name, price, _id } }) => {
  return (
    <div className='ProductListItem'>
      <img src={photos[0]} alt='product' className='ProductListItem__image' />
      <div className='ProductListItem__details'>
        <Link style={{ textAlign: 'center' }} to={`/product/${_id}`}><p className='ProductListItem__details--title'>{ name }</p></Link>
      </div>
      <Link style={{ marginTop: '1rem' }} to={`/product/${_id}`}><CustomButton fontSize='1.4rem'>Buy Now</CustomButton></Link>
    </div>
  )
}

export default ProductListItem