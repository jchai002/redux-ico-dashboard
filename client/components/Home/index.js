import React, { Component } from "react";
import { Link } from "react-router";

export default class Home extends Component {
  render() {
    return (
      <div className="home page-wrapper">
        <div className="content-wrapper">
          <div>
            <Link className="btn btn-primary" to={"/token"}>
              Token Overview
            </Link>
          </div>
          <div>
            <Link className="btn btn-primary" to={"/sale"}>
              Sale Overview
            </Link>
          </div>
          <div>
            <Link className="btn btn-primary" to={"/multisig"}>
              Multisig Vault
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
