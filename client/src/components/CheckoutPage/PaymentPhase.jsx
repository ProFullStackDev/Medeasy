import React, { Component, useState } from 'react'
// Components
import PaymentType from './PaymentType'
import CustomFormElement from '../CustomFormElement'
import CustomButton from '../CustomButton'
// Images
import paypalImg from '../../images/paypal.svg'
import cardImg from '../../images/credit-card.svg'
import bitcoinImg from '../../images/bitcoin.svg'
// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectPaymentOrderId } from '../../redux/selectors/paymentSelectors'

import '../../styles/components/PaymentPhase.scss'

class PaymentPhase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      paymentType: 'card',
      name: '',
      cardNumber: '',
      cvv: '',
      expMonth: '',
      expYear: ''
    }
    this.selectPaymentType = this.selectPaymentType.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  selectPaymentType (paymentType) { this.setState({paymentType}) }
  handleChange (event) { this.setState({ [event.target.name]: event.target.value })}
  handleSubmit (event) {
    event.preventDefault()
    // Process the payment here (again it is uncertain whether we choose or braintree chooses)
    this.props.onClick(this.props.step)
  }

  render () {
    const { name, expMonth, expYear, cardNumber, cvv } = this.state
    return (
      <div className='PaymentPhase'>
        <h2 className='PaymentPhase__title'>Payment Information</h2>
        <div className='PaymentPhase__types'>
          <PaymentType onClick={ this.selectPaymentType } type='card' active={ this.state.paymentType === 'card' ? true : false } paymentImage={cardImg} name='Credit Card' />
          <PaymentType onClick={ this.selectPaymentType } type='bitcoin' active={ this.state.paymentType === 'bitcoin' ? true : false } paymentImage={bitcoinImg} name='Bitcoin' />
          <PaymentType onClick={ this.selectPaymentType } type='paypal' active={ this.state.paymentType === 'paypal' ? true : false } paymentImage={paypalImg} name='PayPal' />
        </div>
        <h2 className='PaymentPhase__title'>Credit Card Information</h2>
        { /* This will get replaced or not by Braintree API */ }
        <form className='PaymentPhase__payment-form' style={{ width: '50%', marginTop: '3rem' }} onSubmit={ this.handleSubmit }>
          <CustomFormElement labelName='Name on Card' type='text' value={name} name='name' onChange={this.handleChange} />
          <CustomFormElement required placeholder='XXXX-XXXX-XXXX-XXXX' labelName='Name on Card' type='number' value={cardNumber} name='cardNumber' onChange={this.handleChange} />
          <div className='PaymentPhase__payment-form-three'>
            <CustomFormElement required placeholder='123' labelName='CVV' type='password' value={cvv} name='cvv' onChange={this.handleChange} />
            <CustomFormElement required placeholder='MM' labelName='Exp. Month' type='number' pattern="[0-9]*" value={expMonth} name='expMonth' onChange={this.handleChange} />
            <CustomFormElement required placeholder='YY' labelName='Exp. Year' type='number' pattern="[0-9]*" value={expYear} name='expYear' onChange={this.handleChange} />
          </div>
          <CustomButton isSubmitButton fontSize='1.8rem'>Pay Now</CustomButton>
        </form>       
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  orderId: selectPaymentOrderId
})

export default connect(mapStateToProps)(PaymentPhase)