import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

@connect(({ multisig }) => ({ multisig }), null)
export default class Header extends Component {
  render() {
    var etherBalance = this.props.multisig.etherBalance
      ? this.props.multisig.etherBalance.toFixed(3)
      : 0;
    return (
      <header>
        <div className="multisig-header">
          <div className="info">
            Multisig Balance: <span className="amount">{etherBalance}</span>
          </div>
          <div className="info">
            <a
              href={`https://rinkeby.etherscan.io/address/${
                this.props.multisig.address
              }`}
              target="_blank"
              className="address"
            >
              {this.props.multisig.address}
            </a>
          </div>
          <div className="links">
            <Link to="/multisig">NewTx</Link>
            <Link to="/multisig/transactions">Transactions</Link>
            <Link to="/multisig/settings">Settings</Link>
          </div>
        </div>
      </header>
    );
  }
}
