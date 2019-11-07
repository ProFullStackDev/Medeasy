import React, { useState, Fragment } from 'react'
import '../styles/pages/ShoppingCartPage.scss'
// components
import UpdateModal from '../components/UpdateModal'
import CustomButton from '../components/CustomButton'
import CartList from '../components/ShoppingCartPage/CartList'
import Spinner from '../components/Spinner'
// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartProducts } from '../redux/selectors/cartSelectors'
import {
	selectInventoryLoading
} from '../redux/selectors/inventorySelectors'
import { clearCart, deleteCartItem } from '../redux/actions/cartActions'
// images
import { ReactComponent as CartLargeIcon } from '../images/cartLarge.svg'
import { ReactComponent as BackIcon } from '../images/back.svg'
import fullfiled from '../images/assurances/fullfiled.png' // Show this only if the product is fullfiled for free delivery
// Other
import { Link } from 'react-router-dom'

const ShoppingCartPage = ({
	changeOverlayState,
	cartProducts,
	loading,
  clearCart,
  deleteCartItem
}) => {
	const [isDosageClicked, setIsDosageClicked] = useState(false)
	const [isQuantityClicked, setIsQuantityClicked] = useState(false)
	const [modalValues, setModalValues] = useState([])
	const [prevVal, setPrevVal] = useState('')
	const [itemId, setItemId] = useState('')

	const updateModalState = (type, values, oldValue, itemId) => {
		if (type === 'quantity') {
			setIsQuantityClicked(true)
			setPrevVal(oldValue + ' Pills')
		} else {
			setIsDosageClicked(true)
			setPrevVal(oldValue.split('mg')[0] + ' mg')
		}
		setItemId(itemId)
		setModalValues([...values])
		changeOverlayState(true)
  }
  
	const disableOverlay = () => {
		setIsDosageClicked(false)
		setIsQuantityClicked(false)
		changeOverlayState(false)
  }

	const totalPrice = cartProducts.reduce(
		(acc, product) => (acc += parseInt(product.subTotal)),
		0
	)

	return loading ? (
		<Spinner />
	) : (
		<section className="ShoppingCartPage">
			{/* Show modal when update button is clicked */}
			{isDosageClicked && (
				<UpdateModal
					itemId={itemId}
					type="dosage"
					prevVal={prevVal}
					disableOverlay={disableOverlay}
					title="Update Pill Quantity"
					values={modalValues}
				/>
			)}
			{isQuantityClicked && (
				<UpdateModal
					itemId={itemId}
					type="quantity"
					prevVal={prevVal}
					disableOverlay={disableOverlay}
					title="Update Dosage"
					values={modalValues}
				/>
			)}
			<h1 className="ShoppingCartPage__title">
				<CartLargeIcon
					alt="cart-large"
					className="ShoppingCartPage__title--img"
				/>
				<span className="ShoppingCartPage__title--name">Shopping Cart</span>
			</h1>
			<div className="ShoppingCartPage__main">
				{!cartProducts.length ? (
					<p style={{ textAlign: 'center' }}>
						Cart is Empty. Feel free to add some items and check back
					</p>
				) : (
					<Fragment>
						<CartList
              onDelete={itemId => deleteCartItem(itemId)}
							cartProducts={cartProducts}
							decideModalState={updateModalState}
						/>
						<div className="ShoppingCartPage__main--price">
							<div className="ShoppingCartPage__main--price-subtotal ShoppingCartPage__main--general">
								<span className="ShoppingCartPage__main--price-subtotal-title">
									Subtotal:
								</span>
								{/* Price must be dynamic */}
								<span
									className="ShoppingCartPage__main--price-subtotal-value"
									style={{ fontSize: '2.5rem' }}
								>
									${totalPrice}
								</span>
							</div>
							<div className="ShoppingCartPage__main--price-amount ShoppingCartPage__main--general">
								<span className="ShoppingCartPage__main--price-amount-title">
									You Pay:
								</span>
								{/* Price must be dynamic */}
								<span className="ShoppingCartPage__main--price-amount-value">
									${totalPrice}
									{/* This must be dynamic coz of uncertainty in delivery charge */}
									<img src={fullfiled} alt="fullfiled-assurance" />
								</span>
							</div>
							{/* <div className="ShoppingCartPage__main--price-savings ShoppingCartPage__main--general">
								<span className="ShoppingCartPage__main--price-savings-title">
									You Save:
								</span>
								// Price must be dynamic
								<span
									className="ShoppingCartPage__main--price-savings-value"
									style={{ fontSize: '2.5rem' }}
								>
									$210
								</span>
							</div> */}
						</div>
						<div className="ShoppingCartPage__main--ctas">
							<Link to="/" className="ShoppingCartPage__main--ctas-back">
								<BackIcon alt="back-btn" />
								<span>Continue Shopping</span>
							</Link>
							<CustomButton
								onClick={clearCart}
								fontSize="2.5rem"
								specialBgColor="#d44a4a"
							>
								Clear Cart
							</CustomButton>
							<Link to="/checkout/account">
								<CustomButton fontSize="2.5rem">Checkout</CustomButton>
							</Link>
						</div>
					</Fragment>
				)}
			</div>
		</section>
	)
}

const mapStateToProps = createStructuredSelector({
	cartProducts: selectCartProducts,
	loading: selectInventoryLoading
})

export default connect(
	mapStateToProps,
	{ clearCart, deleteCartItem }
)(ShoppingCartPage)
