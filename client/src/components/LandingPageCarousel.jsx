import React, { useState } from 'react'
import { ReactComponent as LeftArrow } from '../images/larrow.svg'
import { ReactComponent as RightArrow } from '../images/rarrow.svg'
import carousel1Img from '../images/carousel1.jpg'
import carousel2Img from '../images/carousel2.jpg'
import carousel3Img from '../images/carousel3.jpg'

import '../styles/components/LandingPageCarousel.scss'

const LandingPageCarousel = () => {
  const [imageStates, setImageStates] = useState([-1, 0, 1])

  const handleClick = mode => {
    
  }

  return (
    <div className='LandingPageCarousel'>
      <div className='LandingPageCarousel__slides'>
        <div className={`LandingPageCarousel__slide`}>
          <img src={carousel1Img} alt='Carousel 1' />
        </div>
        <div className={`LandingPageCarousel__slide`}>
          <img src={carousel2Img} alt='Carousel 2' />
        </div>
        <div className={`LandingPageCarousel__slide`}>
          <img src={carousel3Img} alt='Carousel 3' />
        </div>
      </div>
      <div className='LandingPageCarousel__buttons'>
        <span onClick={() => handleClick('left')}>
          <LeftArrow className='LandingPageCarousel__buttons-left' alt='left' />
        </span>
        <span onClick={() => handleClick('right')}>
          <RightArrow
            className='LandingPageCarousel__buttons-right'
            alt='right'
          />
        </span>
      </div>
    </div>
  )
}

export default LandingPageCarousel
