import { getWeb3 } from "./web3";
import MultisigJson from "contracts/MultiSigWallet.json";
import TokenJson from "contracts/TestToken.json";
import SaleJson from "contracts/TokenSale.json";
import detectNetwork from "web3-detect-network";

export async function getMultisigInstance() {
  const web3 = await getWeb3();
  const network = await detectNetwork(web3.currentProvider);
  return await web3.eth
    .contract(MultisigJson.abi)
    .at(MultisigJson.networks[network.id].address);
}

export async function getTokenInstance() {
  const web3 = window.web3;
  const network = await detectNetwork(web3.currentProvider);
  return await web3.eth
    .contract(TokenJson.abi)
    .at(TokenJson.networks[network.id].address);
}

export async function getSaleInstance() {
  const web3 = window.web3;
  const network = await detectNetwork(web3.currentProvider);
  return await web3.eth
    .contract(SaleJson.abi)
    .at(SaleJson.networks[network.id].address);
}
