import React, { useEffect } from 'react'

import WelcomeSection from '../components/LandingPage/WelcomeSection'
// import FeaturedProductsSection from '../components/LandingPage/FeaturedProductsSection'
import PaymentBrands from '../components/PaymentBrands'
import BestSellerSection from '../components/LandingPage/BestSellerSection'
import Condtions from '../components/LandingPage/Condtions'

import '../styles/pages/LandingPage.scss'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
	selectInventoryProducts,
	selectInventoryCategories
} from '../redux/selectors/inventorySelectors'

const LandingPage = ({ conditions, products }) => (
		<section className="LandingPage">
			<WelcomeSection />
			<Condtions conditions={conditions} />
			{/* <FeaturedProductsSection /> */}
			<PaymentBrands />
			<BestSellerSection products={products} />
		</section>
	)

const mapStateToProps = createStructuredSelector({
	conditions: selectInventoryCategories,
	products: selectInventoryProducts
})

export default connect(
	mapStateToProps
)(LandingPage)
