import React, { useState } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { alertUser } from '../redux/actions/alertActions'

import Spinner from '../components/Spinner'
import AlertMessage from '../components/AlertMessage'
import CustomButton from '../components/CustomButton'
import CustomFormElement from '../components/CustomFormElement'

import withBannerHoc from '../components/withBannerHoc'
import { Title } from '../styles/styledComponents'

const AffliatesPage = ({ alertUser }) => {
  const [submitState, setSubmitState] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    companyName: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    email: '',
    comment: ''
  })

  const {
    comment,
    name,
    companyName,
    street,
    city,
    state,
    country,
    postalCode,
    email
  } = formState

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      setSubmitState(true)
      await Axios.post('/api/affliates', { ...formState })
      setSuccess(true)
    } catch (err) {
      const errorMessage = err.response.data.message
      if (Array.isArray(errorMessage))
        errorMessage.forEach(message => alertUser(message.msg, 'danger'))
      else alertUser(errorMessage, 'danger')
    } finally {
      setSubmitState(false)
    }
  }

  const handleChange = event =>
    setFormState({ ...formState, [event.target.name]: event.target.value })
  return (
    <section className='AffliatesPage' style={{ marginLeft: '3rem' }}>
      <Title>Become An Affiliate</Title>
      <p style={{ margin: '2rem 0', fontSize: '1.7rem', lineHeight: 1.75 }}>
        Medeasy is the #1 online provider of pharmacy medication. As an
        affiliate partner, you'll get the opportunity to earn a commission for
        driving sales to Medeasy.
      </p>
      <p style={{ margin: '2rem 0', fontSize: '1.7rem', lineHeight: 1.75 }}>
        As an affiliate partner, you'll get access to a full product data feed
        and a range of promotional banners to help you drive traffic to our
        website. We offer the best commission rates in the industry, ranging
        between 10% and 25% on product prices. Full details will be provided
        when you join our affiliate programme.
      </p>
      <p style={{ margin: '2rem 0', fontSize: '1.7rem', lineHeight: 1.75 }}>
        So, if you're interesting in joining our Affiliate Program and earning a
        percentage of the sales, please submit details below and we will contact
        you shortly.
      </p>
      <AlertMessage />
      {success ? (
        <Title style={{ marginTop: '5rem' }}>
          Thank for your interest. We will contact you shortly
        </Title>
      ) : submitState ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            width: '70%',
            marginTop: '5rem'
          }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <CustomFormElement
                required
                name='name'
                value={name}
                onChange={handleChange}
                labelName='Name'
              />
              <CustomFormElement
                required
                name='email'
                type='email'
                value={email}
                onChange={handleChange}
                labelName='Email'
              />
              <CustomFormElement
                name='companyName'
                value={companyName}
                onChange={handleChange}
                labelName='Company Name'
              />
              <CustomFormElement
                required
                name='street'
                value={street}
                onChange={handleChange}
                labelName='Street'
              />
              <CustomFormElement
                required
                name='city'
                value={city}
                onChange={handleChange}
                labelName='City'
              />
            </div>
            <div style={{ flex: 1, marginLeft: '2rem' }}>
              <CustomFormElement
                required
                name='state'
                value={state}
                onChange={handleChange}
                labelName='State'
              />
              <CustomFormElement
                required
                name='postalCode'
                value={postalCode}
                type='number'
                onChange={handleChange}
                labelName='Postal Code'
              />
              <CustomFormElement
                name='country'
                required
                value={country}
                onChange={handleChange}
                labelName='Country'
              />
              <CustomFormElement
                required
                name='comment'
                value={comment}
                onChange={handleChange}
                labelName='Comment'
              />
            </div>
          </div>
          <CustomButton type='submit'>Become an Affliate</CustomButton>
        </form>
      )}
    </section>
  )
}

export default withBannerHoc(connect(null, { alertUser })(AffliatesPage))
