import React, { Component } from 'react';

class ListaUsuarios extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">Usuarios</div>
              <div className="container-fluid" style={{ marginTop: 50, textAlign: 'center' }}>
                <h4>Nombre</h4>
                <table className="table table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>
                        Nombre usuario
                    </th>
                      <th>
                        Tipo usuario
                    </th>
                      <th>
                        Acciones
                    </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Raul Campos
                      </td>
                        <td>
                          Administrador
                      </td>
                      <td>
                        <button type="button" className="btn btn-primary mr-3">Editar</button>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Pablo Melendez
                      </td>
                      <td>
                        Administrador
                      </td>
                      <td>
                        <button type="button" className="btn btn-primary mr-3">Editar</button>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Raul Andrade
                      </td>
                      <td>
                        Capturista
                      </td>
                      <td>
                        <button type="button" className="btn btn-primary mr-3">Editar</button>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                      </td>
                    </tr>
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
