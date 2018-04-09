import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Footer from "app/components/Layout/Footer";
import _ from "lodash";

@connect(({ account, multisig }) => ({ account, multisig }), null)
export default class Unauthorized extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.multisig &&
      _.includes(nextProps.multisig.owners, nextProps.account.address)
    ) {
      this.context.router.push("/");
    }
  }
  render() {
    return (
      <div className="unauthenticated">
        <main className="page-wrapper">
          <p>
            The current account is not authorized to use the multisig wallet
          </p>
        </main>
        <Footer />
      </div>
    );
  }
}
