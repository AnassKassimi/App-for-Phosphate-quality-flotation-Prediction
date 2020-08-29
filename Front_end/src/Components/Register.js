import React, { Component } from 'react'
import styled from 'styled-components';
const GridWrapper = styled.div`
font-family: 'Roboto';
  margin-top: 6em;
  margin-left: 19em;
  margin-right: 6em;
  isplay: flex;
  justify-content: center;
  flex-direction: column;
  .form-control:focus {
    border-color: #519e8a;
    box-shadow: none;
  }
  
`;

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            last_name: '',
            email: '',
            password: '',
            role: '',
            result: '',
            error: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleCancelClick = () => {

        this.setState({
            name: '',
            last_name: '',
            email: '',
            password: '',
            role: '',
            result: '',
            error: ''
        })

    }

    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            name: this.state.name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        }
        fetch("/prediction/register",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    name: newUser.name,
                    last_name: newUser.last_name,
                    email: newUser.email,
                    password: newUser.password,
                    role: newUser.role
                })
            }).then(response => response.json())
            .then(response => {

                if (!response.error) {
                    console.log(response)
                    this.setState({
                        result: response.result, name: '',
                        last_name: '',
                        email: '',
                        password: '',
                        role: '',
                        error: ''
                    })





                }
                else {
                    this.setState({
                        error: response.error,
                        result: ''
                    })
                }




            })
            .catch(err => {
                console.log(err)
            });


    }

    render() {
        const error = this.state.error
        const result = this.state.result
        const options = [
            { "name": "Agent de Contrôle" },
            { "name": "Ingénieur de Process" }
        ].map(option =>
            <option value={option.name}>{option.name}</option>);
        
    
    return (
            <GridWrapper>
                <div className="register-inner">

                    <form style={{ display: 'block' }} noValidate onSubmit={this.onSubmit}>
                        <h3>Ajout d'un nouveau utilisateur</h3>
                        <div className="form-group">
                            <label htmlFor="name">Prénom :</label>
                            <input type="text"
                                className="form-control"
                                name="name"

                                value={this.state.name}
                                onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label className='label' htmlFor="last_name">Nom :</label>
                            <input type="text"
                                className="form-control"
                                name="last_name"

                                value={this.state.last_name}
                                onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Address Email :</label>
                            <input type="test"
                                className="form-control"
                                name="email"

                                value={this.state.email}
                                onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de Passe : </label>
                            <input type="test"
                                className="form-control"
                                name="password"

                                value={this.state.password}
                                onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Rôle : </label>
                            <select
                                
                                className="form-control"
                                name="role"

                                value={this.state.role}
                                onChange={this.onChange} >

                                <option value="">Selectionner un rôle</option>
                                {options}
                            
                </select>

            </div>
                    <div style={{ marginTop: 50, marginLeft: 250 }}>
                        <button disabled={!this.state.name || !this.state.last_name || !this.state.email || !this.state.password || !this.state.role} type="submit" className="btn btn-lg btn-primary " style={{ backgroundColor: "#519e8a", marginRight: 20, borderColor: "#519e8a" }}>
                            Inscrire
                            </button>
                        <button type="reset" className="btn btn-lg btn-primary " style={{ backgroundColor: "grey", marginLeft: 20, borderColor: "grey" }} onClick={this.handleCancelClick}> Annuler</button>
                    </div>


        </form>
    </div>
{
            error === '' ? null : (<div id="error-alert">



                <span className="error">{this.state.error}</span>

            </div>)
        }
        {
            result === '' ? null : (<div style={{ marginTop: 20, }} id="success-alert">



                <span className="success">{this.state.result}</span>

            </div>)
        }


            </GridWrapper >
        )
    }
}

export default Register