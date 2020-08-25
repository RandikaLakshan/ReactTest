import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class ProductsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: [],
      user_id: sessionStorage.getItem("userId")

    }
    this.delete = this.delete.bind(this);

    //logged user added products
    axios.get('http://localhost:4000/product/' + this.state.user_id, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    }
    ).then(response => {
      console.log(response)
      this.setState({ product: response.data }

      )

    })
  }



  componentDidMount() {



    if (!sessionStorage.getItem("token")) {
      alert("please login")
      this.props.history.push('/login/')
    }


    //products loading when the page load
    this.loadProducts();
  }

  loadProducts() {
    axios.get('http://localhost:4000/product/' + this.state.user_id, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    }
    ).then(response => {
      console.log(response)
      this.setState({ product: response.data }

      )

    })
   
  }

  delete(e) {

    //delete a product
    axios.get('http://localhost:4000/product/delete/' + e.target.id, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    }
    )
      .then(res => {
        //load the array map again to show after delete
        this.loadProducts();


      })

      .catch(function (error) {
        console.log(error);
      })



  }
  logOut() {

    sessionStorage.clear();
    this.props.history.push('/login/')
  }

  render() {
    if(this.state.product.length==0){
      return(
        <div>
        <Link to={'/login'} className="nav-link" onClick={this.logOut}>Log Out</Link>

          <h1 align="center">No Products from you</h1>
          <p align="center">Hi !,      {sessionStorage.getItem("userFirstName")}</p>
        
        </div>
      )
    }else{
    return (
      <div>
        <Link to={'/login'} className="nav-link" onClick={this.logOut}>Log Out</Link>
        <h3 align="center">product List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Product Quantity</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>

          <tbody>
            {
              //display products in the view
              this.state.product.map((object, i) => {
                return (
                  <tr>
                    <td>
                      {object.name}
                    </td>
                    <td>
                      {object.description}
                    </td>
                    <td>
                      {object.quantity}
                    </td>
                    <td>
                      <Link to={"/edit/" + object._id} className="btn btn-primary">Edit</Link>
                    </td>

                    <td>
                      <button onClick={this.delete} id={object._id} className="btn btn-danger">Delete</button>
                    </td>
                    <td>

                    </td>
                  </tr>
                )

              })
            }

          </tbody>
        </table>
      </div>
    );
          }
  }
}