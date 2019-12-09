import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  selectInventoryProducts,
  selectInventoryCategory
} from '../redux/selectors/inventorySelectors'
import { fetchCategoryById } from '../redux/actions/inventoryActions'

import withBannerHoc from '../components/withBannerHoc'
import ProductsCarousel from '../components/ProductsCarousel'
import ProductList from '../components/ProductList'
import Spinner from '../components/Spinner'
import { Title, DescriptionContainer } from '../styles/styledComponents'

const CategoryProductsPage = ({
  products,
  category,
  match: {
    params: { conditionId }
  },
  fetchCategoryById
}) => {
  useEffect(() => {
    fetchCategoryById(conditionId)
  }, [fetchCategoryById, conditionId])

  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const categoryProducts = products.filter(
    product => product.category._id === conditionId
  )

  return !category ? (
    <Spinner />
  ) : (
    <section className='CategoryProductsPage' style={{ marginLeft: '3rem' }}>
      <Title>
        {category.name} : {categoryProducts.length} Products
      </Title>
      <ProductsCarousel
        onClick={pageNumber => setCurrentPageNumber(pageNumber)}
        currentPageNumber={currentPageNumber}
        totalPages={Math.ceil(products.length / 30)}
      />
      <ProductList
        products={categoryProducts.slice(
          (currentPageNumber - 1) * 30,
          30 * currentPageNumber
        )}
      />
      <ProductsCarousel
        onClick={pageNumber => setCurrentPageNumber(pageNumber)}
        currentPageNumber={currentPageNumber}
        totalPages={Math.ceil(products.length / 30)}
      />
      <Title>Description </Title>
      <DescriptionContainer>
        {category.description.split(/\n/g).map((d, index) => (
          <p key={index}>{d}</p>
        ))}
      </DescriptionContainer>
    </section>
  )
}

const mapStateToProps = createStructuredSelector({
  products: selectInventoryProducts,
  category: selectInventoryCategory
})

export default withBannerHoc(
  connect(mapStateToProps, { fetchCategoryById })(CategoryProductsPage)
)
