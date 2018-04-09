const Wallet = artifacts.require("MultisigWallet.sol");

// truffle migrate --owners 0x00d1ae0a6fc13b9ecdefa118b94cf95ac16d4ab0,0x1daa654cfbc28f375e0f08f329de219fff50c765,0xc2dbc0a6b68d6148d80273ce4d6667477dbf2aa7 --required 2

module.exports = function(deployer) {
  // testrpc
  // const owners = [
  //   "0x00d1ae0a6fc13b9ecdefa118b94cf95ac16d4ab0",
  //   "0x1daa654cfbc28f375e0f08f329de219fff50c765",
  //   "0xc2dbc0a6b68d6148d80273ce4d6667477dbf2aa7"
  // ];

  // rinkeby
  const owners = [
    "0x180a0cd8858022B8E782FACD95326e4a4F0Cf8ee",
    "0xeb6402ce5dac9d4001298bc11f777eead1db3b64",
    "0x11f0cdddd75259b02418e5c116d904621632a590",
    "0x2cdb7e99ec3db8254650e72e4d87087b4dfae176"
  ];

  deployer.deploy(Wallet, owners, 3);
};
