import React, { useState } from 'react'

import CustomButton from '../CustomButton'
import CustomFormElement from '../CustomFormElement'
import PhoneFormElement from '../PhoneFormElement'
import AlertMessage from '../AlertMessage'

// Redux
import { connect } from 'react-redux'
import { addQuery } from '../../redux/actions/queryActions'
import LandingPageCarousel from '../LandingPageCarousel'
import { createStructuredSelector } from 'reselect'
import { selectProfileLoading } from '../../redux/selectors/profileSelectors'

const WelcomeSection = ({ addQuery, loading }) => {
  const [formState, setFormState] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    message: ''
  })

  const handleChange = event =>
    setFormState({ ...formState, [event.target.name]: event.target.value })

  const handleSubmit = async event => {
    event.preventDefault()
    const status = await addQuery(formState)
    if (status) {
      alert('We’ve received your message. We’ll call you in a bit. :)')
      setFormState({ name: '', phoneNumber: '', email: '', message: '' })
    }
  }

  const { name, phoneNumber, message, email } = formState
  return (
    <div className='LandingPage__welcome'>
      <LandingPageCarousel />
      <div className='LandingPage__helpform'>
        <AlertMessage />
        <h2 className='LandingPage__helpform-title'>
          {!loading ? 'Want us to call you back ?' : 'Submitting your query :)'}
        </h2>

        <form
          style={{ position: 'relative' }}
          className='LandingPage__helpform-form'
          onSubmit={handleSubmit}>
          <CustomFormElement
            labelName='Name'
            onChange={handleChange}
            name='name'
            type='text'
            id='name'
            value={name}
            required
          />
          <CustomFormElement
            required
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            labelName='Email *'
          />
          <PhoneFormElement
            name='phoneNumber'
            required
            value={phoneNumber}
            onChange={handleChange}
          />
          <label htmlFor='message'>Message</label>
          <CustomFormElement
            noLabel
            isTextArea
            value={message}
            onChange={handleChange}
            name='message'
            id='message'
          />
          <CustomButton
            extraStyle={{ background: '#F8931A' }}
            isSubmitButton
            fontSize='1.6rem'>
            Request Callback
          </CustomButton>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  loading: selectProfileLoading
})

export default connect(mapStateToProps, { addQuery })(WelcomeSection)
