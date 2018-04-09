function getParamFromTxEvent(transaction, paramName, eventName) {
  let logs = transaction.logs;
  if (eventName != null) {
    logs = logs.filter(l => l.event === eventName);
  }
  return logs[0].args[paramName];
}
module.exports = { getParamFromTxEvent, respondWithTxStatus };
