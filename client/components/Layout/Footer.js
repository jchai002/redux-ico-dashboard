import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "app/assets/images/logo.png";

@connect(({ account }) => ({ account }), null)
export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="branding">
          <img className="logo" role="presentation" src={Logo} />
          <p>copyright© {new Date().getFullYear()}, Estates Digital.</p>
        </div>
        <div className="account">
          <span>Current Account:</span>
          <span className="address"> {this.props.account.address}</span>
        </div>
      </footer>
    );
  }
}
