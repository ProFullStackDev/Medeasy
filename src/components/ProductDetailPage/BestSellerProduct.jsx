import React from 'react'

const BestSellerProduct = props => {
  return (
    <div className='BestSellerProduct' style={style}>
      <span>Best</span>
      <span>Seller</span>
    </div>
  )
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '5rem',
  alignItems: 'center',
  justifyContent: 'center',
  width: '6rem',
  height: '6rem',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  background: '#7AC7B8',
  color: 'white',
  borderRadius: '50%'
}

export default BestSellerProduct