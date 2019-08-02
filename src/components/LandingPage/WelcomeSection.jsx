import React from 'react'
import CustomButton from '../components/../CustomButton'
import larrow from '../../images/larrow.svg'
import rarrow from '../../images/rarrow.svg'
import carouselImg from '../../images/carouselimg.png'

const WelcomeSection = props => {
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
        <form className='LandingPage__helpform-form'>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' name='name' value='Rashmi P Nayak'/>
          <label htmlFor='phnumber'>Phone Number</label>
          <input id='phnumber' type='tel' name='phoneNumber'/>
          <label htmlFor='message'>Message</label>
          <textarea id='message' value='Requesting Callback'/>
          <CustomButton isSubmitButton fontSize='1.6rem'>Requesting Callback</CustomButton>
        </form>
      </div>
    </div>
  )
}
 
export default WelcomeSection;