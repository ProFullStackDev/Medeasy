import React from 'react'
const StockStatus = ({ value }) => {
  return (
    <div className='StockStatus' style={{ ...stockStatusStyles, background: value === 'oos' ? '#d11c1a' : '#19ab2b' }}>
      <p className='StockStatus__value'>{ value === 'oos' ? 'Out of Stock' : 'In Stock' }</p>
    </div>
  )
}

const stockStatusStyles = {
  fontSize: '1.8rem',
  color: '#fff',
  padding: '5px 2.5rem',
}

export default StockStatus