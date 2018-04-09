import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import account from "./accountReducer";
import token from "./tokenReducer";
import sale from "./saleReducer";
import multisig from "./multisigReducer";
import blockchain from "./blockchainReducer";

const reducer = combineReducers({
  routing: routerReducer,
  account,
  token,
  sale,
  multisig,
  blockchain
});

export default reducer;
