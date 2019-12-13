import React, { Fragment, useState, useEffect } from 'react'

// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { loadHomePage } from './redux/actions/inventoryActions'
import { generateCartId, fetchItemsFromCart } from './redux/actions/cartActions'
import {
  selectInventoryCategories,
  selectInventoryProducts
} from './redux/selectors/inventorySelectors'

// Components
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer'
import Spinner from './components/Spinner'
import MainRoutes from './MainRoutes'

// Assets
import { ReactComponent as NortonIcon } from './images/assurances/norton.svg'

const MainApp = ({
  categories,
  products,
  loadHomePage,
  generateCartId,
  fetchItemsFromCart,
  location: { pathname }
}) => {
  useEffect(() => {
    loadHomePage()
    generateCartId().then(id => fetchItemsFromCart(id))
  }, [loadHomePage, generateCartId, fetchItemsFromCart])

  // Overlay state
  const [overLayStatus, setOverlayStatus] = useState(false)

  // Toggling the overlay
  const decideOverlayState = overlayState => setOverlayStatus(overlayState)

  return (
    <Fragment>
      {overLayStatus && (
        <div style={overlayStyles} className='App__overlay'></div>
      )}
      <NavBar />
      <div
        className='container fullScreen'
        style={{
          padding: '1.5rem 2.2rem'
        }}>
        {/* All Routes */}
        {!categories || !products ? (
          <Spinner />
        ) : (
          <MainRoutes decideOverlayState={decideOverlayState} />
        )}
      </div>
      {(!pathname.includes('/payment/success') &&
        !pathname.includes('/payment/confirmed')) && (
        <div className='App__secure'>
          <NortonIcon />
        </div>
      )}
      <Footer />
    </Fragment>
  )
}

const overlayStyles = {
  position: 'absolute',
  minHeight: '100%',
  minWidth: '100%',
  background: 'rgba(192, 192, 192, .6)',
  zIndex: '3'
}

const mapStateToProps = createStructuredSelector({
  products: selectInventoryProducts,
  categories: selectInventoryCategories
})

export default connect(mapStateToProps, {
  loadHomePage,
  generateCartId,
  fetchItemsFromCart
})(MainApp)
