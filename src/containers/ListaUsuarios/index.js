import React, { Component } from 'react';

class ListaUsuarios extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">Usuarios</div>
              <div className="container" style={{ marginTop: 50, textAlign: 'center' }}> 
              <h4>Nombre</h4>
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr><th>Nombre usuario</th><th>Tipo usuario</th></tr>
                </thead>
                <tbody>
                <tr><th>RaulCampos</th><th>Administrador</th></tr>
                <tr><th>Pablo melendes</th><th>Administrador</th></tr>
                <tr><th>Raul Andrade</th><th>Capturista</th></tr>
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

export default ListaUsuarios;
