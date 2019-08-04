import React, { useState } from 'react'
import '../styles/pages/ProductDetailPage.scss'

// components
import ProductImageCarousel from '../components/ProductDetailPage/ProductImageCarousel'
import ProductInformation from '../components/ProductDetailPage/ProductInformation'
import CustomButton from '../components/CustomButton'
import ReviewListItem from '../components/ProductDetailPage/ReviewListItem'

// images
import star from '../images/star.svg'

const ProductDetailPage = (props) => {

  const [isReviews, setIsReviews] = useState(true)
  const [ratingMessage, setRatingMessage] = useState('')
  const handleChange = event => setRatingMessage(event.target.value)

  return (
    <div className='ProductDetailPage'>
      <div className='ProductDetailPage__informations'>
        <ProductImageCarousel />
        <ProductInformation />
      </div>
      <div className='ProductDetailPage__othertabs'>
        <div className='ProductDetailPage__othertabs-tabs'>
          <div onClick={() => setIsReviews(true)} className={`ProductDetailPage__othertabs-tabs--tab reviewtab ${ isReviews ? 'activeTab' : ''}`}>Reviews</div>
          <div onClick={() => setIsReviews(false)} className={`ProductDetailPage__othertabs-tabs--tab descriptiontab ${ isReviews ? '' : 'activeTab' }`}>Description</div>
        </div>
        { 
          isReviews && 
          <div className='ProductDetailPage__othertabs-reviews'>
            <section className='ProductDetailPage__othertabs-reviews-createreview'>
              <p style={{ fontSize: '2rem' }} className='ProductDetailPage__othertabs-reviews-createreview-title'>Write a Review</p>
              <div className='ProductDetailPage__othertabs-reviews-createreview-ratings'>
                <span style={{ fontSize: '2rem' }}>Your Rating:</span>
                <div className='ProductDetailPage__othertabs-reviews-createreview-ratings--stars'>
                  <img src={star} alt='star'/>
                  <img src={star} alt='star'/>
                  <img src={star} alt='star'/>
                  <img src={star} alt='star'/>
                  <img src={star} alt='star'/>
                </div>
              </div>
              <form>
                <textarea onChange={handleChange} value={ratingMessage} placeholder='Write Something about your experience with this product...' />
                <CustomButton isSubmit fontSize='2.5rem'>Submit Review</CustomButton>
              </form>
            </section>
            <section className='ProductDetailPage__othertabs-reviews-allreviews'>
              <p style={{ fontSize: '2rem' }} className='ProductDetailPage__othertabs-reviews-allreviews-title'>Reviews</p>
              { /* Reviews are to be dynamically rendered here */ }
              <ReviewListItem name='William S' date='April 24, 2019' rating={4.5} review='Received in less time than expected. Price is half of what pharmacies charge!' />
              <ReviewListItem name='William S' date='April 24, 2019' rating={4.5} review='Received in less time than expected. Price is half of what pharmacies charge!' />
              <ReviewListItem name='William S' date='April 24, 2019' rating={4.5} review='Received in less time than expected. Price is half of what pharmacies charge!' />
            </section>
          </div>
        }
        { 
          !isReviews && 
          <div className='ProductDetailPage__othertabs-description'>
            
          </div>
        }
      </div>
    </div>
  )
}
 
export default ProductDetailPage;