import React, { Component } from 'react'
import CustomButton from '../CustomButton'
import CustomFormElement from '../CustomFormElement'
import PhoneFormElement from '../PhoneFormElement'
// Images
import larrow from '../../images/larrow.svg'
import rarrow from '../../images/rarrow.svg'
import carouselImg from '../../images/carouselimg.png'

class WelcomeSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      message: '',
      phNumber: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })
  handleSubmit = event => event.preventDefault()

  render () {
    const { name, phNumber, message } = this.state
    return (
      <div className='LandingPage__welcome'>
        <div className='LandingPage__welcome--carousel' style={{ backgroundImage: `url(${carouselImg})` }}>
          <img src={larrow} className='LandingPage__welcome--carousel-left' alt='left' />
          <img src={rarrow} className='LandingPage__welcome--carousel-left' alt='right' />
        </div>
        <div className='LandingPage__helpform'>
          <h2 className='LandingPage__helpform-title'>
            Want us to call you back ?
          </h2>
          <form className='LandingPage__helpform-form' onSubmit={ this.handleSubmit }>
            <CustomFormElement labelName='Name' onChange={this.handleChange} name='name' type='text' id='name' value={name} />
            <PhoneFormElement value={phNumber} onChange={this.handleChange} />
            <label htmlFor='message'>Message</label>
            <CustomFormElement noLabel isTextArea value={message} onChange={this.handleChange} name='message' id='message' />
            <CustomButton isSubmitButton fontSize='1.6rem'>Request Callback</CustomButton>
          </form>
        </div>
      </div>
    )
  }
}
 
export default WelcomeSection