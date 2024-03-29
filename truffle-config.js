require("dotenv").config();
require("babel-register");
require("babel-polyfill");

const HDWalletProvider = require("truffle-hdwallet-provider");

const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
  new HDWalletProvider(mnemonic, rpcEndpoint);

const infuraProvider = network =>
  providerWithMnemonic(
    process.env.MNEMONIC || "",
    `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
  );

const ropstenProvider = infuraProvider("ropsten");

const rinkebyProvider = infuraProvider("rinkeby");
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    ropsten: {
      provider: ropstenProvider,
      network_id: 3 // eslint-disable-line camelcase
    },
    testrpc: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*" // eslint-disable-line camelcase
    },
    rinkeby: {
      provider: rinkebyProvider,
      network_id: 4
    }
  }
};
