import {
  GET_TOKEN_INFO_SUCCESS,
  TOKEN_UPDATE_SUCCESS,
  TOKEN_UPDATE_FAIL
} from "app/constants/ActionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_TOKEN_INFO_SUCCESS:
      return { ...state, ...action.payload };
    case TOKEN_UPDATE_SUCCESS:
      return { ...state, ...action.payload };
    case TOKEN_UPDATE_FAIL:
      return { ...state, error: true };
  }
  return state;
}
