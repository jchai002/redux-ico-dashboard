import { BLOCK_PENDING, BLOCK_CONFIRMED } from "app/constants/ActionTypes";

export default function(state = null, action) {
  if (action.type == BLOCK_PENDING || action.type == BLOCK_CONFIRMED) {
    return action.type;
  }
  return state;
}
