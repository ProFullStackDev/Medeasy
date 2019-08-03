import React from 'react'
import '../../styles/components/NavBarDropdowns.scss'

const AnxietySeizure = (props) => {
  return (
    <div className='AnxietySeizure dropdown'>
      <div className='AnxietySeizure__left'>
        <ul className='AnxietySeizure__left-list'>
          <li className='AnxietySeizure__left-list--item'>
            <span className='title'>Lorazepam</span>
            <span>Ativan</span>
          </li>
          <li className='AnxietySeizure__left-list--item'>
            <span className='title'>Alprazolam</span>
            <span>Onax</span>
            <span>Xanax</span>
          </li>
          <li className='AnxietySeizure__left-list--item'>
            <span className='title'>Clonazepam</span>
            <span>Rivotril</span>
          </li>
          <li className='AnxietySeizure__left-list--item'>
            <span className='title'>Diazepam</span>
            <span>Valium</span>
          </li>
        </ul>
      </div>
      <div className='AnxietySeizure__right'>
        <ul className='AnxietySeizure__right-list'>
          <li className='AnxietySeizure__right-list--item'>
            <span className='title'>Nitrazepam</span>
            <span>Mogadon</span>
          </li>
          <li className='AnxietySeizure__right-list--item'>
            <span className='title'>Novartis</span>
            <span>Restoril</span>
          </li>
          <li className='AnxietySeizure__right-list--item'>
            <span className='title'>Midazolam</span>
            <span>Dormicum</span>
          </li>
          <li className='AnxietySeizure__right-list--item'>
            <span className='title'>Zopiclone</span>
            <span>Imovane</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AnxietySeizure;