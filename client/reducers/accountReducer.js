export default function(state = { address: "" }, action) {
  switch (action.type) {
    case "web3/RECEIVE_ACCOUNT":
      return {
        ...state,
        address: action.address
      };
    case "web3/CHANGE_ACCOUNT":
      return {
        ...state,
        address: action.address
      };
  }
  return state;
}
