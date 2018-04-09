import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { addOwner, removeOwner, changeRequirement } from "app/actions/multisig";

@connect(
  ({ web3, multisig }) => ({
    web3,
    multisig
  }),
  { addOwner, removeOwner, changeRequirement }
)
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerToAdd: "",
      ownerToRemove: "",
      required: ""
    };
  }

  renderOwners() {
    const { owners } = this.props.multisig;
    return owners.map(owner => <div key={owner}>{owner}</div>);
  }

  render() {
    if (!this.props.multisig) {
      return null;
    }
    return (
      <div className="multisig page-wrapper">
        <Header />
        <h2>Multisig Settings</h2>
        <div className="content-wrapper">
          <div className="owners">
            <h3>Owners</h3>
            <div className="owners__content">{this.renderOwners()}</div>
          </div>
          <div className="input-row add-owner">
            <div className="form-group">
              <label>Add Owner</label>
              <input
                type="text"
                className="form-control"
                value={this.state.ownerToAdd}
                onChange={e => {
                  this.setState({ ownerToAdd: e.target.value });
                }}
              />
            </div>
            <div className="update">
              <a
                className="btn btn-primary"
                onClick={() => {
                  this.props.addOwner(this.state.ownerToAdd);
                }}
              >
                add
              </a>
            </div>
          </div>
          <div className="input-row remove-owner">
            <div className="form-group">
              <label>Remove Owner</label>
              <input
                type="text"
                className="form-control"
                value={this.state.ownerToRemove}
                onChange={e => {
                  this.setState({ ownerToRemove: e.target.value });
                }}
              />
            </div>
            <div className="update">
              <a
                className="btn btn-primary"
                onClick={() => {
                  this.props.removeOwner(this.state.ownerToRemove);
                }}
              >
                remove
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
