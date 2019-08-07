import React, { useState } from 'react'
import '../styles/pages/ProductDetailPage.scss'

// components
import ProductImageCarousel from '../components/ProductDetailPage/ProductImageCarousel'
import ProductInformation from '../components/ProductDetailPage/ProductInformation'
import CustomButton from '../components/CustomButton'
import CustomFormElement from '../components/CustomFormElement'
import ReviewListItem from '../components/ProductDetailPage/ReviewListItem'

// images
import star from '../images/star.svg'

const ProductDetailPage = (props) => {

  const [isReviews, setIsReviews] = useState(false)
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
        {  /* Decide later to put in a seperate component or not */
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
                <CustomFormElement noLabel isTextArea onChange={handleChange} value={ratingMessage} placeholder='Write Something about your experience with this product...' />
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
        { /* Decide later to put in a seperate component or not */
          !isReviews && 
          <div className='ProductDetailPage__othertabs-description'>
            <p className='ProductDetailPage__othertabs-description--primary'>
              This combination medication is used to treat attention deficit hyperactivity disorder - ADHD. It works by changing the amounts of certain natural substances in the brain. Amphetamine/dextroamphetamine belongs to a class of drugs known as stimulants. It can help increase your ability to pay attention, stay focused on an activity, and control behavior problems. It may also help you to organize your tasks and improve listening skills.
            </p>
            <p className='ProductDetailPage__othertabs-description--secondary'>
              This drug is also used to treat a certain sleeping disorder (narcolepsy) to help you stay awake during the day. It should not be used to treat tiredness or to hold off sleep in people who do not have a sleep disorder.
            </p>
            <div className='ProductDetailPage__othertabs-description--sideeffects'>
              <span style={{ fontSize: '2rem', marginBottom: '1.5rem' }} className='ProductDetailPage__othertabs-description--sideeffects-title'>
                Side Effects
              </span>
              { /* This side effects list must come in dynamically */ }
              <ul className='ProductDetailPage__othertabs-description--sideeffects-list'>
                <li><span className='ProductDetailPage__othertabs-description--sideeffects-list-dot'></span><span>Loss of appetite</span></li>
                <li><span className='ProductDetailPage__othertabs-description--sideeffects-list-dot'></span><span>Weight loss</span></li>
                <li><span className='ProductDetailPage__othertabs-description--sideeffects-list-dot'></span><span>Dry mouth</span></li>
                <li><span className='ProductDetailPage__othertabs-description--sideeffects-list-dot'></span><span>Stomach upset or ache</span></li>
                <li><span className='ProductDetailPage__othertabs-description--sideeffects-list-dot'></span><span>Nausea or vomiting</span></li>
                <li><span className='ProductDetailPage__othertabs-description--sideeffects-list-dot'></span><span>Dizziness</span></li>
                <li><span className='ProductDetailPage__othertabs-description--sideeffects-list-dot'></span><span>Headache</span></li>
                <li><span className='ProductDetailPage__othertabs-description--sideeffects-list-dot'></span><span>Diarrhea</span></li>
                <li><span className='ProductDetailPage__othertabs-description--sideeffects-list-dot'></span><span>Fever</span></li>
                <li><span className='ProductDetailPage__othertabs-description--sideeffects-list-dot'></span><span>Nervousness</span></li>
                <li><span className='ProductDetailPage__othertabs-description--sideeffects-list-dot'></span><span>Trouble sleeping</span></li>
                <li><span className='ProductDetailPage__othertabs-description--sideeffects-list-dot'></span><span>High Blood Pressure</span></li>
              </ul>
              <span style={{ fontSize: '1.8rem', marginTop: '1.5rem', display: 'inline-block' }} className='ProductDetailPage__othertabs-description--sideeffects-warning'>
                *If any of these effects persist or worsen, tell your doctor promptly.
              </span>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
 
export default ProductDetailPage;