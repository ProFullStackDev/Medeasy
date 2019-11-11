import React, { useState, Fragment, useEffect } from 'react'
import '../styles/pages/ProductDetailPage.scss'
import moment from 'moment'
import uuid from 'uuid/v4'

import { Link } from 'react-router-dom'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {
	fetchProductById,
	fetchReviewsByProductId,
	addReview
} from '../redux/actions/inventoryActions'
import { addProductToCart } from '../redux/actions/cartActions'
import {
	selectInventoryProduct,
	selectInventoryLoading,
	selectInventoryReviews
} from '../redux/selectors/inventorySelectors'
import { selectAuthUser } from '../redux/selectors/authSelectors'

// components
import ProductImageCarousel from '../components/ProductDetailPage/ProductImageCarousel'
import ProductInformation from '../components/ProductDetailPage/ProductInformation'
import CustomButton from '../components/CustomButton'
import CustomFormElement from '../components/CustomFormElement'
import ReviewListItem from '../components/ProductDetailPage/ReviewListItem'
import Spinner from '../components/Spinner'

// images
import { ReactComponent as StarIcon } from '../images/star.svg'
import { ReactComponent as StarFilledIcon } from '../images/starFilled.svg'

const ProductDetailPage = ({
	history,
	user,
	product,
	loading,
	reviews,
	fetchReviewsByProductId,
	fetchProductById,
	addReview,
	addProductToCart,
	match: {
		params: { productId }
	}
}) => {
	useEffect(() => {
		fetchReviewsByProductId(productId).then(reviews =>
			setUserReviews([...reviews])
		)
		fetchProductById(productId)
	}, [fetchProductById, productId, fetchReviewsByProductId])

	const [isReviews, setIsReviews] = useState(false)
	const [userReviews, setUserReviews] = useState([])
	const [formState, setFormState] = useState({
		rating: '',
		text: ''
	})

	const handleSubmit = async event => {
		event.preventDefault()
		const reviewObj = {
			_id: uuid(),
			user: { name: user.name },
			text: formState.text,
			rating: parseInt(formState.rating),
			createdAt: new Date()
		}
		await addReview(productId, {
			...formState,
			rating: parseInt(formState.rating)
		})
		setUserReviews([reviewObj, ...userReviews])
	}

	const handleProductAdding = (product, type) => {
		addProductToCart({ ...product }).then(() =>
			type === 'normal' ? null : history.push('/checkout/account')
		)
	}

	return !product || !reviews || loading ? (
		<Spinner />
	) : (
		<Fragment>
			<section className="ProductDetailPage">
				<div className="ProductDetailPage__informations">
					<ProductImageCarousel photos={product.photos} />
					<ProductInformation
						addProduct={handleProductAdding}
						reviews={reviews}
						product={product}
					/>
				</div>
			</section>
			<section
				style={{ paddingTop: 0, minHeight: '30vh' }}
				className="ProductDetailPage"
			>
				<div className="ProductDetailPage__othertabs">
					<div className="ProductDetailPage__othertabs-tabs">
						<div
							onClick={() => setIsReviews(true)}
							className={`ProductDetailPage__othertabs-tabs--tab reviewtab ${
								isReviews ? 'activeTab' : ''
							}`}
						>
							Reviews
						</div>
						<div
							onClick={() => setIsReviews(false)}
							className={`ProductDetailPage__othertabs-tabs--tab descriptiontab ${
								isReviews ? '' : 'activeTab'
							}`}
						>
							Description
						</div>
					</div>
					{/* Decide later to put in a seperate component or not */
					isReviews && (
						<div className="ProductDetailPage__othertabs-reviews">
							{user ? (
								<section className="ProductDetailPage__othertabs-reviews-createreview">
									<p
										style={{ fontSize: '2rem' }}
										className="ProductDetailPage__othertabs-reviews-createreview-title"
									>
										Write a Review
									</p>
									<div className="ProductDetailPage__othertabs-reviews-createreview-ratings">
										<span style={{ fontSize: '2rem' }}>Your Rating:</span>
										<div className="ProductDetailPage__othertabs-reviews-createreview-ratings--stars">
											{[1, 2, 3, 4, 5].map(val =>
												val <= formState.rating ? (
													<StarFilledIcon
														key={val}
														onClick={() =>
															setFormState({ ...formState, rating: val })
														}
														alt="star"
													/>
												) : (
													<StarIcon
														key={val}
														onClick={() =>
															setFormState({ ...formState, rating: val })
														}
														alt="star"
													/>
												)
											)}
										</div>
									</div>
									<form onSubmit={handleSubmit}>
										<CustomFormElement
											noLabel
											isTextArea
											value={formState.text}
											onChange={e =>
												setFormState({ ...formState, text: e.target.value })
											}
											placeholder="Write Something about your experience with this product..."
										/>
										<CustomButton isSubmit fontSize="2.5rem">
											Submit Review
										</CustomButton>
									</form>
								</section>
							) : (
								<p style={{ textAlign: 'center', fontSize: '2rem' }}>
									Please{' '}
									<strong
										style={{
											fontSize: '1.6rem',
											fontWeight: 'bold',
											color: '#7AC7B8'
										}}
									>
										<Link to="/login">Sign in</Link>
									</strong>{' '}
									or{' '}
									<strong
										style={{
											fontSize: '1.6rem',
											fontWeight: 'bold',
											color: '#7AC7B8'
										}}
									>
										<Link to="/register">Register</Link>
									</strong>{' '}
									to express your reviews
								</p>
							)}
							{userReviews.length > 0 ? (
								<section className="ProductDetailPage__othertabs-reviews-allreviews">
									<p
										style={{ fontSize: '2rem' }}
										className="ProductDetailPage__othertabs-reviews-allreviews-title"
									>
										All Reviews
									</p>
									{/* Reviews are to be dynamically rendered here */}
									{userReviews.map(
										({ _id, text, user: { name }, createdAt, rating }) => (
											<ReviewListItem
												key={_id}
												name={name}
												date={moment(createdAt).format('LL')}
												rating={rating}
												review={text}
											/>
										)
									)}
								</section>
							) : null}
						</div>
					)}
					{/* Decide later to put in a seperate component or not */
					!isReviews && (
						<div className="ProductDetailPage__othertabs-description">
							<p className="ProductDetailPage__othertabs-description--primary">
								{product.description}
							</p>
							<div
								style={{ marginTop: '1rem' }}
								className="ProductDetailPage__othertabs-description--sideeffects"
							>
								<span
									style={{ fontSize: '2rem', marginBottom: '1.5rem' }}
									className="ProductDetailPage__othertabs-description--sideeffects-title"
								>
									Side Effects
								</span>
								{/* This side effects list must come in dynamically */}
								<ul className="ProductDetailPage__othertabs-description--sideeffects-list">
									{product.sideEffects.map((effect, index) => (
										<li key={index}>
											<span className="ProductDetailPage__othertabs-description--sideeffects-list-dot"></span>
											<span>{effect}</span>
										</li>
									))}
								</ul>
								<span
									style={{
										fontSize: '1.8rem',
										marginTop: '1.5rem',
										display: 'inline-block'
									}}
									className="ProductDetailPage__othertabs-description--sideeffects-warning"
								>
									*If any of these effects persist or worsen, tell your doctor
									promptly.
								</span>
							</div>
						</div>
					)}
				</div>
			</section>
		</Fragment>
	)
}

const mapStateToProps = createStructuredSelector({
	loading: selectInventoryLoading,
	reviews: selectInventoryReviews,
	user: selectAuthUser,
	product: selectInventoryProduct
})

export default connect(
	mapStateToProps,
	{ fetchProductById, fetchReviewsByProductId, addReview, addProductToCart }
)(ProductDetailPage)
