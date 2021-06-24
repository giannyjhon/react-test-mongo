import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
    } from 'react-router-dom'
 
class NotFound extends React.Component {
  render() {
    return (
        <header>
            <div style={{width:'90%', margin: '0 auto', marginTop: '20px'}}>
        <h1>Page Not Found</h1>
        <h3>Can go to:</h3>
        <nav className="nav">
            <li><Link to="/">Orders</Link></li>
          <li><Link to="/product">Products</Link></li>
          
          {/* <Link to="/contact">Contact</Link> */}
        </nav>
        </div>
      </header>
      
    );
  }
}
 
export default NotFound;