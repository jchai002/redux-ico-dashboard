import { getAccountAddress } from "app/util/web3";
import { getSaleInstance } from "app/util/contract";
import { promisify } from "es6-promisify";
import {
  GET_SALE_INFO_SUCCESS,
  SALE_UPDATE_SUCCESS,
  SALE_UPDATE_FAIL,
  BLOCK_PENDING,
  BLOCK_CONFIRMED
} from "app/constants/ActionTypes";
import web3Utils from "web3-utils";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });
const maxGasToPay = 300000;

export function getSaleInfo() {
  return async dispatch => {
    const sale = await getSaleInstance();
    const saleAddress = sale.address;
    const collectionWalletAddress = await promisify(sale.wallet)();
    const rate = await promisify(sale.rate)();
    const saleEnabled = await promisify(sale.saleEnabled)();
    const weiRaised = await promisify(sale.weiRaised)();
    const etherRaised = weiRaised.toNumber() / Math.pow(10, 18);

    return dispatch({
      type: GET_SALE_INFO_SUCCESS,
      payload: {
        saleAddress,
        collectionWalletAddress,
        rate: rate.toNumber(),
        saleEnabled,
        etherRaised
      }
    });
    console.log(etherRaised, "etherRaised");
  };
}

export function setConversionRate(rate) {
  return async dispatch => {};
}

export function toggleSale(state) {
  return async dispatch => {
    const sender = await getAccountAddress();
    const sale = await getSaleInstance();
    const toRun = state === "ON" ? sale.enableSale : sale.disableSale;
    toRun({ gas: maxGasToPay }, async (err, transactionHash) => {
      dispatch({ from: sender, type: BLOCK_PENDING });
      const response = await api.put("/sale/upadte", {
        transactionHash
      });
      if (response.status === 200) {
        const status = state === "ON" ? true : false;
        dispatch({
          type: SALE_UPDATE_SUCCESS,
          payload: { saleEnabled: status }
        });
      } else {
        dispatch({ type: SALE_UPDATE_FAIL });
      }
      dispatch({ type: BLOCK_CONFIRMED });
    });
  };
}

export function setRate(rate) {
  return async dispatch => {
    const sender = await getAccountAddress();
    const sale = await getSaleInstance();
    sale.setRate(rate, { gas: maxGasToPay }, async (err, transactionHash) => {
      dispatch({ from: sender, type: BLOCK_PENDING });
      const response = await api.put("/sale/upadte", {
        transactionHash
      });
      if (response.status === 200) {
        dispatch({
          type: SALE_UPDATE_SUCCESS,
          payload: { rate }
        });
      } else {
        dispatch({ type: SALE_UPDATE_FAIL });
      }
      dispatch({ type: BLOCK_CONFIRMED });
    });
  };
}
