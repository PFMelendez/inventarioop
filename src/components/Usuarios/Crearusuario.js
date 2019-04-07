import React, { Component } from 'react';
//import TablaBusquda from '../Tabla/TablaBusquedas';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      apellidoPaterno: '',
      type: 0,
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeForm = this.changeForm.bind(this);
  }

  handleInputs(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createAccount } = this.props;
    const {
      email,
      password,
      confirmPassword,
      name,
      apellidoPaterno,
      type,
    } = this.state;
    createAccount({
      email,
      password,
      confirmPassword,
      name,
      apellidoPaterno,
      type,
    });
  }

  changeForm() {
    const { toggleLogInForm } = this.props;
    toggleLogInForm(false);
  }

  render() {
    const {
      email,
      password,
      confirmPassword,
      name,
      apellidoPaterno,
      type,
    } = this.state;

    return (
      <div className="container-fluid">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: '100vh' }}
        >
          <div className="card">
            <div className="card-header">
              <h4>Crear Cuenta</h4>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="name"
                    value={name}
                    onChange={this.handleInputs}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="apellidoPaterno"
                    value={apellidoPaterno}
                    onChange={this.handleInputs}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    value={email}
                    onChange={this.handleInputs}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="password"
                    value={password}
                    onChange={this.handleInputs}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Confirme Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleInputs}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputState">Tipo de Usuario</label>
                  <select
                    id="inputState"
                    className="form-control"
                    value={type}
                    name="type"
                    onChange={this.handleInputs}
                  >
                    <option value="0">Seleccionar...</option>
                    <option value="2">Administrados</option>
                    <option value="3">Capturistas</option>
                  </select>
                </div>
                <div className="d-flex justify-content-around">
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Crear Cuenta
                    </button>
                  </div>
                  <div>
                    <span
                      className="align-middle"
                      style={{ cursor: 'pointer' }}
                      onClick={this.changeForm}>
                        <div>
                             <button type="submit" className="btn btn-link">
                                TablaBusquda
                            </button>
                        </div>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default (Register);