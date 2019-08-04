import React from 'react'
import delivery from '../../images/assurances/delivery.png'
import secure from '../../images/assurances/secure.png'
import usps from '../../images/assurances/usps.png'
import track from '../../images/assurances/track.png'
import transaction from '../../images/assurances/transaction.png'
import '../../styles/components/Assurances.scss'
const Assurances = () => {
  return (
    <div className='Assurances'>
      <div className='Assurances__assurance'>
        <img src={delivery} alt='delivery' className='Assurances__assurance--image' />
        <span className='Assurances__assurance--description'>
          2 week Guaranteed Delivery
        </span>        
      </div>
      <div className='Assurances__assurance'>
        <img src={transaction} alt='transaction' className='Assurances__assurance--image' />
        <span className='Assurances__assurance--description'>
          Money-back Guarantee
        </span>        
      </div>
      <div className='Assurances__assurance'>
        <img src={secure} alt='secure' className='Assurances__assurance--image' />
        <span className='Assurances__assurance--description'>
          100% Secure Payments
        </span>        
      </div>
      <div className='Assurances__assurance'>
        <img src={track} alt='track' className='Assurances__assurance--image' />
        <span className='Assurances__assurance--description'>
          Track your Order
        </span>        
      </div>
      <div className='Assurances__assurance'>
        <img src={usps} alt='usps' className='Assurances__assurance--image' />
        <span className='Assurances__assurance--description'>
          USPS Delivered
        </span>        
      </div>
    </div>
  )
}
export default Assurances