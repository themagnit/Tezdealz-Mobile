import { ReducerConstants } from "../../constants/Reducer";
export const getAuthentication = (token = "", data = {}) =>(dispatch: (arg0: { type: string; data: { token: string; user: {}; }; }) => void) => {
  dispatch({
      type: ReducerConstants.LOGIN,
      data: { token: token, user: data },
    });
  };

export const getLogout = () => (dispatch: (arg0: { type: any }) => void) => {
  dispatch({ type: ReducerConstants.LOGOUT });
};



export default {};
