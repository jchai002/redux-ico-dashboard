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
        <div className="nav-desktop">
          <div className="info">
            <div className="logo">
              <h5>
                <Link to={"/"}>ICO Dashboard</Link>
              </h5>
            </div>
          </div>
          <div className="menu">
            <Link to="/token">Token</Link>
            <Link to="/sale">Sale</Link>
            <Link to="/multisig">Multisig</Link>
          </div>
        </div>
      </header>
    );
  }
}
