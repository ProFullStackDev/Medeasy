import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  fetchCoinbaseOrderId,
  chargeBitcoin
} from '../../redux/actions/paymentActions'

import Spinner from '../Spinner'
import AlertMessage from '../AlertMessage'
import CustomFormElement from '../CustomFormElement'
import CustomButton from '../CustomButton'

const NumberBadge = styled.div`
  background: #7ac7b8;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 2rem;
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`

export const BitcoinPage = ({
  fetchCoinbaseOrderId,
  chargeBitcoin,
  proLoading,
  orderId,
  amount,
  isSame,
  url
}) => {
  useEffect(() => {
    fetchCoinbaseOrderId(orderId, amount)
  }, [fetchCoinbaseOrderId, orderId, amount])

  const [chargeCode, setChargeCode] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    chargeBitcoin(chargeCode)
  }

  return proLoading ? (
    <Spinner />
  ) : (
    <div style={{ marginTop: '4rem' }}>
      <Helmet>
        <title>Medeasy - Payment</title>
        <meta name='description' content='Pay with Bitcoin' />
      </Helmet>
      <h2>Pay With Bitcoin</h2>
      <p
        style={{ textAlign: 'center', fontWeight: 'bold', margin: '1.5rem 0' }}
      >
        {!isSame
          ? `10% OFF applied. Amount Payable - $${amount}`
          : `Sorry. Minimum Order amount is 200 $ to be eligible for discount. Amount Payable - $${amount}`}
      </p>
      <p style={{ margin: '1.5rem 0' }}>
        Before proceeding, We assume that you did the following.
      </p>
      <ul>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '3rem', marginRight: '1rem' }}>
            &middot;
          </span>{' '}
          You already have a bitcoin wallet either &nbsp;
          <a
            style={{
              display: 'inline-block',
              color: '#F8931A',
              fontWeight: 'bold'
            }}
            href='https://cex.io'
          >
            cex.io
          </a>
          &nbsp; or &nbsp;
          <a
            style={{
              display: 'inline-block',
              color: '#F8931A',
              fontWeight: 'bold'
            }}
            href='https://coinbase.com'
          >
            Coinbase.com
          </a>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '3rem', marginRight: '1rem' }}>
            &middot;
          </span>{' '}
          You have verified the required documents to enable you send bitcoins
          towards our address.
        </li>
      </ul>
      <p
        style={{
          margin: '3rem 0 2rem',
          fontWeight: 'bold',
          fontSize: '2rem',
          textAlign: 'center'
        }}
      >
        Since Bitcoin payments does not know who the payer is. It is highly
        required that you follow the below steps.
      </p>
      <ul>
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '1.5rem 0',
            fontSize: '1.8rem'
          }}
        >
          <NumberBadge>1</NumberBadge>
          <span>
            Click the below button to redirect you towards the payment page. It
            will provide you the blockchain address to remitt the payment.
          </span>
        </li>
        <CustomButton isLink link={url} extraStyle={{ margin: '1rem 0' }}>
          Pay here
        </CustomButton>
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '1.5rem 0',
            fontSize: '1.8rem',
            lineHeight: 2
          }}
        >
          <NumberBadge>2</NumberBadge>
          <span>
            Once you have successfully paid from your wallet, You will receive a
            Coinbase Charge Code (Ex:{' '}
            <span style={{ fontWeight: 'bold' }}>8A73GH2E</span>) to your
            wallet's registered email. Please type that below to process your
            order.
          </span>
        </li>
        <form onSubmit={handleSubmit} style={{ width: '20%' }}>
          <AlertMessage />
          <CustomFormElement
            value={chargeCode}
            noLabel
            type='text'
            placeholder='Charge Code'
            onChange={event =>
              setChargeCode(
                event.target.value.length > 8
                  ? chargeCode
                  : event.target.value.toUpperCase()
              )
            }
          />
          <CustomButton isSubmitButton>Verify Code</CustomButton>
        </form>
      </ul>
    </div>
  )
}

export default connect(null, { fetchCoinbaseOrderId, chargeBitcoin })(
  BitcoinPage
)
