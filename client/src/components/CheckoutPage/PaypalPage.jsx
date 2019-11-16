import React, { useState, useEffect } from 'react'
import Spinner from '../Spinner'

export const PaypalPage = ({
  orderId,
  amount,
  chargePaypal,
  fetchPaypalOrderId
}) => {

  const [scriptLoad, setScriptLoad] = useState(false)

  useEffect(() => {
    const PAYPAL_SCRIPT =
      'https://www.paypal.com/sdk/js?client-id=AefTshhMl9VpSrR0vx7uUXw0xviSsBRn4PAD0Dwxi9C7BK7OMFSEZhujtIfA_trbriIrWmUFRynfxjFH&currency=INR&disable-funding=credit'
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
          async onApprove (data) {
            chargePaypal(orderId, data.orderID)
          }
        })
        .render('#paypal-buttons-container')
    }
    document.body.appendChild(script)
  }, [orderId, amount, chargePaypal, fetchPaypalOrderId])

  return !scriptLoad ? <Spinner /> : (
    <>
      <h2 style={{ margin: '3rem 0', textAlign: 'center' }}>
        Pay through Paypal. Click Below
      </h2>
      <div
        id='paypal-buttons-container'
        style={{ display: 'flex', justifyContent: 'center' }}
      ></div>
    </>
  )
}
