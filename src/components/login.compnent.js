import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {

            email: '',
            password: ''

        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }


    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault()
        let obj = {
            email: this.state.email,
            password: this.state.password
        };



        //checking user authentication
        axios.post('http://localhost:4000/login/loginUser', obj).then(res => {
            if (!res.data.message) {
                sessionStorage.setItem("userId", res.data.userId);
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("userEmail", res.data.email)
                sessionStorage.setItem("userFirstName", res.data.first_name)

                this.props.history.push('/ProductList');
            }
            else if (res.data.message == "Invalid Email") {

                alert("Invalid Email")
            }
            else if (res.data.message == "Password is incorrect") {

                alert("Password is incorrect")
            }

        })
            .catch(err => {
                console.log(err)
            })

    }



    render() {
        return (
            <div style={{ marginTop: 10, marginLeft: 70, marginRight: 70 }}>
                <h3 align="center">Log IN</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password    </label>
                        <input
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
                            value="      Log In        "
                            class="btn btn-primary btn-lg " />
                    </div>


                </form>
            </div>
        )
    }
}