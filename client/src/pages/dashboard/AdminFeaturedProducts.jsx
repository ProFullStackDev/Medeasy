import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  fetchAllProducts,
  saveProductsAsFavourites
} from '../../redux/actions/inventoryActions'
import { createStructuredSelector } from 'reselect'
import {
  selectInventoryProducts,
  selectInventoryLoading
} from '../../redux/selectors/inventorySelectors'
import { ReactComponent as CloseIcon } from '../../images/closeBtn.svg'

import Spinner from '../../components/Spinner'
import { AutoSelect } from '../../components/AutoSelect'
import CustomButton from '../../components/CustomButton'
import { alertUser } from '../../redux/actions/alertActions'

const mapStateToProps = createStructuredSelector({
  products: selectInventoryProducts,
  loading: selectInventoryLoading
})

const FeaturedProductsContainer = styled.div`
  & form {
    margin: 0 !important;
  }
  max-width: 80vw;
`

const NotificationBadge = styled.div`
  padding: 1.5rem 3rem;
  color: white;
  position: relative;
  border-radius: 5px;
  background: #7ac7b8;
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`

const BadgesContainer = styled.div`
  display: flex;
  margin: 2rem 0;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const AdminFeaturedProducts = connect(mapStateToProps, {
  fetchAllProducts,
  saveProductsAsFavourites,
  alertUser
})(
  ({
    products,
    loading,
    fetchAllProducts,
    saveProductsAsFavourites,
    alertUser
  }) => {
    useEffect(() => {
      fetchAllProducts()
    }, [fetchAllProducts])

    const [selectedProducts, setSelectedProducts] = useState([])
    const addSelectedProduct = productObj => {
      if (selectedProducts.length < 5)
        setSelectedProducts([...selectedProducts, productObj])
      else alertUser('Maximum 5 products are allowed', 'danger')
    }

    const deleteSelectedProduct = productId =>
      setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
    const confirmSelection = () => {
      if (selectedProducts.length < 5)
        return alertUser('Minimum 5 products required', 'danger')
      window.confirm('Are you sure to proceed with this selection ?') &&
        saveProductsAsFavourites(selectedProducts.map(p => p.id)).then(
          resp => resp && setSelectedProducts([])
        )
    }

    return loading ? (
      <Spinner />
    ) : (
      <FeaturedProductsContainer>
        <Helmet>
          <title>Medeasy - Select Featured products</title>
          <meta name='description' content='Featured products' />
        </Helmet>
        <h2 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Select featured products
        </h2>
        <h5 style={{ margin: '1rem 0' }}>
          Please wait for sometime after you confirm, as the process is huge
        </h5>
        <AutoSelect
          products={products.filter(
            p => !selectedProducts.map(sP => sP.id).includes(p._id)
          )}
          isNormalItem
          onClick={addSelectedProduct}
        />
        <BadgesContainer>
          {selectedProducts.map(sP => (
            <NotificationBadge key={sP.id}>
              {sP.name}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => deleteSelectedProduct(sP.id)}>
                <CloseIcon
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '7px',
                    width: '1.2rem',
                    height: '1.2rem',
                    color: 'white'
                  }}
                />
              </span>
            </NotificationBadge>
          ))}
        </BadgesContainer>
        <CustomButton onClick={confirmSelection}>
          Confirm Selection
        </CustomButton>
      </FeaturedProductsContainer>
    )
  }
)
