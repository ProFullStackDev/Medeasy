import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryCategories } from '../../redux/selectors/inventorySelectors'
import { fetchAllCategories } from '../../redux/actions/inventoryActions'

import Spinner from '../../components/Spinner'
import CustomButton from '../../components/CustomButton'
import CategoriesList from '../../components/AdminPage/CategoriesList'
import AdminCarousel from '../../components/AdminPage/AdminCarousel'

const AdminCategories = ({ categories, fetchAllCategories, onClick }) => {
  // If there are no categories on state, means fetch them
  useEffect(() => {
    if (!categories) fetchAllCategories()
  }, [categories, fetchAllCategories])

  const [pageNumber, setPageNumber] = useState(1)
  const handleClick = page => setPageNumber(page)

  return !categories ? (
    <Spinner white={false} />
  ) : (
    <div className='AdminDashboardPage__categories'>
      <Helmet>
        <title>Medeasy - All Categories</title>
        <meta name='description' content='All categories' />
      </Helmet>
      <div className='AdminDashboardPage__categories-info'>
        <h2>ALL Conditions</h2>
        <Link to='/admin/dashboard/add-category' style={{ marginLeft: '3rem' }}>
          <CustomButton>Add Condtion</CustomButton>
        </Link>
      </div>
      <CategoriesList
        onClick={onClick}
        categories={categories.slice((pageNumber - 1) * 10, 10 * pageNumber)}
      />
      <AdminCarousel
        onClick={handleClick}
        totalPages={Math.ceil(categories.length / 10)}
        currentPageNumber={pageNumber}
      />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  categories: selectInventoryCategories
})

export default connect(mapStateToProps, { fetchAllCategories })(AdminCategories)
