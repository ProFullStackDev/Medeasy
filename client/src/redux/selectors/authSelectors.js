import { createSelector } from 'reselect'

export const selectAuth = state => state.auth
export const selectAuthUser = createSelector([selectAuth], auth => auth.user)
