import { getAccountAddress } from "app/util/web3";
import { getTokenInstance } from "app/util/contract";
import { promisify } from "es6-promisify";
import {
  GET_TOKEN_INFO_SUCCESS,
  TOKEN_UPDATE_SUCCESS,
  TOKEN_UPDATE_FAIL,
  BLOCK_PENDING,
  BLOCK_CONFIRMED
} from "app/constants/ActionTypes";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });
const maxGasToPay = 300000;

export function getTokenInfo() {
  return async dispatch => {
    const token = await getTokenInstance();
    const name = await promisify(token.name)();
    const symbol = await promisify(token.symbol)();
    const totalSupply = await promisify(token.totalSupply)();
    const decimals = await promisify(token.decimals)();
    const transferEnabled = await promisify(token.transferEnabled)();
    const tokenAddress = token.address;
    const saleAddress = await promisify(token.saleAddress)();

    return dispatch({
      type: GET_TOKEN_INFO_SUCCESS,
      payload: {
        name,
        symbol,
        totalSupply: totalSupply.toNumber() / Math.pow(10, decimals),
        transferEnabled,
        tokenAddress,
        saleAddress
      }
    });
  };
}

export function toggleTransfer(state) {
  return async dispatch => {
    const sender = await getAccountAddress();
    const token = await getTokenInstance();
    const toRun = state === "ON" ? token.enableTransfer : token.disableTransfer;
    toRun({ gas: maxGasToPay }, async (err, transactionHash) => {
      dispatch({ from: sender, type: BLOCK_PENDING });
      const response = await api.put("/token/upadte", {
        transactionHash
      });
      if (response.status === 200) {
        const status = state === "ON" ? true : false;
        dispatch({
          type: TOKEN_UPDATE_SUCCESS,
          payload: { transferEnabled: status }
        });
      } else {
        dispatch({ type: TOKEN_UPDATE_FAIL });
      }
      dispatch({ type: BLOCK_CONFIRMED });
    });
  };
}
