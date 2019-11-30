import React from 'react'
import { Helmet } from 'react-helmet'

const PaymentConfimedPage = () => {
  return (
    <div>
      <Helmet>
        <title>Medeasy - Success</title>
        <meta name='description' content='Featured products' />
      </Helmet>
      <h1>Your payment is confirmed via Western Union.</h1>
      <h2>Please check your email for further instructions.</h2>
      <p>We thank you for beleiving in Medeasy.</p>
    </div>
  )
}

export default PaymentConfimedPage
