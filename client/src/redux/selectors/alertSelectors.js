import { createSelector } from 'reselect'

export const selectAlert = state => state.alert
export const selectAlertAlerts = createSelector([selectAlert], alert => alert.alerts)
export const selectAlertModal = createSelector([selectAlert], alert => alert.modal)