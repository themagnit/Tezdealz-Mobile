import { ReducerConstants } from "../../constants/Reducer";

const initialState = {
  isLoader: false,
  loadertext: "",
};

//sampleUse: showLoader()
export default function loaderReducer(
  state = initialState,
  action: { type: any; data: { text: any; showFullPageLoader: any } }
) {
  switch (action.type) {
    case ReducerConstants.SHOW_LOADER:
      return {
        ...state,
        isLoader: true,
        loadertext: action.data.text,
        showFullPageLoader: action.data.showFullPageLoader,
      };
    case ReducerConstants.HIDE_LOADER:
      return {
        ...state,
        isLoader: false,
        loadertext: "",
      };

    default:
      return state;
  }
}
