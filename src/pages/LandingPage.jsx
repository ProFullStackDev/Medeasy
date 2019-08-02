import React from 'react'
import WelcomeSection from '../components/LandingPage/WelcomeSection'
import FeaturedProductsSection from '../components/LandingPage/FeaturedProductsSection'

import '../styles/pages/LandingPage.scss'

const LandingPage = (props) => {
  return (
    <section className='LandingPage'>
      <WelcomeSection />
      <FeaturedProductsSection />
    </section>
  )
}
 
export default LandingPage;