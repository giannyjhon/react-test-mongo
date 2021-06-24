import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
 
import "./App.css";
import Header from "./components/views/header";
//import Footer from "./components/Footer";
 
import Order from "./components/views/Order";
import Product from "./components/views/Product";
import NotFound from "./components/views/NotFound";
 
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <Header /> */}
 
          <Switch>
            <Route exact path="/" component={Order} />
            <Route exact path="/order" component={Order} />
            <Route path="/product" component={Product} />
            <Route component={NotFound} />
          </Switch>
 
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}
 
export default App;