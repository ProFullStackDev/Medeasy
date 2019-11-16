import React, { Fragment, useState, useEffect, useRef } from 'react'

import Spinner from '../Spinner'
import CustomFormElement from '../CustomFormElement'
import CustomButton from '../CustomButton'
import AlertMessage from '../AlertMessage'
import validator from 'validator'
import medEasyLogo from '../../images/medeasy-logo.png'

import { connect } from 'react-redux'

import {
  fetchRazorpayOrderId,
  chargeCard
} from '../../redux/actions/paymentActions'
import { fetchUserCreditCards } from '../../redux/actions/profileActions'
import { alertUser } from '../../redux/actions/alertActions'

const mapStateToProps = state => ({
  currencyRate: state.payment.currencyRate,
  billingAddress: state.cart.billingAddress,
  checkoutRole: state.auth.checkoutRole,
  cards: state.profile.cards,
  user: state.auth.user,
  loading: state.profile.loading
})

export const CreditCardPage = ({
	fetchUserCreditCards,
	user,
	billingAddress,
	checkoutRole,
	orderId,
	amount,
	cards,
	loading,
	fetchRazorpayOrderId,
	chargeCard,
	razorPayOrderId,
	currencyRate,
	alertUser
}) => {
  let razorpay = useRef()
  const [formState, setFormState] = useState({
    name: '',
    cardNumber: '',
    cvv: '',
    expMonth: '',
    expYear: ''
  })

  const [selectCard, setSelectCard] = useState('')

  useEffect(() => {
    if (user) fetchUserCreditCards()
    fetchRazorpayOrderId(orderId, amount, 'INR')
    razorpay.current = window.Razorpay({
      key: 'rzp_test_brhTIRqNxd5Vth',
      image: medEasyLogo
    })
  }, [fetchRazorpayOrderId, orderId, amount, user, fetchUserCreditCards])

  const handleCardChange = event => {
    const {
      hidNum,
      cardNumber,
      cardExpiryMonth,
      cardExpiryYear,
      cardName
    } = cards.find(c => c.cardNumber === event.target.value)
    setFormState({
      ...formState,
      name: cardName,
      cardNumber: hidNum,
      expMonth: cardExpiryMonth,
      expYear: cardExpiryYear
    })
    setSelectCard(cardNumber)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (!validator.isCreditCard(String(cardNumber)))
      return alertUser('Invalid Card Number', 'danger')
    if (parseInt(expMonth) > 12)
      return alertUser('Invalid Expiry Month', 'danger')
    if (
      parseInt(expYear) > 99 ||
      parseInt(expYear) < new Date().getFullYear() - 2000
    )
      return alertUser('Invalid Expiry Year', 'danger')
    if (
      parseInt(expMonth) < new Date().getMonth() + 1 &&
      parseInt(expYear) === new Date().getFullYear() - 2000
    )
      return alertUser('Card has expired', 'danger')
    console.log(razorPayOrderId)
    const paiseAmount = Math.round(parseInt(amount) * currencyRate) * 100
    await razorpay.current.createPayment({
      amount: paiseAmount,
      email: checkoutRole === 'user' ? user.email : billingAddress.email,
      contact: `+1${billingAddress.phNumber}`,
      method: 'card',
      order_id: razorPayOrderId,
      card: {
        name,
        number: cardNumber,
        cvv,
        expiry_month: expMonth,
        expiry_year: expYear
      }
    })
    razorpay.current.on(
      'payment.success',
      ({ razorpay_payment_id, razorpay_order_id, razorpay_signature }) => {
        chargeCard(
          orderId,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          paiseAmount
        )
      }
    )
    razorpay.current.on('payment.error', resp => {
      alertUser(resp.error.description, 'danger')
      setSelectCard('Select Card')
      setFormState({
        name: '',
        cardNumber: '',
        cvv: '',
        expMonth: '',
        expYear: ''
      })
    })
  }
  const { name, expMonth, expYear, cardNumber, cvv } = formState

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2rem'
        }}
      >
        <h2 className='PaymentPhase__title'>Credit Card Information</h2>
        {user && cards.length > 0 ? (
          <select
            style={{
              marginLeft: '2rem',
              border: 'none',
              background: '#7AC7B8',
              color: 'white',
              padding: '1rem',
              borderRadius: '.5rem'
            }}
            onChange={handleCardChange}
            value={selectCard}
          >
            <option defaultValue='Select Card'>Select Card</option>
            {cards.map(card => (
              <option key={card._id} value={card.cardNumber}>
                {card.cardNumber}
              </option>
            ))}
          </select>
        ) : null}
      </div>
      <AlertMessage />
      <form
        className='PaymentPhase__payment-form'
        style={{ width: '50%', marginTop: '3rem' }}
        onSubmit={handleSubmit}
      >
        <CustomFormElement
          required
          labelName='Name on Card'
          type='text'
          value={name}
          name='name'
          onChange={event => {
            setFormState({
              ...formState,
              name: event.target.value.toUpperCase()
            })
          }}
        />
        <CustomFormElement
          className='card_number'
          required
          placeholder='XXXX-XXXX-XXXX-XXXX'
          labelName='Name on Card'
          type='number'
          value={cardNumber}
          name='cardNumber'
          onChange={event => {
            setFormState({
              ...formState,
              cardNumber:
                event.target.value.length > 16 ? cardNumber : event.target.value
            })
          }}
        />
        <div className='PaymentPhase__payment-form-three'>
          <CustomFormElement
            required
            placeholder='MM'
            labelName='Exp. Month'
            type='number'
            pattern='[0-9]*'
            value={expMonth}
            name='expMonth'
            onChange={event => {
              setFormState({
                ...formState,
                expMonth:
                  event.target.value.length > 2 ? expMonth : event.target.value
              })
            }}
          />
          <CustomFormElement
            required
            placeholder='YY'
            labelName='Exp. Year'
            type='number'
            pattern='[0-9]*'
            value={expYear}
            name='expYear'
            onChange={event => {
              setFormState({
                ...formState,
                expYear:
                  event.target.value.length > 2 ? expYear : event.target.value
              })
            }}
          />
          <CustomFormElement
            className='card_cvv'
            required
            placeholder='123'
            labelName='CVV'
            type='number'
            pattern='[0-9]*'
            value={cvv}
            name='cvv'
            onChange={event => {
              setFormState({
                ...formState,
                cvv: event.target.value.length > 4 ? cvv : event.target.value
              })
            }}
          />
        </div>
        <CustomButton isSubmitButton fontSize='1.8rem'>
          Pay Now
        </CustomButton>
      </form>
    </Fragment>
  )
}

export default connect(mapStateToProps, {
  fetchRazorpayOrderId,
  alertUser,
  chargeCard,
  fetchUserCreditCards
})(CreditCardPage)
