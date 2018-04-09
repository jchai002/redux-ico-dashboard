import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getMultisigInfo } from "app/actions/multisig";
import _ from "lodash";

export default function(ComposedComponent) {
  @connect(
    ({ account, multisig }) => ({
      account,
      multisig
    }),
    {
      getMultisigInfo
    }
  )
  class Authorized extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      this.props.getMultisigInfo();
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.multisig &&
        nextProps.multisig.owners.length &&
        nextProps.account.address &&
        !_.includes(nextProps.multisig.owners, nextProps.account.address)
      ) {
        this.context.router.push("/unauthorized");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return Authorized;
}
