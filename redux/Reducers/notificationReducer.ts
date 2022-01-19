import CommonTexts from "../../constants/CommonTexts";
import { ReducerConstants } from "../../constants/Reducer";
const initialState = {
  visible: false,
  statusType: "",
  notificationText: "",
  isAutohide: true,
  showProgress: false,
};


//sampleUse: showErrorNotification('something went wrong')
export default function notificationReducer(
  state = initialState,
  action: { type: any; data: any }
) {
  switch (action.type) {
    case ReducerConstants.SHOW_SUCCESS_NOTIFICATION:
      return getNextState(state, action.data, CommonTexts.notification.Success);
    case ReducerConstants.SHOW_ERROR_NOTIFICATION:
      return getNextState(state, action.data, CommonTexts.notification.Error);
    case ReducerConstants.SHOW_WARNING_NOTIFICATION:
      return getNextState(state, action.data, CommonTexts.notification.Warning);
    case ReducerConstants.SHOW_INFO_NOTIFICATION:
      return getNextState(state, action.data, CommonTexts.notification.Info);
    case ReducerConstants.HIDE_NOTIFICATION:
      return { ...initialState };
    default:
      return state;
  }
}

const getNextState = (state: { visible: boolean; statusType: string; notificatinText: string; isAutohide: boolean; showProgress: boolean; }, notificationData: any, statusType: string) => {
  return {
    ...state,
    visible: true,
    statusType,
    ...notificationData,
  };
};
