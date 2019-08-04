import React from 'react'
import '../../styles/components/ProductInformation.scss'
// components
import BestSellerProduct from './BestSellerProduct'
import FeaturedProduct from './FeaturedProduct'
import Rating from '../Rating'
import StockStatus from '../StockStatus'
import CustomBadge from '../CustomBadge'
import Assurances from './Assurances'

const ProductInformation = props => {
  return (
    <div className='ProductInformation'>
      <div className='ProductInformation__detail'>
        <span className='ProductInformation__detail--name'>
          AMBIEN
        </span>
        <span className='ProductInformation__detail--manufacturer'>by <a href='www' style={{ color: '#7AC7B8', fontSize: '1.8rem' }}>Sanofi Aventis Ltd</a></span>
        <BestSellerProduct />
        <FeaturedProduct />
      </div>
      <div className='ProductInformation__rate'>
        { /* Reviews and Rating should come dynamically */ }
        <Rating rating={4.5} />
        <span style={{ fontSize: '2rem' }} className='ProductInformation__rate-review'>136 Reviews</span>
      </div>
      <div className='ProductInformation__availability'>
        <span style={{ fontSize: '1.8rem' }}>Availability:</span>
        { /* Stock status must be dynamic */ }
        <StockStatus status='' />
      </div>
      <div className='ProductInformation__dosage'>
        <p className='ProductInformation__dosage--title' style={{ fontSize: '2rem' }}>Dosage:</p>
        <div className='ProductInformation__dosage--badges'>
          { /* Badges should come dynamically */ }
          <CustomBadge badgeValue='5mg' />
          <CustomBadge badgeValue='10mg' />
        </div>
      </div>
      <div className='ProductInformation__pillquantity'>
        <p className='ProductInformation__pillquantity--title' style={{ fontSize: '2rem' }}>Pill Quantity:</p>
        <div className='ProductInformation__pillquantity--badges'>
          { /* Badges should come dynamically */ }
          <CustomBadge badgeValue='50 Pills' />
          <CustomBadge badgeValue='100 Pills' />
          <CustomBadge badgeValue='150 Pills' />
          <CustomBadge badgeValue='200 Pills' />
        </div>
      </div>
      <div className='ProductInformation__rates'>
        <div className='ProductInformation__rates--price'>
          { /* If there is a discounted price means apply this */ }
          <p className='ProductInformation__rates--price-final'>$300.00</p>
          <div className='ProductInformation__rates--price-original'>
            <span className='ProductInformation__rates--price-original--value' style={{ textDecoration: 'line-through' }}>$360</span>
            { /* Discount percent must be dynamic */ }
            <span className='ProductInformation__rates--price-original--percent'>Get 20% off</span>
          </div>
          { /* Else just print the original price */ }
          {/* <p className='ProductInformation__rates--price-discounted'>$300</p> */}
        </div>
        <Assurances />
      </div>
    </div>
  )
}

export default ProductInformation