import React from 'react'
import withBannerHoc from '../components/withBannerHoc'
import CreditCardSection from '../components/BitcoinPage/CreditCardSection'
import BankSection from '../components/BitcoinPage/BankSection'
import CashSection from '../components/BitcoinPage/CashSection'
import { Title } from '../styles/styledComponents'

import bitcoinImage from '../images/bitcoin.png'

const paragraphStyle = { margin: '2rem 0', lineHeight: 1.8, fontSize: '1.7rem' }
const LinkStyle = {
  background: 'rgb(248, 147, 26)',
  padding: '1rem 2rem',
  borderRadius: '5px',
  color: 'white'
}
const horizontalRuleStyle = {
  background: '#8fcfcd',
  margin: '2rem',
  width: '95%',
  height: '.5rem',
  borderRadius: '10rem',
  border: 'none'
}

const BitcoinTutorialPage = () => {
  return (
    <section
      className='BitcoinTutorialPage'
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '3rem',
        marginTop: '1.5rem',
        flex: 1
      }}>
      <div
        className='BitcoinTutorialPage__intro'
        style={{
          padding: '3rem',
          textAlign: 'center',
          borderRadius: '1rem',
          boxShadow: '0 0 1rem rgba(0, 0, 0, .2)'
        }}>
        <h2>
          <img src={bitcoinImage} alt='Bitcoin Logo' />
        </h2>
        <Title>Pay with Bitcoin and Save 10%</Title>
        <p style={paragraphStyle}>
          Learn how to pay for your order with Bitcoins and take advantage of
          the savings on offer.
          <br />
          Buying Bitcoins and paying for your order using them is as easy as 1,
          2, 3...
        </p>
        <p style={paragraphStyle}>
          Follow the instructions on the different ways to pay with Bitcoin.
        </p>

        <div
          className='BitcoinTutorialPage__buttons'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '70%',
            margin: '0 auto'
          }}>
          <a href='#credit' style={LinkStyle}>
            Buy with Credit Card
          </a>
          <a href='#bank' style={LinkStyle}>
            Buy with Bank Account Deposit
          </a>
          <a href='#cash' style={LinkStyle}>
            Buy with Cash
          </a>
        </div>
      </div>
      <CreditCardSection />
      <hr style={horizontalRuleStyle} />
      <BankSection />
      <hr style={horizontalRuleStyle} />
      <CashSection />
    </section>
  )
}

export default withBannerHoc(BitcoinTutorialPage)
