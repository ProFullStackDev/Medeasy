import React from 'react'
import localBitcoins from '../../images/localbitcoins.png'
import { Title } from '../../styles/styledComponents'

const paragraphStyle = { margin: '2rem 0', lineHeight: 1.8, fontSize: '1.7rem' }
const imageStyle = {
  maxWidth: '45rem',
  maxHeight: '30rem',
  border: '1px solid #777',
  borderRadius: '1rem'
}
const linkStyle = { color: 'orangered', fontWeight: 'bold' }

const BankSection = () => {
  return (
    <div
      id='cash'
      className='BitcoinTutorialPage__cash'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2rem'
      }}>
      <div>
        <Title style={{ marginTop: 0 }}>Buy Bitcoins with Cash</Title>
        <p style={paragraphStyle}>
          <a
            style={linkStyle}
            href='https://localbitcoins.com'
            target='_blank'
            rel='noopener noreferrer'>
            localbitcoins.com
          </a>{' '}
          is a very reliable peer-to-peer Bitcoins wallet for buying and selling
          to and from others anywhere in the world. With the functional and
          practical usability,{' '}
          <a
            style={linkStyle}
            href='https://localbitcoins.com'
            target='_blank'
            rel='noopener noreferrer'>
            localbitcoins.com
          </a>{' '}
          offers one of the most comprehensive Bitcoin service on the planet.
        </p>
        <p style={paragraphStyle}>
          You simply need to identify the traders anywhere in the world. All the
          traders are being ranked and reviewed to ensure you choose reliable
          trading partners. The payment methods include cash, Paypal,
          international wire transfer and many more based on your trading
          partners. For ensuring security, escrow services can be used. With a
          number of powerful tools, it is not easy for beginners and therefore
          we recommend this only for experienced users of Bitcoin.
        </p>

        <p style={paragraphStyle}>
          Please note that this site is a recommendation by us, however you may
          buy Bitcoins from any provider you normally purchase from.
        </p>
      </div>
      <div style={{ marginLeft: '3rem' }}>
        <img style={imageStyle} src={localBitcoins} alt='Local Bitcoins' />
      </div>
    </div>
  )
}

export default BankSection
