
import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, } from 'react-bootstrap';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode'
import { withRouter } from 'react-router-dom'


const Styles = styled.div`
  .navbar { background-color: white;
    z-index: 1000;
    font-family: 'Roboto';
    margin: auto; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #519e8a;
    font-weight: bold;
    &:hover  { color:#616263; };
    &:focus  { color:#519e8a; }
  }
  .navbar-brand {
    font-size: 1.4em;
    font-weight: bold;
    color: #006400;
    &:hover { color: white; }
  }
  basic-navbar-nav{}
  
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;
class NavigationBar extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      last_name: ''
    }
  }

  componentDidMount() {
    if (localStorage.usertoken) {
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      this.setState({
        name: decoded.identity.name,
        last_name: decoded.identity.last_name

      })
    }
  }

  handleLogOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)

  }

  render() {
    return (<Styles>
      <Navbar fixed="top" >

        <Navbar.Brand href="/">
          <img
            src="OCP.png"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          /></Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav" style={{ marginRight: 90, }}>
          <Nav className="ml-auto">
            <Nav.Item><Nav.Link href="/suivie_flottation">Home</Nav.Link></Nav.Item>
            <NavDropdown title={this.state.last_name.charAt(0).toUpperCase() + this.state.last_name.slice(1)} id="basic-nav-dropdown">
              <NavDropdown.Item style={{ marginRight: 10, }} href="/" onClick={this.handleLogOut.bind(this)}>Log Out</NavDropdown.Item>
            </NavDropdown>


          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>

    )
  }
}
export default withRouter(NavigationBar)