import { createSelector } from 'reselect'

export const selectAuth = state => state.auth
export const selectAuthCheckoutRole = createSelector(
	[selectAuth],
	auth => auth.checkoutRole
)
export const selectAuthUser = createSelector(
	[selectAuth],
	auth => auth.user
)
export const selectAuthAccessToken = createSelector(
	[selectAuth],
	auth => auth.accessToken
)
export const selectAuthUserLoading = createSelector(
	[selectAuth],
	auth => auth.userLoading
)
