import React, { Component } from 'react'
import styled from 'styled-components';
const GridWrapper = styled.div`
font-family: 'Roboto';
  grid-gap: 10px;
  position:absolute;
  margin-top: 6em;
  margin-left: 19em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }
        fetch("/prediction/login",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            }).then(response => response.json())
            .then(response => {

                if (!response.error) {
                    console.log(response)
                    localStorage.setItem('usertoken', response.token)
                    console.log(localStorage.usertoken)
                    this.props.history.push(`/home`)
                    
                    
                    
                
                    
                }
                else { this.setState({ error: response.error }) }



                
            })
            .catch(err => {
                console.log(err)
            });

    }

    render() {
        const error = this.state.error;
        return (


            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form style={{ display: 'block' }} noValidate onSubmit={this.onSubmit}>
                        <h3>Login In</h3>

                        <div className="form-group">
                            <label>Email address :</label>
                            <input type="email" style={{}} name="email" className="form-control" placeholder="Enter email" value={this.state.email}
                                onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <label>Password :</label>
                            <input type="password" className="form-control" name="password" placeholder="Enter password" value={this.state.password}
                                onChange={this.onChange} />
                        </div>



                        <button style={{ marginTop: 50, backgroundColor: "#519e8a", borderColor: "#519e8a", }} type="submit" className="btn btn-primary btn-block" disabled={!this.state.email || !this.state.password}>Log in</button>

                    </form>
                </div>
                {
                    error === '' ? null : (<div id="error-alert">
                    
          
          
                    <span className="error">{this.state.error}</span>
             
    </div>)
                }
            </div>






        )
    }
}

export default Login