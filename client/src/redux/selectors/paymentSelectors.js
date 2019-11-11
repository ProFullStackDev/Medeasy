import { createSelector } from 'reselect'

export const selectPayment = state => state.payment

export const selectPaymentOrderId = createSelector(
	[selectPayment],
	payment => payment.orderId
)

export const selectPaymentRazorpayOrderId = createSelector(
	[selectPayment],
	payment => payment.razorPayOrderId
)

export const selectPaymentPaypalOrderId = createSelector(
	[selectPayment],
	payment => payment.paypalOrderId
)

export const selectPaymentCoinbaseChargeCode = createSelector(
	[selectPayment],
	payment => payment.coinbaseChargeCode
)
