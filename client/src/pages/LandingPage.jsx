import React from 'react'
import WelcomeSection from '../components/LandingPage/WelcomeSection'
import FeaturedProductsSection from '../components/LandingPage/FeaturedProductsSection'
import PaymentBrands from '../components/PaymentBrands'
import BestSellerSection from '../components/LandingPage/BestSellerSection'

import '../styles/pages/LandingPage.scss'

const LandingPage = (props) => {
  return (
    <section className='LandingPage'>
      <WelcomeSection />
      <FeaturedProductsSection />
      <PaymentBrands />
      <BestSellerSection />
    </section>
  )
}
 
export default LandingPage;