import React, { Component } from "react";
import { connect } from "react-redux";
import { getTokenInfo, toggleTransfer } from "app/actions/token";
import { BLOCK_PENDING } from "app/constants/ActionTypes";
import EthLogo from "app/assets/images/eth.png";

@connect(
  ({ token, blockchain }) => ({
    token,
    blockchain
  }),
  { getTokenInfo, toggleTransfer }
)
export default class Token extends Component {
  componentWillMount() {
    this.props.getTokenInfo();
  }
  render() {
    const {
      name,
      symbol,
      totalSupply,
      transferEnabled,
      tokenAddress,
      saleAddress
    } = this.props.token;
    const indicator =
      this.props.blockchain === BLOCK_PENDING ? (
        <img
          className="eth-logo animated infinite pulse"
          src={EthLogo}
          role="presentation"
        />
      ) : null;
    return (
      <div className="token page-wrapper">
        <h2>
          {name} Contract Overview {indicator}
        </h2>
        <div className="content-wrapper">
          <div className="token-info">
            <p>
              Token Contract Address:{" "}
              <a
                className="address"
                target="blank"
                href={`https://rinkeby.etherscan.io/address/${tokenAddress}`}
              >
                {tokenAddress}
              </a>
            </p>
            <p>
              Token Sale Contract Address:{" "}
              <a
                className="address"
                target="blank"
                href={`https://rinkeby.etherscan.io/address/${saleAddress}`}
              >
                {saleAddress}
              </a>
            </p>
            <p>Token Name: {name}</p>
            <p>Token Symbol: {symbol}</p>
            <p>Total Supply: {totalSupply}</p>
            <p>Transfer Enabled: {transferEnabled ? "yes" : "no"}</p>
          </div>
          <div className="token-control">
            <p>
              {transferEnabled
                ? "Disable all token trading, proceed with CAUTION!"
                : "Allow the token to be traded"}
            </p>
            <div className="transfer-toggle">
              <a
                className="btn btn-primary"
                onClick={() =>
                  transferEnabled
                    ? this.props.toggleTransfer("OFF")
                    : this.props.toggleTransfer("ON")
                }
              >
                {transferEnabled ? "Disable Transfer" : "Enable Transfer"}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
