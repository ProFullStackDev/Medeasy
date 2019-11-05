import React from 'react'
const StockStatus = ({ status }) => {
  console.log(status)
  return (
    <div className='StockStatus' style={{ ...stockStatusStyles, background: !status ? '#d11c1a' : '#19ab2b' }}>
      <p className='StockStatus__status'>{ !status ? 'Out of Stock' : 'In Stock' }</p>
    </div>
  )
}

const stockStatusStyles = {
  fontSize: '1.8rem',
  color: '#fff',
  padding: '5px 2.5rem',
  borderRadius: '5px'
}

export default StockStatus