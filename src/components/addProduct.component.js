import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeproductName = this.onChangeproductName.bind(this);
    this.onChangeproductDescription = this.onChangeproductDescription.bind(this);
    this.onChangeproductQuantity = this.onChangeproductQuantity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      product_name: '',
      person_description: '',
      product_quantity:'',
      user_id:sessionStorage.getItem("userId")
    }
  }

  componentDidMount(){

    if (!sessionStorage.getItem("token")) {
      alert("please login")
      this.props.history.push('/login/')
    }
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
    const obj = {
     name: this.state.product_name,
     description: this.state.product_description,
     quantity: this.state.product_quantity,
     user_id:this.state.user_id
    };

  

    //add products
    axios.post('http://localhost:4000/product/add', obj,{headers: {
      "Authorization" : "Bearer "+sessionStorage.getItem("token")
    }
    })
        .then(res => {
          //alert(sessionStorage.getItem("token"))
          console.log(res.data)

         
          
          alert("successfully added !")
          
        }
          ).catch(error=>{

            console.log(error);
          });
    
    this.setState({
      product_name: '',
      product_description: '',
      product_quantity: '',
     

    })
  }
logOut(){

  sessionStorage.clear();
  this.props.history.push('/login/')
}
 
 
  render() {
    return (
      

        <div style={{ marginTop: 10 }}>
          <Link to={'/login/'} className="nav-link" onClick={this.logOut}>Log Out</Link>
            <h3 align="center">Add New product</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                    <label>product Name: </label>
                    <input type="text" 
                    required
                      className="form-control"
                      value={this.state.product_name}
                      onChange={this.onChangeproductName

                      }
                      />
                </div>
                <div className="form-group">
                    <label>Product Description:  </label>
                    <input 
                      type="text" 
                      required
                      className="form-control" 
                      value={this.state.product_description}
                      onChange={this.onChangeproductDescription}
                      />
                </div>
                
                <div className="form-group">
                    <label>Quantity: </label>
                    <input type="number" 
                    required
                      className="form-control"
                      value={this.state.product_quantity}
                      onChange={this.onChangeproductQuantity}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                    required
                      value="Add a product" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}