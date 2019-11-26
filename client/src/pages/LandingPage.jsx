import React from 'react'

import WelcomeSection from '../components/LandingPage/WelcomeSection'
import FeaturedProductsSection from '../components/LandingPage/FeaturedProductsSection'
import BannerDetails from '../components/BannerDetails'
import BestSellerSection from '../components/LandingPage/BestSellerSection'
import ReviewsSection from '../components/LandingPage/ReviewsSection'
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
		<BannerDetails direction='row' />
		<FeaturedProductsSection
			products={products.filter(p => p.featured).slice(0, 5)}
		/>
		<BestSellerSection
			products={products
				.sort((a, b) => (a.timesSold > b.timesSold ? -1 : 1))
				.slice(0, 5)}
		/>
		<ReviewsSection />
	</section>
)

const mapStateToProps = createStructuredSelector({
	conditions: selectInventoryCategories,
	products: selectInventoryProducts
})

export default connect(mapStateToProps)(LandingPage)
