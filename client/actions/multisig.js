import { getAccountAddress, getEtherBalance } from "app/util/web3";
import { getMultisigInstance } from "app/util/contract";
import {
  GET_MULTISIG_INFO_SUCCESS,
  GET_MULTISIG_INFO_FAIL,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  SUBMIT_TRANSACTION_SUCCESS,
  SUBMIT_TRANSACTION_FAIL,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  BLOCK_PENDING,
  BLOCK_CONFIRMED
} from "app/constants/ActionTypes";
import { promisify } from "es6-promisify";
import web3Utils from "web3-utils";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });

const maxGasToPay = 300000;

export function getMultisigInfo() {
  return async dispatch => {
    try {
      const multisig = await getMultisigInstance();
      let address = multisig.address;
      let owners = await promisify(multisig.getOwners)();
      let etherBalance = await getEtherBalance(address);
      console.log(await promisify(multisig.required)());
      dispatch({
        type: GET_MULTISIG_INFO_SUCCESS,
        payload: {
          address,
          etherBalance,
          owners
        }
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: GET_MULTISIG_INFO_FAIL
      });
    }
  };
}

export function submitTransaction(destination, amount) {
  return async dispatch => {
    const sender = await getAccountAddress();
    const multisig = await getMultisigInstance();
    multisig.submitTransaction(
      destination,
      web3Utils.toWei(amount, "ether"),
      "",
      {
        from: sender,
        gas: maxGasToPay
      },
      async (err, transactionHash) => {
        dispatch({ type: BLOCK_PENDING });
        const response = await api.post("/transactions", { transactionHash });
        if (response.status === 200) {
          dispatch({
            type: SUBMIT_TRANSACTION_SUCCESS,
            payload: response.data
          });
        } else {
          dispatch({ type: SUBMIT_TRANSACTION_FAIL });
        }
        dispatch({ type: BLOCK_CONFIRMED });
      }
    );
  };
}

export function confirmTransaction(transactionId) {
  return async dispatch => {
    const sender = await getAccountAddress();
    const multisig = await getMultisigInstance();
    multisig.confirmTransaction(
      transactionId,
      {
        from: sender,
        gas: maxGasToPay
      },
      async (err, transactionHash) => {
        dispatch({ type: BLOCK_PENDING });
        const response = await api.put(
          `/transactions/${transactionId}/confirm`,
          {
            transactionHash
          }
        );
        if (response.status === 200) {
          dispatch({
            type: UPDATE_TRANSACTION_SUCCESS,
            payload: response.data
          });
        } else {
          dispatch({ type: UPDATE_TRANSACTION_FAIL });
        }
        dispatch({ type: BLOCK_CONFIRMED });
      }
    );
  };
}

export function revokeConfirmation(transactionId) {
  return async dispatch => {
    const sender = await getAccountAddress();
    const multisig = await getMultisigInstance();
    multisig.revokeConfirmation(
      transactionId,
      {
        from: sender,
        gas: maxGasToPay
      },
      async (err, transactionHash) => {
        dispatch({ type: BLOCK_PENDING });
        const response = await api.put(
          `/transactions/${transactionId}/revoke`,
          {
            transactionHash
          }
        );
        if (response.status === 200) {
          dispatch({
            type: UPDATE_TRANSACTION_SUCCESS,
            payload: response.data
          });
        } else {
          dispatch({ type: UPDATE_TRANSACTION_FAIL });
        }
        dispatch({ type: BLOCK_CONFIRMED });
      }
    );
  };
}

export function addOwner(address) {
  return async dispatch => {
    const sender = await getAccountAddress();
    const multisig = await getMultisigInstance();
    const addOwnerEncoded = multisig.addOwner.getData(address);
    multisig.submitTransaction(
      multisig.address,
      0,
      addOwnerEncoded,
      {
        from: sender,
        gas: maxGasToPay
      },
      async (err, transactionHash) => {
        dispatch({ type: BLOCK_PENDING });
        const response = await api.post("/transactions", { transactionHash });
        if (response.status === 200) {
          dispatch({
            type: SUBMIT_TRANSACTION_SUCCESS,
            payload: response.data
          });
        } else {
          dispatch({ type: SUBMIT_TRANSACTION_FAIL });
        }
        dispatch({ type: BLOCK_CONFIRMED });
      }
    );
  };
}

export function changeRequirement(number) {
  return async dispatch => {
    const sender = await getAccountAddress();
    const multisig = await getMultisigInstance();
    const changeRequirementEncoded = multisig.changeRequirement.getData(number);
    multisig.submitTransaction(
      multisig.address,
      0,
      changeRequirementEncoded,
      {
        from: sender,
        gas: maxGasToPay
      },
      async (err, transactionHash) => {
        dispatch({ type: BLOCK_PENDING });
        const response = await api.post("/transactions", { transactionHash });
        if (response.status === 200) {
          dispatch({
            type: SUBMIT_TRANSACTION_SUCCESS,
            payload: response.data
          });
        } else {
          dispatch({ type: SUBMIT_TRANSACTION_FAIL });
        }
        dispatch({ type: BLOCK_CONFIRMED });
      }
    );
  };
}

export function removeOwner(address) {
  return async dispatch => {
    const sender = await getAccountAddress();
    const multisig = await getMultisigInstance();
    const removeOwnerEncoded = multisig.removeOwner.getData(address);
    multisig.submitTransaction(
      multisig.address,
      0,
      removeOwnerEncoded,
      {
        from: sender,
        gas: maxGasToPay
      },
      async (err, transactionHash) => {
        dispatch({ type: BLOCK_PENDING });
        const response = await api.post("/transactions", { transactionHash });
        if (response.status === 200) {
          dispatch({
            type: SUBMIT_TRANSACTION_SUCCESS,
            payload: response.data
          });
        } else {
          dispatch({ type: SUBMIT_TRANSACTION_FAIL });
        }
        dispatch({ type: BLOCK_CONFIRMED });
      }
    );
  };
}

export function getTransactions(page) {
  return async dispatch => {
    const response = await api.get("/transactions/" + Number(page));
    if (response.status === 200) {
      return dispatch({
        type: GET_TRANSACTIONS_SUCCESS,
        payload: response.data
      });
    } else {
      return dispatch({ type: GET_TRANSACTIONS_FAIL });
    }
  };
}
