const TokenSale = artifacts.require("./TokenSale.sol");
const TestToken = artifacts.require("./TestToken.sol");

module.exports = async function() {
  const sale = await TokenSale.deployed();
  sale.addToWhitelist(["0x2Cdb7E99ec3db8254650E72E4D87087b4Dfae176"]);
};
