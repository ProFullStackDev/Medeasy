import React from 'react'
import withBannerHoc from '../components/withBannerHoc'
import { Title } from '../styles/styledComponents'

const paragraphStyle = { margin: '2rem 0', lineHeight: 1.8, fontSize: '1.7rem' }

const PrivacyPolicyPage = () => {
  return (
    <section className='PrivacyPolicyPage' style={{ marginLeft: '3rem' }}>
      <Title>Privacy Policy</Title>
      <p style={paragraphStyle}>
        We understand that the privacy of all information you provide is of a
        primary importance. This is why we are committed to preserving the
        privacy of our customers. The information you provide is never shared
        with other companies or third party service providers. Your personal
        information, bank details and transaction details will only be used to
        fulfil the transaction and provide you with customer service.
      </p>
      <p style={paragraphStyle}>
        Medeasy is committed to preserving your medical and personal
        information privacy. All data we receive is legally protected under
        doctor-patient privilege laws. Our online ordering system is using the
        latest Secured Encryption Technologies and all personal and credit card
        information will be submitted using highest levels of technical security
        with all reasonable precautions. Our system also has safeguards in place
        to protect against credit card fraud. Individuals attempting the
        fraudulent use credit cards will be reported immediately.
      </p>
      <p style={paragraphStyle}>
        We use advanced security measures in order to make our website safe for
        our customers to use. SSL 128 bit encryption technology is used when
        receiving and transmitting credit card information during the
        transaction. After processing, sensitive details are encrypted and saved
        on our offline servers, and thus cannot be accessed from the internet.
      </p>
    </section>
  )
}

export default withBannerHoc(PrivacyPolicyPage)
