const blockchain = require("../services/blockchain");
const mongoose = require("mongoose");
const Transaction = mongoose.model("transactions");

async function newTransaction(req, res) {
  const { transactionHash } = req.body;
  // get mined transaction
  const transaction = await blockchain.pollForTransactionState(transactionHash);
  // check for result status before getting transactionId
  if (transaction.status === "0x0") {
    res.status(422).send("error: block failed to be mined");
  }
  try {
    // get transactionId by parsing hex number from log topics
    const transactionId = parseInt(transaction.logs[0].topics[1], 16);
    const destination = await blockchain.getDestination(transactionId);
    const amount = await blockchain.getAmount(transactionId);
    const confirmedBy = await blockchain.getConfirmations(transactionId);
    const executed = await blockchain.getExecutionStatus(transactionId);
    var dateExecuted = null;
    if (executed) {
      dateExecuted = Date.now();
    }
    var newTransaction = new Transaction({
      transactionId,
      transactionHash,
      destination,
      amount,
      confirmedBy,
      executed,
      dateSubmitted: Date.now(),
      dateExecuted: dateExecuted
    });
    await newTransaction.save();
    res.send(newTransaction);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
}

async function getTransactions(req, res) {
  const { page } = req.params;
  const results = await Transaction.paginate(
    {},
    { page, limit: 5, sort: { transactionId: -1 } }
  );
  res.send({
    transactionsOnPage: results.docs,
    pageNumber: results.page,
    totalPages: results.pages
  });
}

async function confirmTransaction(req, res) {
  const { transactionId } = req.params;
  const { transactionHash } = req.body;
  const transaction = await blockchain.pollForTransactionState(transactionHash);
  // check for result status before getting transactionId
  if (transaction.status === "0x0") {
    res.status(422).send("error: block failed to be mined");
  }
  try {
    const confirmedBy = await blockchain.getConfirmations(transactionId);
    const executed = await blockchain.getExecutionStatus(transactionId);
    var dateExecuted = null;
    if (executed) {
      dateExecuted = Date.now();
    }
    var updatedTransaction = await Transaction.findOneAndUpdate(
      {
        transactionId
      },
      {
        confirmedBy,
        executed,
        dateExecuted
      },
      { new: true }
    ).exec();
    res.send(updatedTransaction);
  } catch (err) {
    res.status(422).send(err);
  }
}

async function revokeConfirmation(req, res) {
  const { transactionId } = req.params;
  const { transactionHash } = req.body;
  const transaction = await blockchain.pollForTransactionState(transactionHash);
  // check for result status before getting transactionId
  if (transaction.status === "0x0") {
    res.status(422).send("error: block failed to be mined");
  }
  try {
    const confirmedBy = await blockchain.getConfirmations(transactionId);
    var updatedTransaction = await Transaction.findOneAndUpdate(
      {
        transactionId
      },
      {
        confirmedBy
      },
      { new: true }
    ).exec();
    res.send(updatedTransaction);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
}
module.exports = {
  newTransaction,
  getTransactions,
  confirmTransaction,
  revokeConfirmation
};
