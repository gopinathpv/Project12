import React, { Component } from 'react';
import './App.css';
import Customer from './component/customer/customer'
import Sidebar from './component/sidebar'
import Header from './component/header'
import About from './component/About'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
          <div className="App">
      <Header/>
      <Sidebar/>
      <Route path="/About" component={About} />
      <Route path="/customer" component={Customer} />
       {/* <Customer />  */}
      </div>
      </Router>
    
    );
  }
}

export default App;
