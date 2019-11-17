import React from 'react'
import styled from 'styled-components'

// Images
import { ReactComponent as TwentyFourHourIcon } from '../images/24hr.svg'
import { ReactComponent as DiscountIcon } from '../images/discount.svg'
import { ReactComponent as FDAIcon } from '../images/fda.svg'
import { ReactComponent as GlobalShippingIcon } from '../images/globalShipping.svg'
import westernUnion from '../images/westernUnion.png'
import bitcoin from '../images/bitcoin.png'
import paypal from '../images/paypal.png'
import bankCards from '../images/bank-cards.png'

// Styles
const BannerGroup = styled.div`
  ${({ direction }) => (direction === 'column' ? 'margin-top: 1.5rem' : null)};
  ${({ direction }) =>
    direction === 'row' ? 'width: 100%; margin: 2.5rem 0;' : null};
  display: grid;
  ${({ direction }) =>
    direction === 'row'
      ? 'grid-template-columns: repeat(5, 1fr)'
      : 'grid-template-rows: repeat(5, 1fr)'};
  ${({ direction }) =>
    direction === 'row' ? 'column-gap: 30px' : 'row-gap: 30px'}
`

const TagLine = styled.p`
  text-align: center;
  text-transform: uppercase;
  margin-top: 2rem;
  font-size: 2.2rem;
`

const BannerItem = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  background: #8fcfcd;
  max-height: 230px;
  max-width: 250px;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
`

export const BannerDetails = ({ direction }) => {
  return (
    <BannerGroup direction={direction}>
      <BannerItem>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <img
              alt='cards'
              src={bankCards}
              style={{ maxHeight: '4rem', maxWidth: '4rem' }}
            />
            <span
              style={{
                letterSpacing: 0,
                fontSize: '1rem',
                textTransform: 'initial',
                textAlign: 'center'
              }}>
              All credit / debit <br /> cards
            </span>
          </span>
          <img
            style={{
              maxWidth: '7rem',
              marginLeft: '1.5rem',
              maxHeight: '4.4rem'
            }}
            src={westernUnion}
            alt='western union'
          />
          <img
            style={{ maxWidth: '9rem', marginTop: '2.5rem' }}
            src={paypal}
            alt='Paypal'
          />
          <img
            style={{
              maxWidth: '9.1rem',
              marginLeft: '1.5rem',
              maxHeight: '2.2rem',
              marginTop: '2.5rem'
            }}
            src={bitcoin}
            alt='Bitcoin'
          />
        </div>
        <TagLine>Accepted here</TagLine>
      </BannerItem>
      <BannerItem>
        <GlobalShippingIcon />
        <TagLine>Worldwide Shipping</TagLine>
      </BannerItem>
      <BannerItem>
        <TwentyFourHourIcon />
        <TagLine>24x7 Customer Support</TagLine>
      </BannerItem>
      <BannerItem>
        <FDAIcon />
        <TagLine style={{ marginTop: '3.5rem' }}>Approved products</TagLine>
      </BannerItem>
      <BannerItem>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <DiscountIcon />
          <span
            style={{
              marginTop: '3px',
              letterSpacing: 0,
              fontSize: '1.4rem',
              textTransform: 'initial',
              textAlign: 'center'
            }}>
            Get <span style={{ fontSize: '2.8rem' }}>10%</span> off <br />
            when paying with
          </span>
        </div>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '1.25rem'
          }}>
          <img src={westernUnion} alt='Western union' />
          &nbsp;or&nbsp;
          <img style={{ maxWidth: '9rem' }} src={bitcoin} alt='Bitcoin' />
        </span>
      </BannerItem>
    </BannerGroup>
  )
}

export default BannerDetails
