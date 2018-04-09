import {
  GET_SALE_INFO_SUCCESS,
  SALE_UPDATE_SUCCESS,
  SALE_UPDATE_FAIL
} from "app/constants/ActionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SALE_INFO_SUCCESS:
      return { ...state, ...action.payload };
    case SALE_UPDATE_SUCCESS:
      return { ...state, ...action.payload };
    case SALE_UPDATE_FAIL:
      return { ...state, error: true };
  }
  return state;
}
