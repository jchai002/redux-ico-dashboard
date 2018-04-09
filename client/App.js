import React, { Component } from "react";
import "app/assets/styles/app.scss";
import Header from "app/components/Layout/Header";
import Footer from "app/components/Layout/Footer";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main className="container">{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}
