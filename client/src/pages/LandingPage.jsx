import React from 'react'

import WelcomeSection from '../components/LandingPage/WelcomeSection'
import FeaturedProductsSection from '../components/LandingPage/FeaturedProductsSection'
import BannerDetails from '../components/BannerDetails'
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
	{ text: 'Wow! Super fast delivery and the quality of the product is even better. Thanks... Angela', createdAt: moment(new Date('10/09/2016')).format('LL') },
	{ text: 'I am grateful to you customer service team for being so helpful when placing my order. Alison', createdAt: moment(new Date('02/23/2017')).format('LL') },
	{ text: 'I have been ordering from you now for some time and I just wanted to take this.. Judy', createdAt: moment(new Date('02/06/2017')).format('LL') },
	{ text: 'Great Results Thanks.. Cornelius', createdAt: moment(new Date('06/03/2018')).format('LL') },
]

const LandingPage = ({ conditions, products }) => (
	<section className="LandingPage">
		<WelcomeSection />
		<BannerDetails direction='row' />
		<Condtions conditions={conditions} />
		<FeaturedProductsSection
			products={products.filter(p => p.featured).slice(0, 5)}
		/>
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
