import React, { useState, useEffect } from 'react'

import CustomButton from './CustomButton'
import { Link } from 'react-router-dom'

import { ReactComponent as LeftArrow } from '../images/larrow.svg'
import { ReactComponent as RightArrow } from '../images/rarrow.svg'
import carousel1Img from '../images/carousel1.jpg'
import carousel2Img from '../images/carousel2.jpg'
import carousel3Img from '../images/carousel3.jpg'

import '../styles/components/LandingPageCarousel.scss'

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  background: 'rgba(0, 0, 0, .4)',
  width: '100%',
  height: '100%',
  zIndex: 11,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white'
}

const LandingPageCarousel = () => {
  const images = [carousel1Img, carousel2Img, carousel3Img]
  const [imageStates, setImageStates] = useState([0, 1, 2])
  const [prev, current, next] = imageStates

  const handleClick = mode => {
    let currentPosition = imageStates.indexOf(1),
      prevPosition = imageStates.indexOf(0),
      nextPosition = imageStates.indexOf(2)

    if (mode === 'right') {
      currentPosition = currentPosition === 0 ? 2 : currentPosition - 1
      prevPosition = prevPosition === 0 ? 2 : prevPosition - 1
      nextPosition = nextPosition === 0 ? 2 : nextPosition - 1
    } else {
      currentPosition =
        currentPosition === imageStates.length - 1 ? 0 : currentPosition + 1
      prevPosition =
        prevPosition === imageStates.length - 1 ? 0 : prevPosition + 1
      nextPosition =
        nextPosition === imageStates.length - 1 ? 0 : nextPosition + 1
    }

    const modArr = []
    modArr[prevPosition] = 0
    modArr[nextPosition] = 2
    modArr[currentPosition] = 1

    setImageStates([...modArr])
  }

  return (
    <div className='LandingPageCarousel'>
      <div className='LandingPageCarousel__slides'>
        {Array.from({ length: 3 }, (_, index) => index).map(val => (
          <div
            key={val}
            className={`LandingPageCarousel__slide ${
              val === prev
                ? 'prev'
                : val === current
                ? 'current'
                : val === next
                ? 'next'
                : ''
            }`}>
            <img src={images[val]} alt='Carousel 1' />
            <div style={overlayStyle}>
              <h2
                style={{
                  fontWeight: 'bold',
                  fontSize: '3rem',
                  width: '80%',
                  textAlign: 'center',
                  margin: '0 auto'
                }}>
                {val === 0
                  ? 'Best in class ED medications on sale!'
                  : val === 1
                  ? '10% OFF* on Western Union and Bitcoin payments'
                  : val === 2
                  ? 'Quick Delivery at your doorstep!'
                  : ''}
              </h2>
              <Link
                to={
                  val === 0
                    ? '/condition/5dc0c9d7e7f9e32260c179df'
                    : val === 1
                    ? '/bitcoin-tutorial'
                    : val === 2
                    ? '/delivery'
                    : ''
                }
                style={{ marginTop: '2rem' }}>
                <CustomButton extraStyle={{ background: 'rgb(248, 147, 26)' }}>
                  {val === 0
                    ? 'Buy now'
                    : val === 1
                    ? 'Learn More'
                    : val === 2
                    ? 'See here How'
                    : ''}
                </CustomButton>
              </Link>
            </div>
          </div>
        ))}
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
