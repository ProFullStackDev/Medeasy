import React, { useState, useEffect } from 'react'
import Spinner from '../Spinner'
import { Helmet } from 'react-helmet'

const PaypalPage = ({ orderId, amount, chargePaypal, fetchPaypalOrderId }) => {
  const [scriptLoad, setScriptLoad] = useState(false)
  // const sandboxClientId = `AefTshhMl9VpSrR0vx7uUXw0xviSsBRn4PAD0Dwxi9C7BK7OMFSEZhujtIfA_trbriIrWmUFRynfxjFH`
  const liveClientId = `AS7Ztvvt5RXEx1ObWCrPwiu4tb63QkHlPxCz-hHLS8EeAN5UjgJmQZYrMvRne2FxMv92XZqOFQ2rL5ME`
  useEffect(() => {
    const PAYPAL_SCRIPT = `https://www.paypal.com/sdk/js?client-id=${liveClientId}&currency=INR&disable-funding=credit`
    const script = document.createElement('script')
    script.src = PAYPAL_SCRIPT
    script.async = true
    script.setAttribute('data-order-id', orderId)
    script.onload = () => {
      setScriptLoad(true)
      window.paypal
        .Buttons({
          async createOrder() {
            const ppOrderId = await fetchPaypalOrderId(orderId, amount)
            return ppOrderId
          },
          async onApprove(data) {
            chargePaypal(orderId, data.orderID)
          }
        })
        .render('#paypal-buttons-container')
    }
    document.body.appendChild(script)
  }, [orderId, amount, chargePaypal, fetchPaypalOrderId, liveClientId])

  return !scriptLoad ? (
    <Spinner />
  ) : (
    <>
      <Helmet>
        <title>Medeasy - Payment</title>
        <meta name='description' content='Pay with Paypal' />
      </Helmet>
      <h2 style={{ margin: '3rem 0', textAlign: 'center' }}>
        Pay through Paypal. Click Below
      </h2>
      <div
        id='paypal-buttons-container'
        style={{ display: 'flex', justifyContent: 'center' }}></div>
    </>
  )
}

export default PaypalPage
