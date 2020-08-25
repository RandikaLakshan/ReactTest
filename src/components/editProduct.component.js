import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class EditProducts extends Component {
  constructor(props) {
    super(props);
    this.onChangeproductName = this.onChangeproductName.bind(this);
    this.onChangeproductDescription = this.onChangeproductDescription.bind(this);
    this.onChangeproductQuantity = this.onChangeproductQuantity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      product_name: '',
      product_description: '',
      product_quantity: ''
    }
  }

  componentDidMount() {
    //get the selected product's details
    axios.get('http://localhost:4000/product/edit/' + this.props.match.params.id, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(response => {
        this.setState({
          product_name: response.data.name,
          product_description: response.data.description,
          product_quantity: response.data.quantity
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  onChangeproductName(e) {
    this.setState({
      product_name: e.target.value
    })
  }

  onChangeproductDescription(e) {
    this.setState({
      product_description: e.target.value
    });
  }

  onChangeproductQuantity(e) {
    this.setState({
      product_quantity: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    let obj = {
      name: this.state.product_name,
      description: this.state.product_description,
      quantity: this.state.product_quantity
    };

    //selected product details are updated
    axios.post('http://localhost:4000/product/update/' + this.props.match.params.id, obj, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res.data)

        alert("Successfully updated !")
      }

      ).catch(err => {

        console.log(err);
      });

    this.props.history.push('/ProductList/');
  }

  logOut() {

    sessionStorage.clear();
    this.props.history.push('/login/')
  }

  render() {
    return (

      <div style={{ marginTop: 10 }}>

        <Link to={'/login/'} className="nav-link" onClick={this.logOut}>Log Out</Link>

        <h3 align="center">Product  Name</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Product Name:  </label>
            <input
              type="text"
              className="form-control"
              required
              value={this.state.product_name}
              onChange={this.onChangeproductName}
            />
          </div>

          <div className="form-group">
            <label>product Description: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.product_description}
              onChange={this.onChangeproductDescription}
            />
          </div>
          <div className="form-group">
            <label>Product Quantity: </label>
            <input type="number"
              className="form-control"
              required
              value={this.state.product_quantity}
              onChange={this.onChangeproductQuantity}
            />
          </div>
          <div className="form-group">
            <input type="submit"
              value="Update product"
              required
              className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}