import React, { Component } from 'react'
import '../../styles/components/ProductImageCarousel.scss'
import lArrowBlack from '../../images/larrowBlack.svg'
import rArrowBlack from '../../images/rarrowBlack.svg'
// Temporary images
import tablet1 from '../../images/tablet1.png'
import tablet2 from '../../images/tablet2.png'
import tablet3 from '../../images/tablet3.png'

class ProductImageCarousel extends Component {
  constructor (props) {
    super(props)
    this.state = { imageNumber: 0 }
    this.handleClick = this.handleClick.bind(this)
    this.incrementImg = this.incrementImg.bind(this)
    this.decrementImg = this.decrementImg.bind(this)
  }

  incrementImg = () => {
    if (this.state.imageNumber < 2)
      this.setState(({ imageNumber }) => ({ imageNumber: imageNumber + 1}))
  }

  decrementImg = () => {
    if (this.state.imageNumber > 0) 
      this.setState(({ imageNumber }) => ({ imageNumber: imageNumber - 1}))
  }

  handleClick = event => this.setState({ imageNumber: parseInt(event.target.parentNode.dataset.imgnumber) })

  render () {
    // Should come from backend
    const images = [tablet1, tablet2, tablet3]
    return (
      <div className='ProductImageCarousel'>
        <div className='ProductImageCarousel__main'>
          <img onClick={ this.decrementImg } style={{ cursor: 'pointer' }} src={lArrowBlack} alt='left-arrow' />
          <img src={images[this.state.imageNumber]} alt='tablet-main' className='ProductImageCarousel__main--img'/>
          <img onClick={ this.incrementImg } style={{ cursor: 'pointer' }} src={rArrowBlack} alt='right-arrow' />
        </div>
        <div className='ProductImageCarousel__otherimgs'>
          <div onClick={ this.handleClick } data-imgnumber='0' className={`ProductImageCarousel__otherimgs--img ${this.state.imageNumber === 0 ? 'activeImg' : ''}`}>
            <img src={tablet1} alt='img1' />
          </div>
          <div onClick={ this.handleClick } data-imgnumber='1' className={`ProductImageCarousel__otherimgs--img ${this.state.imageNumber === 1 ? 'activeImg' : ''}`}>
            <img src={tablet2} alt='img2' />
          </div>
          <div onClick={ this.handleClick } data-imgnumber='2' className={`ProductImageCarousel__otherimgs--img ${this.state.imageNumber === 2 ? 'activeImg' : ''}`}>
            <img src={tablet3} alt='img1' />
          </div>
        </div>
        <span style={{ color: '#979797', marginTop: '3rem', display: 'inline-block' }}>*Actual product may differ in appearance from image shown.</span>
      </div>
    )
  }
}

export default ProductImageCarousel