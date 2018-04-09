const express = require("express");
const routes = express.Router();
const multisig = require("./controllers/multisig");
const blockchain = require("./services/blockchain");

async function respondWithTxStatus(req, res) {
  const { transactionHash } = req.body;
  const transaction = await blockchain.pollForTransactionState(transactionHash);
  if (transaction.status === "0x0") {
    return res.status(422).send("error: block failed to be mined");
  }
  if (transaction.status === "0x1") {
    return res.sendStatus(200);
  }
}

// multisig
routes.put("/transactions/:transactionId/confirm", multisig.confirmTransaction);
routes.put("/transactions/:transactionId/revoke", multisig.revokeConfirmation);
routes.get("/transactions/:page", multisig.getTransactions);
routes.post("/transactions", multisig.newTransaction);

// token
routes.put("/token/upadte", respondWithTxStatus);

// sale
routes.put("/sale/upadte", respondWithTxStatus);

module.exports = routes;
