import React, { Component } from 'react';
import Image from 'react-bootstrap/Image'
import '../../index.css';
import { Button, Form } from "react-bootstrap";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    console.log(event)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { triggerLogin } = this.props;
    triggerLogin({
      user: this.state.email,
      contrasena: this.state.password
    })
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="Login">
        <Image className="logo" src="https://universidadesdemexico.mx/logos/original/logo-universidad-del-caribe.png" fluid />
        <Form>
          <div className="jumbotron box">
            <h4 className="display-4">Inventario OP</h4>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} name="email" value={email} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.handleChange} name="password" value={password} />
            </Form.Group>

            {/* <Form.Group controlId="formBasicChecbox">
              <Form.Check type="checkbox" label="Mantener iniciada la sesión" />
            </Form.Group> */}

            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Ingresar
              </Button>
          </div>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  const { triggerLogin } = actions;
  return bindActionCreators({ triggerLogin }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);
