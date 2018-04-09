import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransactions } from "app/actions/multisig";
import { Link } from "react-router";
import { BLOCK_PENDING } from "app/constants/ActionTypes";
import TransactionRow from "./TransactionRow";
import Header from "./Header";
import EthLogo from "app/assets/images/eth.png";

@connect(
  ({ multisig, account, blockchain }) => ({ multisig, account, blockchain }),
  {
    getTransactions
  }
)
export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: ""
    };
  }

  componentWillMount() {
    var { page } = this.props.routeParams;
    page = page || "1";
    this.props.getTransactions(page);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeParams.page !== nextProps.routeParams.page) {
      var { page } = nextProps.routeParams;
      this.props.getTransactions(page);
    }
  }

  renderTransactions = () =>
    this.props.multisig.transactionsOnPage.map(transaction => {
      return (
        <TransactionRow key={transaction.transactionId} {...transaction} />
      );
    });

  render() {
    if (!this.props.multisig) return null;
    const pageNumber = Number(this.props.multisig.pageNumber);
    const totalPages = Number(this.props.multisig.totalPages);
    const indicator =
      this.props.blockchain === BLOCK_PENDING ? (
        <img
          className="eth-logo animated infinite pulse"
          src={EthLogo}
          role="presentation"
        />
      ) : null;
    return (
      <div className="multisig transactions page-wrapper">
        <Header />
        <h2>Transactions {indicator}</h2>
        <div className="table-header">
          <div className="row">
            <div className="col-12 col-lg-1">Tx ID</div>
            <div className="col-12 col-lg-1">Amount</div>
            <div className="col-12 col-lg-6">Destination</div>
            <div className="col-12 col-lg-1">Status</div>
            <div className="col-12 col-lg-2">Action</div>
            <div className="col-12 col-lg-1">Details</div>
          </div>
        </div>
        <div className="table-body">
          <div className="transactions">{this.renderTransactions()}</div>
        </div>
        <div className="table-footer">
          <Link
            className={pageNumber === 1 ? "disabled" : ""}
            to={"/multisig/transactions/" + String(pageNumber - 1)}
          >
            {"< Newer"}
          </Link>
          <Link
            className={pageNumber === totalPages ? "disabled" : ""}
            to={"/multisig/transactions/" + String(pageNumber + 1)}
          >
            {"Older >"}
          </Link>
        </div>
      </div>
    );
  }
}
