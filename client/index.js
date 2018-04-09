import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { Web3Provider } from "react-web3";
import { syncHistoryWithStore } from "react-router-redux";

import requireAuth from "./components/HOC/require_auth";

// Layouts
import App from "App";
import Home from "app/components/Home";
import MultisigNewTransactionForm from "app/components/Multisig/NewTransactionForm";
import MultisigTransactions from "app/components/Multisig/Transactions";
import MultisigSettings from "app/components/Multisig/Settings";
import Token from "app/components/Token";
import Sale from "app/components/Sale";
import Unauthorized from "app/components/Error/Unauthorized";

// Redux Store
import store from "store";

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Web3Provider>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
        </Route>
        <Route path="/multisig" component={App}>
          <IndexRoute component={requireAuth(MultisigNewTransactionForm)} />
          <Route
            exact
            path="/multisig/settings"
            component={requireAuth(MultisigSettings)}
          />
          <Route
            exact
            path="/multisig/transactions"
            component={requireAuth(MultisigTransactions)}
          />
          <Route
            path="/multisig/transactions/:page"
            component={requireAuth(MultisigTransactions)}
          />
          <Route path="/token" component={requireAuth(Token)} />
          <Route path="/sale" component={requireAuth(Sale)} />
        </Route>
        <Route path="/unauthorized" component={Unauthorized} />
      </Router>
    </Web3Provider>
  </Provider>,
  document.getElementById("root")
);
