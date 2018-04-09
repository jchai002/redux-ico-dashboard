const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER)
);
const Wallet = require("../../build/contracts/MultiSigWallet.json");
const _ = require("lodash");
const detectNetwork = require("web3-detect-network");

async function getWallet() {
  const network = await detectNetwork(web3.currentProvider);
  return await web3.eth
    .contract(Wallet.abi)
    .at(Wallet.networks[network.id].address);
}

async function getTransactionCount() {
  const wallet = await getWallet();
  return await wallet.getTransactionCount();
}

async function getConfirmations(transactionId) {
  const wallet = await getWallet();
  return await wallet.getConfirmations(transactionId);
}

async function getDestination(transactionId) {
  const wallet = await getWallet();
  const transaction = await wallet.transactions(transactionId);
  return transaction[0];
}

async function getAmount(transactionId) {
  const wallet = await getWallet();
  const transaction = await wallet.transactions(transactionId);
  return transaction[1].toNumber();
}

async function getExecutionStatus(transactionId) {
  const wallet = await getWallet();
  const transaction = await wallet.transactions(transactionId);
  return transaction[3];
}

function getTransanctionStatus(tx) {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionReceipt(tx, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
}

function pollForTransactionState(tx) {
  return new Promise(async function poll(resolve) {
    var result = await getTransanctionStatus(tx);
    // if the transaction is not mined
    if (!result || !result.blockNumber) {
      // recursive call to poll again
      console.log("Re-trying with hash", tx);
      setTimeout(poll.bind(null, resolve), 3000);
    } else {
      // otherwise stop polling and resolve
      resolve(result);
    }
  });
}

function getParamFromTxEvent(transaction, paramName, eventName) {
  let logs = transaction.logs;
  if (eventName != null) {
    logs = logs.filter(l => l.event === eventName);
  }
  return logs[0].args[paramName];
}

module.exports = {
  pollForTransactionState,
  getParamFromTxEvent,
  getWallet,
  getAmount,
  getDestination,
  getConfirmations,
  getExecutionStatus,
  getTransactionCount
};
