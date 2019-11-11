import React, { useState } from 'react'
import '../../styles/components/ProductInformation.scss'

// components
import BestSellerProduct from './BestSellerProduct'
import FeaturedProduct from './FeaturedProduct'
import Rating from '../Rating'
import StockStatus from '../StockStatus'
import CustomBadge from '../CustomBadge'
import Assurances from './Assurances'

const ProductInformation = ({
	reviews,
	product: { _id, name, stockAvailable, dosages, quantities, price, distributor },
	addProduct
}) => {
	const [dosage, setDosage] = useState(parseInt(dosages[0]))
	const [quantity, setQuantity] = useState(parseInt(quantities[0]))

	const handleDosageClick = badgeValue =>
		setDosage(parseInt(badgeValue.replace(/ /g, '').split('mg')[0]))

	const handleQuantityClick = badgeValue =>
		setQuantity(parseInt(badgeValue.replace(/ /g, '').split('Pills')[0]))

	const productObj = {
		productId: _id,
		attributes: {
			dosage: `${dosage}mg`,
			quantity: `${quantity}`
		}
	}

	return (
		<div className="ProductInformation">
			<div className="ProductInformation__detail">
				<span className="ProductInformation__detail--name">
					{name.toUpperCase()}
				</span>
				<span className='ProductInformation__detail--manufacturer'>by <span style={{ color: '#7AC7B8', fontSize: '1.8rem' }}>{distributor}</span></span>
				<BestSellerProduct />
				<FeaturedProduct />
			</div>
			{reviews.length > 0 ? (
				<div className="ProductInformation__rate">
					{/* Reviews and Rating should come dynamically */}
					<Rating
						rating={parseInt(
							Math.floor(
								reviews.reduce((acc, rev) => acc + parseInt(rev.rating), 0) /
									reviews.length
							)
						)}
					/>
					<span
						style={{ fontSize: '2rem' }}
						className="ProductInformation__rate-review"
					>
						{reviews.length} Reviews
					</span>
				</div>
			) : null}
			<div className="ProductInformation__availability">
				<span style={{ fontSize: '1.8rem' }}>Availability:</span>
				{/* Stock status must be dynamic */}
				<StockStatus status={stockAvailable} />
			</div>
			<div className="ProductInformation__dosage">
				<p
					className="ProductInformation__dosage--title"
					style={{ fontSize: '2rem' }}
				>
					Dosage:
				</p>
				<div className="ProductInformation__dosage--badges">
					{dosages.map((dos, index) => (
						<CustomBadge
							selected={dosage === parseInt(dos)}
							onClick={handleDosageClick}
							key={index}
							badgeValue={`${dos} mg`}
						/>
					))}
				</div>
			</div>
			<div className="ProductInformation__pillquantity">
				<p
					className="ProductInformation__pillquantity--title"
					style={{ fontSize: '2rem' }}
				>
					Pill Quantity:
				</p>
				<div className="ProductInformation__pillquantity--badges">
					{quantities.map((quan, index) => (
						<CustomBadge
							selected={quantity === parseInt(quan)}
							onClick={handleQuantityClick}
							key={index}
							badgeValue={`${quan} Pills`}
						/>
					))}
				</div>
			</div>
			<div className="ProductInformation__rates">
				<div className="ProductInformation__rates--price">
					{/* If there is a discounted price means apply this */}
					<p className="ProductInformation__rates--price-final">
						${price[`${dosage}mg`][quantity]}.00
					</p>

					{/* Else just print the original price */}
					{/* <p className='ProductInformation__rates--price-discounted'>$300</p> */}
				</div>
				<Assurances />
			</div>
			{stockAvailable ? (
				<div className="ProductInformation__buttons">
					<button
						onClick={() => addProduct(productObj, 'normal')}
						className="ProductInformation__buttons-button ProductInformation__buttons-addcart"
					>
						Add to Cart
					</button>
					<button onClick={() => addProduct(productObj, 'direct')} className="ProductInformation__buttons-button ProductInformation__buttons-buy">
						Buy Now
					</button>
				</div>
			) : null}
		</div>
	)
}

export default ProductInformation
