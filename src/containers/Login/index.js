import React, { Component } from 'react';

import { Button, Form} from "react-bootstrap";
import Image from 'react-bootstrap/Image'

import '../../index.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <Image className="logo" src="https://universidadesdemexico.mx/logos/original/logo-universidad-del-caribe.png" fluid />
        <Form>
          <div className="jumbotron box">
              <h4 className="display-4">Inventario OP</h4>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo Electronico</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" label="Mantener iniciada la sesión" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Ingresar
              </Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default Login;