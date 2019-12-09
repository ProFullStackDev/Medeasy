import React from 'react'
import { Helmet } from 'react-helmet'

import BannerDetails from '../components/BannerDetails'

const withBannerHoc = WrappedComponent => ({
  descriptionName,
  content,
  ...restProps
}) => (
  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
    <Helmet>
      <title>Medeasy - {descriptionName}</title>
      <meta name='description' content={content} />
    </Helmet>
    <BannerDetails direction='column' />
    <WrappedComponent {...restProps} />
  </div>
)

export default withBannerHoc
