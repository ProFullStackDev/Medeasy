import { createSelector } from 'reselect'

export const selectAlert = state => state.alert
export const selectAlertAlerts = createSelector([selectAlert], alert => alert.alerts)