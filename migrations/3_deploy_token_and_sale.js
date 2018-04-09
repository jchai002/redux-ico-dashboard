const TestToken = artifacts.require("./TestToken.sol");
const TokenSale = artifacts.require("./TokenSale.sol");

module.exports = function(deployer, network, accounts) {
  // const wallet = accounts[0];
  const wallet = "0x11f0cdddd75259b02418e5c116d904621632a590";
  deployer.deploy(TestToken).then(async () => {
    const token = await TestToken.deployed();
    return deployer.deploy(TokenSale, token.address, wallet);
  });
};
