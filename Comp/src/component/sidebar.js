import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './sidebar.css';
export default class sidebar extends Component {
  render() {
    return (
      <div className="sidenav">
     <div className= "back"> <h4 className="iocn"> Computation Database</h4></div>
      <div className="heae">
             <p><Link to= "/About">About</Link> </p>
            <p><Link to= "/customer">Search Results</Link></p> 
            </div>
      </div>
    );
  }
}

