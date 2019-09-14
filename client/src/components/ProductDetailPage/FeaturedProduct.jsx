import React from 'react'
const FeaturedProduct = props => {
  return (
    <div className='FeaturedProduct' style={style}>
      <span>Featured</span>
    </div>
  )
}

const style = {
  display: 'flex',
  justifyContent: 'center',
  marginRight: 'auto',
  marginLeft: '1.5rem',
  width: '6rem',
  height: '6rem',
  alignItems: 'center',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  background: '#F8931A',
  color: 'white',
  borderRadius: '50%'
}

export default FeaturedProduct