import React, { Component } from 'react'
import CustomFormElement from '../../CustomFormElement'
import CustomButton from '../../CustomButton'
import '../../../styles/components/CreditCardController.scss'

class CreditCardController extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      number: '',
      cvv: '',
      expMonth: '',
      expYear: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    // Submit the card
    console.log('Card added')
  }
  handleChange (event) { this.setState({ [event.target.name]: event.target.value }) }

  render () {
    return (
      <div className='CreditCardController'>
        <h2 className='ProfilePage__phase-title'>My Orders</h2>
        <form style={{ width: '59%', marginLeft: '7rem', marginTop: '5.2rem' }} className='CreditCardController__form' onSubmit={this.handleSubmit}>
          <CustomFormElement name='name' onChange={ this.handleChange } labelName='Name on Card' type='text' />
          <CustomFormElement labelName='Card Number' name='number' onChange={ this.handleChange } type='number' maxLength='16' />
          <div className='CreditCardController__form-third' style={ { display: 'flex', justifyContent: 'space-between', } }>
            <CustomFormElement name='cvv' onChange={ this.handleChange } labelName='CVV' type='number' />
            <CustomFormElement name='expMonth' onChange={ this.handleChange } labelName='Exp. Month' type='number' />
            <CustomFormElement name='expYear' onChange={ this.handleChange } labelName='Exp. Year' type='number' />
          </div>
          <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
            <CustomButton extraStyle={{ border: '1px solid #DDD7D7', background: 'transparent', color: '#4A4A4A' }} fontSize="1.8rem">Cancel</CustomButton>
            <CustomButton extraStyle={{ marginLeft: '2rem' }} fontSize='1.8rem' type='submit'>Add Credit Card</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default CreditCardController