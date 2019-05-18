import React, { Component } from 'react';
import api from '../../services/api';

class Usuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: '',
      contrasena: '',
      confirmarContrasena: '',
      nombre: '',
      apellidos: '',
      nombreUsuario: '',
      tipoUsuario: 0,
      tiposUsuarios: [],
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.crearUsuario = this.crearUsuario.bind(this);
  }

  componentDidMount() {
    const that = this;
    api.tiposUsuarios.list()
      .then(({ data }) => {
        const { tiposUsuarios } = data;
        that.setState({ tiposUsuarios });
      })
      .catch(err => {
        alert('Hubo un error al cargar los tipos de usuarios');
      })
  }

  handleInputs(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  crearUsuario() {
    const {
      correo,
      contrasena,
      confirmarContrasena,
      nombre,
      apellidos,
      nombreUsuario,
      tipoUsuario,
    } = this.state;
    if (!correo || !contrasena || !confirmarContrasena || !nombre || !apellidos || !nombreUsuario || !tipoUsuario) {
      alert('Debe llenar todos los cmapos');
    } else {
      const that = this;
      api.usuarios.create({
        correo,
        contrasena,
        nombre,
        apellidos,
        nombreUsuario,
        tipoUsuario,
      })
        .then(response => {
          alert(`Usuario creado correctamente. ID: ${response.data.usuario.id}`);
          that.setState({
            correo: '',
            contrasena: '',
            confirmarContrasena: '',
            nombre: '',
            apellidos: '',
            nombreUsuario: '',
            tipoUsuario: 0,
          });
        })
        .catch(err => {
          console.log(err);
          alert('Ocurrio un problema creando el usuario');
        })
    }
  }

  render() {
    const {
      correo,
      contrasena,
      confirmarContrasena,
      nombre,
      apellidos,
      nombreUsuario,
      tipoUsuario,
      tiposUsuarios,
    } = this.state;

    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header"> Detalle del Usurio </div>
              <div className="container" style={{ marginTop: 50, textAlign: 'center' }}>
                {/* <h4>Nombre</h4>
                <hr />
                <img src='https://screenshotlayer.com/images/assets/placeholder.png'></img>
                <hr /> */}
                <table className="table table-hover">
                  <thead className="thead-dark">
                    <tr><th>Característica</th><th>Descripción</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Nombre
                      </td>
                      <td>
                        <input type="text" className="form-control" name="nombre" value={nombre} onChange={this.handleInputs} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Apellidos
                      </td>
                      <td>
                        <input type="text" className="form-control" name="apellidos" value={apellidos} onChange={this.handleInputs} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Usuario
                      </td>
                      <td>
                        <input type="text" className="form-control" name="nombreUsuario" value={nombreUsuario} onChange={this.handleInputs} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Correo
                      </td>
                      <td>
                        <input type="text" className="form-control" name="correo" value={correo} onChange={this.handleInputs} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Tipo usuario
                    </td>
                      <td>
                        <select className='custom-select' name="tipoUsuario" value={tipoUsuario} onChange={this.handleInputs} >
                          <option value="">Seleccione...</option>
                          {tiposUsuarios.map(item => <option value={item.id}>{item.nombre}</option>)}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Contraseña
                    </td>
                      <td>
                        <input type="password" className="form-control" name="contrasena" value={contrasena} onChange={this.handleInputs} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Confirmar Contraseña
                    </td>
                      <td>
                        <input type="password" className="form-control" name="confirmarContrasena" value={confirmarContrasena} onChange={this.handleInputs} />
                      </td>
                    </tr>
                    {/* <tr>
                      <td>
                        Foto
                      </td>
                      <td>
                        <div className="input-group">
                          <div className="custom-file">
                            <input type="file" className="custom-file-input" />
                            <label className="custom-file-label" />
                          </div> 
                        <div className="input-group-append">
                            <span className="input-group-text">Examinar</span>
                          </div> *
                        </div>
                      </td>
                    </tr> */}
                    <tr>
                      <td><button className="btn btn-primary" type="button" onClick={this.crearUsuario}>Crear usuario</button></td>
                      <td><hr /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default Usuario;
