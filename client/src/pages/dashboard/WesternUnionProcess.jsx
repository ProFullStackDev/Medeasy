import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import CustomCheckBox from '../../components/CustomCheckbox'
import AlertMessage from '../../components/AlertMessage'
import CustomFormElement from '../../components/CustomFormElement'
import CustomButton from '../../components/CustomButton'
import Spinner from '../../components/Spinner'

import { alertUser } from '../../redux/actions/alertActions'
import { connect } from 'react-redux'
import { chargeWesternUnion } from '../../redux/actions/paymentActions'
import { createStructuredSelector } from 'reselect'
import { selectInventoryLoading } from '../../redux/selectors/inventorySelectors'

const MainContainer = styled.div``
const FormContainer = styled.form``

const WesternUnionProcess = ({
  match: {
    params: { orderId }
  },
  alertUser,
  chargeWesternUnion,
  loading
}) => {
  const [formState, setFormState] = useState({
    isMoneyReceived: false,
    senderName: '',
    receiptNumber: ''
  })

  const { isMoneyReceived, senderName, receiptNumber } = formState

  const handleSubmit = event => {
    event.preventDefault()
    if (!isMoneyReceived)
      return alertUser(
        'Process cant be done without accepting money.',
        'danger'
      )
    if (
      window.confirm(
        'Accepting this will release this order as confirmed. Confirm proceeding ?'
      )
    )
      chargeWesternUnion(orderId, {
        senderName,
        receiptNumber,
        isMoneyReceived
      })
  }

  const handleChange = event =>
    setFormState({ ...formState, [event.target.name]: event.target.value })

  return (
    <MainContainer>
      <Helmet>
        <title>Medeasy - Process Western Union Order</title>
        <meta name='description' content='Process Western Union Order' />
      </Helmet>
      <h1>Process Western Union Order</h1>
      <h2 style={{ margin: '1.5rem 0' }}>Order number: {orderId}</h2>
      <AlertMessage />
      {!loading ? (
        <FormContainer onSubmit={handleSubmit}>
          <CustomCheckBox
            style={{ margin: '3.5rem 0 1.5rem 0' }}
            text='Did you receive the money ?'
            customStyle={{ fontSize: '1.8rem' }}
            value={isMoneyReceived}
            onClick={() =>
              setFormState({ ...formState, isMoneyReceived: !isMoneyReceived })
            }
          />
          <CustomFormElement
            required
            type='text'
            name='senderName'
            labelName='Sender Name'
            value={senderName}
            onChange={handleChange}
          />
          <CustomFormElement
            required
            name='receiptNumber'
            value={receiptNumber}
            onChange={handleChange}
            labelName='Receipt Number'
          />
          <CustomButton isSubmitButton>Process Order</CustomButton>
        </FormContainer>
      ) : (
        <Spinner />
      )}
    </MainContainer>
  )
}

export default connect(
  createStructuredSelector({ loading: selectInventoryLoading }),
  { alertUser, chargeWesternUnion }
)(WesternUnionProcess)
