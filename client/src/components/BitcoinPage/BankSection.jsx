import React from 'react'
import cexIoPage from '../../images/cexPage.png'
import coinbasePng from '../../images/coinbasePage.png'
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
      id='bank'
      className='BitcoinTutorialPage__bank'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2rem'
      }}>
      <div>
        <Title style={{ marginTop: 0 }}>
          Buy Bitcoins with with Bank Accounts
        </Title>
        <p style={paragraphStyle}>
          <a
            style={linkStyle}
            href='https://coinbase.com'
            target='_blank'
            rel='noopener noreferrer'>
            Coinbase.com
          </a>{' '}
          is the most trusted Bitcoin exchange based in USA to buy the world’s
          most exciting currency. The fee of purchasing Bitcoins is
          comparatively less than credit card purchase. It is quite simple to
          make deposit to your{' '}
          <a
            style={linkStyle}
            href='https://coinbase.com'
            target='_blank'
            rel='noopener noreferrer'>
            coinbase.com
          </a>{' '}
          account by linking your USA bank account
        </p>
        <p style={paragraphStyle}>
          By following few easy steps you can have access to Bitcoins in three
          to five days
        </p>
        <ul style={{ lineHeight: 1.7, marginTop: '2rem' }}>
          <li>Go to their website and sign up.</li>
          <li>Link your bank account to enable purchases.</li>
          <li>
            Digital currency will be deposited to your www.circle.com account.
          </li>
        </ul>

        <p style={paragraphStyle}>
          Enjoy the easiest, fastest and most secure way of purchasing Bitcoins.
          Only USA based residents can access to this service as it works only
          with USA bank accounts. Please note that this site is a recommendation
          by us, however you may buy Bitcoins from any provider you normally
          purchase from.
        </p>
        <p style={paragraphStyle}>
          For US customers we also recommend using{' '}
          <a
            style={linkStyle}
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
        <img style={imageStyle} src={coinbasePng} alt='Coinbase Page' />
        <img
          style={{ ...imageStyle, marginTop: '2rem' }}
          src={cexIoPage}
          alt='Cex Io Page'
        />
      </div>
    </div>
  )
}

export default BankSection
