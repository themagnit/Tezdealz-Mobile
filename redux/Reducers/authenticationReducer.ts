import { ReducerConstants } from "../../constants/Reducer";

const initialState = {
  isAuthenticated: false,
  token: "",
  user: {},
};

//sampleUse: showLoader()
export default function authenticationReducer(
  state = initialState,
  action: { type: any; data: { user: any,token: any;  } }
) {
  switch (action.type) {
    case ReducerConstants.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.data.token,
        user: action.data.user,
      };
    case ReducerConstants.LOGOUT:
      return {
        isAuthenticated: false,
        token: "",
        user: {},
      };

    default:
      return state;
  }
}
