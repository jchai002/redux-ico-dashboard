const TokenSale = artifacts.require("./TokenSale.sol");
const TestToken = artifacts.require("./TestToken.sol");

module.exports = function(deployer, network, accounts) {
  setupContracts(deployer, accounts);
};

async function setupContracts(deployer, accounts) {
  // const owner = "0x11f0cdddd75259b02418e5c116d904621632a590";
  const token = await TestToken.deployed();
  const sale = await TokenSale.deployed();
  const totalSupply = new web3.BigNumber(web3.toWei(100000000, "ether"));
  await token.setTotalSupply(totalSupply);
  await token.setSaleAddress(sale.address);
  await token.allocateToSale();
}

// Using network 'rinkeby'.
//
// Running migration: 1_initial_migration.js
//   Replacing Migrations...
//   ... 0xa73cc16edb5ef0b543745e17dc88a5200b7e46287fa9730a66489c085ac1d0b5
//   Migrations: 0x61b341694ef409de31284b173707bbbe4192c725
// Saving successful migration to network...
//   ... 0xc17e8abddd13d1ca12d46a84a5071110ee57287b50d29c117d8e93babc21f11c
// Saving artifacts...
// Running migration: 2_deploy_token_and_sale.js
//   Replacing TestToken...
//   ... 0x3017507104f7840d50f425a2873f5e4ba6c8250db52f61e276fa948e9eeb9419
//   TestToken: 0x67f0d80c8661f0eb38f6871dc64ff2e73f316a5d
//   Replacing TokenSale...
//   ... 0x1c8ead0a3194a187c5fc128cbf7798379c32700b1f69aeb3121e6a859c1a6a01
//   TokenSale: 0x7582d0239011dfcc1629265ba3ffd20e5b72456e
// Saving successful migration to network...
//   ... 0xd05e015c2204e732331fdcc70cdc046589ede544c0a0ec6174b7e2bea34c1f91
// Saving artifacts...
// Running migration: 3_deploy_multisig.js
//   Replacing MultiSigWallet...
//   ... 0x4aecd7270752534cea8edc2037ada872f4c4c0e53e3ccf1666bc1a3d657ed76f
//   MultiSigWallet: 0xd6332bd9e868a7c09c4d00481085d49090c93cc9
// Saving successful migration to network...
//   ... 0x7604ab2a560f25f93a0cebe97341ff3179570e7bebc0f973c4217248f48c1b3b
// Saving artifacts...
// Running migration: 4_token_setup.js
// Saving successful migration to network...
//   ... 0x41b3ba4fe5da9151d928c2ab3f4402e30a450bef1448c88dfe8ae9a3b49dd372
//   ... 0xc14d39e1aea2319f3930ce2a4333970054a1d16e3b0da109623d15440be104ca
// Saving artifacts...
//   ... 0x65967c869cf7c3b5432c7caf4beba116195ae893085828edaedb0a538fd6a94c
//   ... 0xb40c1748473b4a63380f6189d1f811c3c145398409063b1c5a146a9f1e5b50bb
