import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import AddProduct from './components/addProduct.component';
import EditProduct from './components/editProduct.component';
import ProductList from './components/productList';
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
                  <Link to={'/'} className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Add Products</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/productlist'} className="nav-link">Products List</Link>
                </li>
                <li className="nav-item">
              
                  <li className="nav-item">
                </li>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
          <Route exact path='/' component={ Register } />

              <Route path='/login/' component={ Login} />
              <Route path='/create' component={ AddProduct } />
              <Route path='/edit/:id' component={ EditProduct } />
              <Route path='/productlist' component={ ProductList} />
              
             


          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
