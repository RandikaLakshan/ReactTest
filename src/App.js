import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/addProduct.component';
import Edit from './components/editProduct.component';
import Index from './components/productList';
import  Register from './components/userRegister';
import Login from './components/login.compnent';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/register'} className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Index</Link>
                </li>
                <li className="nav-item">
              
                  <li className="nav-item">
                </li>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
          <Route exact path='/register' component={ Register } />

              <Route path='/login/' component={ Login} />
              <Route path='/create' component={ Create } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index} />
              
             


          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
