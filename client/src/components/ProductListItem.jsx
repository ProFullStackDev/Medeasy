import React from 'react'
import CustomButton from '../components/CustomButton'
import '../styles/components/ProductListItem.scss'
import { Link } from 'react-router-dom'

const ProductListItem = ({ product: { photos, name, price, dosages, quantities, _id } }) => {
  return (
    <Link to={`/product/${_id}`}><div className='ProductListItem'>
      <img src={photos[0]} alt='product' className='ProductListItem__image' />
      <div className='ProductListItem__details'>
        <Link to={`/product/${_id}`}><p className='ProductListItem__details--title'>{`${name} ${dosages[0]} mg`}</p></Link>
        <p style={{ color: '#827E7E', fontSize: '1rem', margin: '.5rem 0' }}>Pack of {quantities[0]} tablets</p>
        <p style={{ fontSize: '1.8rem', marginTop: '1rem' }}>${price[`${dosages[0]}mg`][quantities[0]]}</p>
      </div>
      <Link style={{ marginTop: '1rem' }} to={`/product/${_id}`}><CustomButton extraStyle={{ background: '#F8931A' }} fontSize='1.4rem'>Buy Now</CustomButton></Link>
    </div></Link>
  )
}

export default ProductListItem