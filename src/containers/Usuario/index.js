import React, { Component } from 'react';

class Usuario extends Component {
  render() {
    return(
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header"> Detalle del Usurio </div>
              <div className="container" style={{ marginTop: 50, textAlign: 'center' }}> 
              <h4>Nombre</h4>
              <hr />
              <img src='https://screenshotlayer.com/images/assets/placeholder.png'></img>
              <hr />
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr><th>Característica</th><th>Descripción</th></tr>
                </thead>
                <tbody>
                  <tr><th>Nombre</th><th>Raul Campos Adame</th></tr>
                  <tr><th>Usuario</th><th>Admin@ucaribe.edu.mx</th></tr>
                  <tr><th>Contraseña</th><th>HolaMundo</th></tr>
                  <tr><th>Tipo usuario</th><th>Administrador</th></tr>
                  <tr><th>PuestoDepartamental</th><th>EncargadoArea</th></tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Usuario;
