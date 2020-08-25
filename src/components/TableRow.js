import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Index from './productList';


class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
       /* axios.get('http://localhost:4000/product/delete/'+this.props.obj._id)
            .then(
              
            
              )
            .catch(err => console.log(err))*/
            this.props.history.push('./Index');
    }
    

  render() {
    return (
        <tr>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {this.props.obj.description}
          </td>
          <td>
            {this.props.obj.quantity}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>*/
          </td>
        </tr>
    );
  }
}

export default TableRow;