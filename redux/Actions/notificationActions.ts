import { ReducerConstants } from "../../constants/Reducer";

export const showSuccessNotification = (notificationText: any, isAutohide = true, showProgress = false) => (dispatch: (arg0: { type: string; data: { notificationText: any; isAutohide: boolean; showProgress: boolean; }; }) => void) => {
    dispatch({ type: ReducerConstants.SHOW_SUCCESS_NOTIFICATION, data: {notificationText, isAutohide, showProgress}});
}

export const showErrorNotification = (notificationText: any, isAutohide = true, showProgress = false) => (dispatch: (arg0: { type: string; data: { notificationText: any; isAutohide: boolean; showProgress: boolean; }; }) => void) => {
    dispatch({ type: ReducerConstants.SHOW_ERROR_NOTIFICATION, data: {notificationText, isAutohide, showProgress}});
}

export const showWarningNotification = (notificationText: any, isAutohide = true, showProgress = false) => (dispatch: (arg0: { type: string; data: { notificationText: any; isAutohide: boolean; showProgress: boolean; }; }) => void) => {
    dispatch({ type: ReducerConstants.SHOW_WARNING_NOTIFICATION, data: {notificationText, isAutohide, showProgress}});
}

export const showInfoNotification = (notificationText: any, isAutohide = true, showProgress = false) => (dispatch: (arg0: { type: string; data: { notificationText: any; isAutohide: boolean; showProgress: boolean; }; }) => void) => {
    dispatch({ type: ReducerConstants.SHOW_INFO_NOTIFICATION, data: {notificationText, isAutohide, showProgress}});
}
export const hideNotification = () => (dispatch: (arg0: { type: string; }) => void) => {
    dispatch({type: ReducerConstants.HIDE_NOTIFICATION})
}

export default {}