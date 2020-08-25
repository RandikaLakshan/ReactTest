import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class UserRegister extends Component {
    constructor(props) {

        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            password:'',
            fields: {},
            errors: {}
        }
    }

    onChangeFirstName(e) {
        this.setState({
            first_name: e.target.value
        })
    }
    onChangeLastName(e) {
        this.setState({
            last_name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        })
    }

        onChangePassword(e) {
            this.setState({
                password: e.target.value
            })

        }
    

    onSubmit(e) {

        e.preventDefault();
        
        if(this.state.first_name !==null || this.state.first_name!== ""){
            var re = /^[a-zA-Z]+$/;

            if(!re.test(String(this.state.first_name))){
                this.state.first_name = false;
                alert("Enter Only Letters for First Name ")
              
            }
        }
        if(this.state.last_name !==null || this.state.last_name!== ""){
            var re = /^[a-zA-Z]+$/;

            if(!re.test(String(this.state.last_name))){
                this.state.last_name = false;
                alert("Enter Only Letters for Last Name ")
              
            }
        }

        if((this.state.first_name )   &&  (this.state.last_name)){
       
        
        //check the mail whether already exists or not
        axios.get('http://localhost:4000/user/findById/'+this.state.email)
        .then(res => {console.log(res.data.status)

             if(res.data.status=='empty'){

                
               let obj = {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    phone: this.state.phone,
                    address: this.state.address,
                    password:this.state.password
                };

                  
                //registering user
                axios.post('http://localhost:4000/user/add', obj,{headers: {
                    "Authorization" : "Bearer "+sessionStorage.getItem("token")
                  }
                  })
                    .then(res =>{
                        alert("Registered Successfully !")

                        this.props.history.push('/login')
                    }
        
                    ).catch(err => {
        
                        console.log(err);
                    });
        
                this.setState({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    address: '',
                    password:''
        
        
                })

        }
        else{
                alert("This email has been used already !")
        }
    
    }
        
        ).catch(err=>{

            console.log(err);
        });

    }
    }

    render() {
        return (
            <div style={{ marginTop: 10, marginLeft: 70, marginRight: 70 }}>
                <Link to={'/login'} className="nav-link">LogIn</Link>
                <h3 align="center">Register</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name </label>
                        <input type="name"
                            required
                           
                            className="form-control"
                            value={this.state.first_name}
                            onChange={this.onChangeFirstName
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name    </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.last_name}
                            onChange={this.onChangeLastName}
                        />
                    </div>


                    <div className="form-group">
                        <label>Email  </label>
                        <input type="email"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone    </label>
                        <input
                            type="number"
                            required
                            className="form-control"
                            value={this.state.phone}
                            onChange={this.onChangePhone}
                        />
                    </div>

                    <div className="form-group">
                        <label>Address    </label>
                        <textarea  name="w3review" rows="4" cols="50"
                            required
                            className="form-control"
                            value={this.state.address}
                            onChange={this.onChangeAddress}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password    </label>
                       < input
                       type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            required
                            value="Register"
                            class="btn btn-danger btn-lg btn-block " />
                    </div>
                </form>
            </div>
        )
    }

}


