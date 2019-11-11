import React from 'react'

import WelcomeSection from '../components/LandingPage/WelcomeSection'
import FeaturedProductsSection from '../components/LandingPage/FeaturedProductsSection'
import PaymentBrands from '../components/PaymentBrands'
import BestSellerSection from '../components/LandingPage/BestSellerSection'
import { ReviewsSection } from '../components/LandingPage/ReviewsSection'
import Condtions from '../components/LandingPage/Condtions'
import moment from 'moment'

import '../styles/pages/LandingPage.scss'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
	selectInventoryProducts,
	selectInventoryCategories
} from '../redux/selectors/inventorySelectors'

const reviews = [
	{ text: 'Wow! Super fast delivery and the quality of the product is even better. Thanks... Angela', createdAt: moment().format('L') },
	{ text: 'I am grateful to you customer service team for being so helpful when placing my order. Alison', createdAt: moment().format('L') },
	{ text: 'I have been ordering from you now for some time and I just wanted to take this.. Judy', createdAt: moment().format('L') },
	{ text: 'I have been ordering from you now for some time and I just wanted to take this.. Judy', createdAt: moment().format('L') },
]

const LandingPage = ({ conditions, products }) => (
	<section className="LandingPage">
		<WelcomeSection />
		<Condtions conditions={conditions} />
		<FeaturedProductsSection
			products={products.filter(p => p.featured).slice(0, 5)}
		/>
		<PaymentBrands />
		<BestSellerSection
			products={products
				.sort((a, b) => (a.timesSold > b.timesSold ? -1 : 1))
				.slice(0, 5)}
		/>
		<ReviewsSection reviews={reviews} />
	</section>
)

const mapStateToProps = createStructuredSelector({
	conditions: selectInventoryCategories,
	products: selectInventoryProducts
})

export default connect(mapStateToProps)(LandingPage)
