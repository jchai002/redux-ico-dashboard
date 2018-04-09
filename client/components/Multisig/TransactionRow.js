import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import _ from "lodash";
import web3Utils from "web3-utils";
import { confirmTransaction, revokeConfirmation } from "app/actions/multisig";
import { BLOCK_PENDING } from "app/constants/ActionTypes";

@connect(({ account, blockchain }) => ({ account, blockchain }), {
  confirmTransaction,
  revokeConfirmation
})
export default class TransactionRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsCss: "hidden"
    };
  }

  render() {
    const {
      transactionId,
      destination,
      amount,
      dateSubmitted,
      dateExecuted,
      confirmedBy,
      executed
    } = this.props;
    const currentAccountAddress = this.props.account.address;
    var button = (
      <button className="btn btn-primary disabled" disabled>
        N/A
      </button>
    );

    if (!executed) {
      if (_.includes(confirmedBy, currentAccountAddress)) {
        button = (
          <button
            className={`btn btn-primary ${
              this.props.blockchain === BLOCK_PENDING ? "disabled" : ""
            }`}
            onClick={() => this.props.revokeConfirmation(transactionId)}
          >
            Revoke
          </button>
        );
      } else {
        button = (
          <button
            className={`btn btn-primary ${
              this.props.blockchain === BLOCK_PENDING ? "disabled" : ""
            }`}
            onClick={() => this.props.confirmTransaction(transactionId)}
          >
            Confirm
          </button>
        );
      }
    }

    const executionStatus = executed ? "Executed" : "Pending";

    var confirmedByDisplay = [];
    confirmedBy.map(addr => {
      addr === currentAccountAddress
        ? confirmedByDisplay.push("current address")
        : confirmedByDisplay.push(addr);
    });
    return (
      <div key={transactionId} className="row table-row">
        <div className="col-12 col-lg-1">{transactionId}</div>
        <div className="col-12 col-lg-1">
          {web3Utils.fromWei(String(amount), "ether")}
        </div>
        <div className="col-12 col-lg-6">{destination}</div>
        <div className="col-12 col-lg-1">{executionStatus}</div>
        <div className="col-12 col-lg-2">{button}</div>
        <div className="col-12 col-lg-1 details">
          {" "}
          <i
            className="info material-icons"
            onClick={() =>
              this.state.detailsCss === "hidden"
                ? this.setState({ detailsCss: "show" })
                : this.setState({ detailsCss: "hidden" })
            }
          >
            info_outline
          </i>
          <div className={`details__display ${this.state.detailsCss}`}>
            <p>
              Submission Date:
              <span className="highlight">
                {" "}
                {moment(dateSubmitted).format("DD MMM YYYY")}
              </span>
            </p>
            <p>
              Execution Date:{" "}
              <span className="highlight">
                {dateExecuted
                  ? moment(dateExecuted).format("DD MMM YYYY")
                  : "N/A"}
              </span>
            </p>
            <div>
              <p>Confirmed By:</p>{" "}
              {confirmedByDisplay.map(addr => (
                <p key={addr} className="highlight">
                  {addr}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
