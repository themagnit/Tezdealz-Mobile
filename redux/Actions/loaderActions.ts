import { ReducerConstants } from "../../constants/Reducer";


export const showLoader = (text = "", showFullPageLoader = true) =>(dispatch: (arg0: {type: any;data: { text: string; showFullpageLoader: boolean };}) => void) => {
    dispatch({
      type: ReducerConstants.SHOW_LOADER,
      data: { text: text, showFullpageLoader: showFullPageLoader },
    });
  };

export const hideLoader = () => (dispatch: (arg0: { type: any }) => void) => {
  dispatch({ type: ReducerConstants.HIDE_LOADER });
};



export default {};
