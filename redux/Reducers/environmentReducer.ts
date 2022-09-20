import { endPoints } from "../../constants/Environment";
const initialState = {
  ...endPoints,
};

export default function environmentReducer(state = initialState, action) {
  return state;
}
