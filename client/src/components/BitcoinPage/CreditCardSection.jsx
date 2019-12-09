import React from 'react'
import cexIoPage from '../../images/cexPage.png'
import circleIoPage from '../../images/circleio.png'
import { Title } from '../../styles/styledComponents'

const paragraphStyle = { margin: '2rem 0', lineHeight: 1.8, fontSize: '1.7rem' }
const imageStyle = {
  maxWidth: '45rem',
  maxHeight: '30rem',
  border: '1px solid #777',
  borderRadius: '1rem'
}

const CreditCardSection = () => {
  return (
    <div
      id="credit"
      className='BitcoinTutorialPage__creditcard'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2rem'
      }}>
      <div>
        <Title>Buy Bitcoins with Credit Card</Title>
        <p style={paragraphStyle}>
          Purchasing Bitcoins has never been so easy, quick and hassle free.{' '}
          <a
            target='_blank'
            style={{ color: 'orangered', fontWeight: 'bold' }}
            rel='noopener noreferrer'
            href='http://www.circle.com'>
            {' '}
            www.circle.com{' '}
          </a>{' '}
          is an excellent place to buy Bitcoins as it specialises in Bitcoin
          purchasing through a credit card. As one of the best Bitcoin
          exchanges, the access to this new global currency is pretty easy with
          them.
        </p>
        <p style={paragraphStyle}>
          Ideal for international credit card holders, everyone can purchase
          Bitcoins from anywhere in the world with them. All your personal
          information is kept secure. They are less concerned about your
          personal data so it is quite simple and easy for you to have the full
          access to buy Bitcoins from anywhere across the world.
        </p>

        <p style={paragraphStyle}>
          Please note that this site is a recommendation by us, however you may
          buy Bitcoins from any provider you normally purchase from.
        </p>
        <p style={paragraphStyle}>
          For US customers we also recommend using{' '}
          <a
            style={{ color: 'orangered', fontWeight: 'bold' }}
            target='_blank'
            rel='noopener noreferrer'
            href='http://www.cex.io'>
            {' '}
            www.cex.io{' '}
          </a>{' '}
          to buy bitcoins with a credit or debit card.
        </p>
      </div>
      <div style={{ marginLeft: '3rem' }}>
        <img style={imageStyle} src={cexIoPage} alt='Cex Io Page' />
        <img
          style={{ ...imageStyle, marginTop: '2rem' }}
          src={circleIoPage}
          alt='Circle Io Page'
        />
      </div>
    </div>
  )
}

export default CreditCardSection
