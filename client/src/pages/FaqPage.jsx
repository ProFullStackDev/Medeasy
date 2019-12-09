import React from 'react'
import withBannerHoc from '../components/withBannerHoc'
import FaqSlider from '../components/FaqSlider'

import { Title } from '../styles/styledComponents'
const paragraphStyle = { margin: '2rem 0', lineHeight: 1.8, fontSize: '1.7rem' }

const FaqPage = () => {
  return (
    <section className='FaqPage' style={{ marginLeft: '3rem' }}>
      <Title>Frequently Asked Questions</Title>
      <FaqSlider question='How do I place an order?'>
        <React.Fragment>
          <ol>
            <li>Search for the medication you need.</li>
            <li>Click on the ‘Buy’ button for your desired medication.</li>
            <li>
              {' '}
              Click on ‘Continue Checkout’ to purchase your medication or repeat
              steps 1 & 2 to add another medication to your order.
            </li>
            <li>
              Create your account and follow the easy steps to complete your
              order.
            </li>
          </ol>
          <p style={paragraphStyle}>
            You will receive an email to confirm your order and also a email to
            confirm your order has shipped.
          </p>
        </React.Fragment>
      </FaqSlider>
      <FaqSlider question='Questions or Need Help?'>
        <p style={paragraphStyle}>
          Call us toll free: +1-555-5777-572. We can take your phone orders and
          questions:
        </p>
      </FaqSlider>
      <FaqSlider question='Our Customer Service opening times'>
        <p style={paragraphStyle}>
          We are open 365 days a year. However in the event our customer service
          representatives are busy with another call please leave a message and
          one of our team members will return your call the same day.
        </p>
      </FaqSlider>
      <FaqSlider question='What happens after I place my order?'>
        <p style={paragraphStyle}>
          After you place your order, the information you provided will be
          reviewed and filled by our pharmacist, Once approved and processed,
          your order status will be set to approved, and moved to processing.
          Your order will then be shipped to you the following working day.
        </p>
      </FaqSlider>
      <FaqSlider question='How are the prices at Medeasy so low?'>
        <p style={paragraphStyle}>
          We try and keep our prices as low as we can without harming service
          and quality, simply by reducing costs where possible, low margins,
          small staff, batch shipping, more returning customers and no physical
          distribution centre. By transferring our business to the web reduced
          our maintenance costs by 50% and enabled us to offer our customers
          much more affordable prices.
        </p>
      </FaqSlider>
      <FaqSlider question='What are generic medications and are they safe?'>
        <p style={paragraphStyle}>
          A generic drug is a medication for which the original manufacturer has
          lost patent protection. Because of this, other manufacturers are
          permitted to produce and sell the exact medication at a lower more
          competitive price. The generic drug is the exact medication as the
          original brand name drug, simply made by another company. Due to
          strict regulations on the generic drug industry, these drugs must
          provide the same therapeutic effect as the brand name drug.
        </p>
      </FaqSlider>
      <FaqSlider question='How do we ensure your privacy?'>
        <p style={paragraphStyle}>
          Medeasy is committed to preserving your medical and
          personal information privacy. All data we receive is legally protected
          under doctor-patient privilege laws. Our online ordering system is
          using the latest Secured Encryption Technologies and all personal and
          credit card information will be submitted using highest levels of
          technical security with all reasonable precautions. Our system also
          has safeguards in place to protect against credit card fraud.
          Individuals attempting the fraudulent use credit cards will be
          reported immediately.
        </p>
      </FaqSlider>
      <FaqSlider question='Site Security'>
        <p style={paragraphStyle}>
          We use advanced security measures in order to make our website safe
          for our customers to use. SSL128 bit encryption technology is used
          when receiving and transmitting credit card information during the
          transaction. After processing, sensitive details are encrypted and
          saved on our offline servers, and thus cannot be accessed from the
          internet.
        </p>
      </FaqSlider>
      <FaqSlider question='Why does Medeasy not require a prescription?'>
        <p style={paragraphStyle}>
          Medeasy ships from a jurisdiction that does not require a
          prescription. All medications are genuine and approved for sale in the
          jurisdiction.
        </p>
      </FaqSlider>
    </section>
  )
}

export default withBannerHoc(FaqPage)
