import React, { useState } from 'react'
import { ReactComponent as DownArrowBlack } from '../images/downArrowBlack.svg'
import '../styles/components/FaqSlider.scss'

const FaqSlider = ({ question, children }) => {
  const [slideMode, setSlideMode] = useState(false)
  return (
    <div className='FaqSlider'>
      <div onClick={() => setSlideMode(!slideMode)} className={`FaqSlider__question ${slideMode ? 'active' : ''}`}>
        {question}
        <DownArrowBlack />
      </div>
      <div className={`FaqSlider__answer ${slideMode ? 'active' : ''}`}>
        {children}
      </div>
    </div>
  )
}

export default FaqSlider
