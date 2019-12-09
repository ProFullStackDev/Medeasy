import React from 'react'
import withBannerHoc from '../components/withBannerHoc'
import { Title } from '../styles/styledComponents'

const paragraphStyle = { margin: '2rem 0', lineHeight: 1.8, fontSize: '1.7rem' }
const horizontalRuleStyle = {
  background: '#8fcfcd',
  marginTop: '1rem',
  width: '70%',
  height: '.5rem',
  borderRadius: '10rem',
  border: 'none'
}

const DeliveryReturnsPage = () => {
  return (
    <section className='DeliveryReturnsPage' style={{ marginLeft: '3rem' }}>
      <Title>Delivery & Returns</Title>
      <div className='DeliveryReturnsPage__intro'>
        <p style={paragraphStyle}>
          All our orders are delivered via registered airmail and thanks to the
          reputable companies we use, we guarantee to deliver your products to
          your door. In order to receive the order without any problems the
          customer should provide a valid billing and shipping address.
        </p>
        <p style={paragraphStyle}>
          Total time for delivery is based on the amount of time it takes to get
          payment authorization, order processing, and the transit time from the
          carrier. You will receive an email once the order has been shipped to
          you. From the moment that you receive the email notifying you that
          your order has been shipped, the shipping time officially begins.
        </p>
        <p style={paragraphStyle}>
          We offer an express shipping option in most locations. Express
          shipping means that you will receive your medications between 7-14
          business days after order fulfilment is complete (and you have
          received email notification that your order has been shipped), whereas
          via standard shipping the delivery time is between 14-21 business days
          after order fulfilment is complete.
        </p>
      </div>
      <div className='DeliveryReturnsPage__options'>
        <h4>Delivery Options and Fees</h4>
        <hr style={horizontalRuleStyle} />
        <p style={paragraphStyle}>
          <span style={{ color: 'orangered', fontWeight: 'bold' }}>
            Standard International Shipping $29 – 5 to 7 business days worldwide
            delivery
          </span>
          . In the unlikely event you do not receive your order Pharmacy Online
          365 will offer you a free of charge re-shipment or a full refund of
          your order. Please, notify us of any problems with your order as soon
          as possible and within 60 days of receiving your order.
        </p>
      </div>
      <div className='DeliveryReturnsPage__returns'>
        <h4>Returns and Refunds</h4>
        <hr style={horizontalRuleStyle} />
        <p style={paragraphStyle}>
          Due to federal and local laws we can not receive medication back after
          they were shipped. Once you receive your medications, we will only
          provide a refund if the product is faulty, damaged during shipping, or
          expired. If there are any problems with your order please notify us
          within one week of receipt at{' '}
          <span style={{ color: 'orangered', fontWeight: 'bold' }}>
            contact@medeasyonline.com.
          </span>{' '}
          Your claim will be carefully studied and appropriate steps will be
          taken immediately to avoid similar problems in the future.
        </p>
        <p style={paragraphStyle}>
          If you feel you are entitled to a refund, please notify us directly
          instead of contacting your credit card company. We can not offer a
          refund if you first make a claim directly with your credit card
          company. Medeasy will only provide a refund for complaints received
          within{' '}
          <span style={{ color: 'orangered', fontWeight: 'bold' }}>
            60 days
          </span>{' '}
          from the date of the shipment.
        </p>
      </div>
    </section>
  )
}

export default withBannerHoc(DeliveryReturnsPage)
