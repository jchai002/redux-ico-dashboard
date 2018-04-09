import React, { Component } from "react";
import { connect } from "react-redux";
import { getSaleInfo, toggleSale, setRate } from "app/actions/sale";
import { BLOCK_PENDING } from "app/constants/ActionTypes";
import EthLogo from "app/assets/images/eth.png";

@connect(
  ({ sale, blockchain }) => ({
    sale,
    blockchain
  }),
  { getSaleInfo, toggleSale, setRate }
)
export default class Sale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 0
    };
  }
  componentWillMount() {
    this.props.getSaleInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sale) {
      const { rate } = nextProps.sale;
      this.setState({ rate });
    }
  }

  render() {
    const {
      saleAddress,
      collectionWalletAddress,
      rate,
      saleEnabled,
      etherRaised
    } = this.props.sale;
    const indicator =
      this.props.blockchain === BLOCK_PENDING ? (
        <img
          className="eth-logo animated infinite pulse"
          src={EthLogo}
          role="presentation"
        />
      ) : null;
    return (
      <div className="sale page-wrapper">
        <h2>Sale Contract Overview {indicator}</h2>
        <div className="content-wrapper">
          <div className="sale-info">
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
            <p>
              Fund Collection Wallet Address:{" "}
              <a
                className="address"
                target="blank"
                href={`https://rinkeby.etherscan.io/address/${
                  collectionWalletAddress
                }`}
              >
                {collectionWalletAddress}
              </a>
            </p>
            <p>Sale Enabled: {saleEnabled ? "yes" : "no"}</p>
            <p>Rate (tokens per ETH): {rate}</p>
            <p>Ether Raised: {etherRaised}</p>
          </div>
          <div className="sale-control">
            <p>
              {saleEnabled
                ? "Sale is currently enabled"
                : "Sale is currently disabled"}
            </p>
            <div className="sale-toggle">
              <a
                className="btn btn-primary"
                onClick={() =>
                  saleEnabled
                    ? this.props.toggleSale("OFF")
                    : this.props.toggleSale("ON")
                }
              >
                {saleEnabled ? "Disable Sale" : "Enable Sale"}
              </a>
            </div>
          </div>
          <div className="input-row rate">
            <div className="form-group">
              <label>Rate</label>
              <input
                type="text"
                className="form-control"
                value={this.state.rate}
                onChange={e => {
                  this.setState({ rate: e.target.value });
                }}
              />
            </div>
            <div className="update">
              <a
                className="btn btn-primary"
                onClick={() => {
                  this.props.setRate(this.state.rate);
                }}
              >
                update
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
