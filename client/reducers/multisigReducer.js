import {
  GET_MULTISIG_INFO_SUCCESS,
  GET_MULTISIG_INFO_FAIL,
  GET_TRANSACTIONS_SUCCESS,
  UPDATE_TRANSACTION_SUCCESS
} from "app/constants/ActionTypes";
import _ from "lodash";

export default function(
  state = {
    contractFound: null,
    address: "",
    etherBalance: 0,
    owners: [],
    required: 0,
    transactionsOnPage: [],
    pageNumber: 0,
    totalPages: 0
  },
  action
) {
  switch (action.type) {
    case GET_MULTISIG_INFO_SUCCESS:
      return { ...state, contractFound: true, ...action.payload };
    case GET_MULTISIG_INFO_FAIL:
      return { ...state, contractFound: false };
    case GET_TRANSACTIONS_SUCCESS:
      return { ...state, ...action.payload };
    case UPDATE_TRANSACTION_SUCCESS:
      const { transactionId } = action.payload;
      const indexToUpdate = _.findIndex(state.transactionsOnPage, {
        transactionId
      });
      var transactionsOnPage = [...state.transactionsOnPage];
      transactionsOnPage[indexToUpdate] = action.payload;
      return {
        ...state,
        transactionsOnPage,
        pageNumber: state.pageNumber,
        totalPages: state.totalPages
      };
  }
  return state;
}
