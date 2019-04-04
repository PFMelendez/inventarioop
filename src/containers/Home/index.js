import React, { Component } from 'react';
import './styles.css';
//import TablaBusquda from '../../components/Tabla/TablaBusquedas';
import Crearusuario from '../../components/Usuarios/Crearusuario';

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
      <div className="App">
        <Crearusuario/> 
      </div>
    );
  }
}

export default Login;