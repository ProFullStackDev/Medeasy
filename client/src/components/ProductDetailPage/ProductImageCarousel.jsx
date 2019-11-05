import React, { useState } from 'react'
import { ReactComponent as LeftArrowBlackIcon } from '../../images/larrowBlack.svg'
import { ReactComponent as RightArrowBlackIcon } from '../../images/rarrowBlack.svg'
import '../../styles/components/ProductImageCarousel.scss'

const ProductImageCarousel = ({ photos }) => {
	const [imageNumber, setImageNumber] = useState(0)

	const incrementImg = () => {
		if (imageNumber < 2) setImageNumber(imageNumber + 1)
	}

	const decrementImg = () => {
		if (imageNumber > 0) setImageNumber(imageNumber - 1)
	}

	const handleClick = event =>
		setImageNumber(parseInt(event.target.parentNode.dataset.imgnumber))
	return (
		<div className="ProductImageCarousel">
			<div className="ProductImageCarousel__main">
				<span onClick={decrementImg}>
					<LeftArrowBlackIcon style={{ cursor: 'pointer' }} alt="left-arrow" />
				</span>
				<img
					src={photos[imageNumber]}
					alt="tablet-main"
					className="ProductImageCarousel__main--img"
				/>
				<span onClick={incrementImg}>
					<RightArrowBlackIcon
						style={{ cursor: 'pointer' }}
						alt="right-arrow"
					/>
				</span>
			</div>
			<div className="ProductImageCarousel__otherimgs">
				{photos.map((image, index) => (
					<div key={index}
						onClick={handleClick}
						data-imgnumber={index}
						className={`ProductImageCarousel__otherimgs--img ${
							imageNumber === index ? 'activeImg' : ''
						}`}
					>
						<img src={image} alt="img1" />
					</div>
				))}
			</div>
			<span
				style={{
					color: '#979797',
					marginTop: '3rem',
					display: 'block',
					textAlign: 'center'
				}}
			>
				*Actual product may differ in appearance from image shown.
			</span>
		</div>
	)
}

export default ProductImageCarousel
