import { createSelector } from 'reselect'

export const selectProfile = state => state.profile
export const selectProfileAddresses = createSelector(
  [selectProfile],
  profile => profile.addresses
)
export const selectProfileAddress = createSelector(
  [selectProfile],
  profile => profile.address
)
export const selectProfileCard = createSelector(
  [selectProfile],
  profile => profile.card
)
export const selectProfileOrders = createSelector(
  [selectProfile],
  profile => profile.orders
)
export const selectProfileCards = createSelector(
  [selectProfile],
  profile => profile.cards
)
export const selectProfileLoading = createSelector(
  [selectProfile],
  profile => profile.loading
)
