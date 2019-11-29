import React, { Fragment, useState, useEffect } from 'react'

// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { loadHomePage } from './redux/actions/inventoryActions'
import { generateCartId, fetchItemsFromCart } from './redux/actions/cartActions'
import {
	selectInventoryCategories,
	selectInventoryProducts
} from './redux/selectors/inventorySelectors'

// Components
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import Spinner from './components/Spinner'

// Pages
import LandingPage from './pages/LandingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
import ProfilePage from './pages/ProfilePage'
import LoginRegisterModal from './pages/LoginRegisterModal/LoginRegisterModal'
import PaymentConfirmedPage from './pages/PaymentConfimedPage'

// React-router
import { Switch, Route, Redirect } from 'react-router-dom'

// Assets
import { ReactComponent as NortonIcon } from './images/assurances/norton.svg'
import CheckoutPage from './pages/CheckoutPage'
import CategoryProductsPage from './pages/CategoryProductsPage'

const MainApp = ({ categories, products, loadHomePage, generateCartId, fetchItemsFromCart }) => {
	useEffect(() => {
    loadHomePage()
    generateCartId().then(id => fetchItemsFromCart(id))
  }, [loadHomePage, generateCartId, fetchItemsFromCart])

	// Overlay state
	const [overLayStatus, setOverlayStatus] = useState(false)

	// Toggling the overlay
	const decideOverlayState = overlayState => setOverlayStatus(overlayState)

	return (
		<Fragment>
			{overLayStatus && (
				<div style={overlayStyles} className="App__overlay"></div>
			)}
			<NavBar />
			<div
				className="container fullScreen"
				style={{ padding: '1.5rem 2.2rem' }}
			>
				{/* All Routes */}
				{!categories || !products ? (
					<Spinner />
				) : (
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route exact path="/login" component={LoginRegisterModal} />
						<Route exact path="/register" component={LoginRegisterModal} />
						<Route exact path="/payment/success" render={() => <h1>Success page</h1>} />
						<Route exact path="/payment/confirmed" component={PaymentConfirmedPage} />
						<Route
							exact
							path="/customer"
							render={() => <h1>Customer page</h1>}
						/>
						<Route
							exact
							path="/privacy"
							render={() => <h1>Privacy Policy</h1>}
						/>
						<PrivateRoute path="/profile" component={ProfilePage} />
						<Route
							exact
							path="/condition/:conditionId"
							component={CategoryProductsPage}
						/>
						<Route
							exact
							path="/product/:productId"
							component={ProductDetailPage}
						/>
						<Route
							exact
							path="/cart"
							render={routeParams => (
								<ShoppingCartPage
									{...routeParams}
									changeOverlayState={decideOverlayState}
								/>
							)}
						/>
						<Route
							path="/checkout"
							render={routeParams => (
								<CheckoutPage
									{...routeParams}
									changeOverlayState={decideOverlayState}
								/>
							)}
						/>
						<Redirect to="/" />
					</Switch>
				)}
			</div>
			<div className="App__secure">
				<NortonIcon />
			</div>
			<Footer />
		</Fragment>
	)
}

const overlayStyles = {
	position: 'absolute',
	minHeight: '100%',
	minWidth: '100%',
	background: 'rgba(192, 192, 192, .6)',
	zIndex: '3'
}

const mapStateToProps = createStructuredSelector({
	products: selectInventoryProducts,
  categories: selectInventoryCategories
})

export default connect(
	mapStateToProps,
	{ loadHomePage, generateCartId, fetchItemsFromCart }
)(MainApp)
