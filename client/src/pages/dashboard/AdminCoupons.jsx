import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryCoupons } from '../../redux/selectors/inventorySelectors'
import { fetchAllCoupons } from '../../redux/actions/inventoryActions'

import Spinner from '../../components/Spinner'
import CustomButton from '../../components/CustomButton'
import CouponsList from '../../components/AdminPage/CouponsList'
import AdminCarousel from '../../components/AdminPage/AdminCarousel'

const AdminCoupons = ({ coupons, fetchAllCoupons, onClick }) => {
  // If there are no Coupons on state, means fetch them
  useEffect(() => {
    if (!coupons) fetchAllCoupons()
  }, [coupons, fetchAllCoupons])

  const [pageNumber, setPageNumber] = useState(1)
  const handleClick = page => setPageNumber(page)

  return !coupons ? (
    <Spinner white={false} />
  ) : (
    <div className='AdminDashboardPage__coupons'>
      <Helmet>
        <title>Medeasy - All Coupons</title>
        <meta name='description' content='All Coupons' />
      </Helmet>
      <div className='AdminDashboardPage__coupons-info'>
        <h2>ALL Coupons</h2>
        <Link to='/admin/dashboard/add-coupon'>
          <CustomButton>Add Coupon</CustomButton>
        </Link>
      </div>
      <CouponsList
        onClick={onClick}
        coupons={coupons.slice((pageNumber - 1) * 10, 10 * pageNumber)}
      />
      <AdminCarousel
        onClick={handleClick}
        totalPages={Math.ceil(coupons.length / 10)}
        currentPageNumber={pageNumber}
      />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  coupons: selectInventoryCoupons
})

export default connect(mapStateToProps, { fetchAllCoupons })(AdminCoupons)
