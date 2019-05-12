import React, { Component } from 'react';

class Usuario extends Component {
  render() {
    return (
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
                    <tr>
                      <td>
                        Nombre
                    </td>
                      <td>
                        <input type="text" className="form-control" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Usuario
                    </td>
                      <td>
                        <input type="text" className="form-control" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Tipo usuario
                    </td>
                      <td>
                        <select className='custom-select'>
                          <option value="">Seleccione...</option>
                          <option value="">Administrador</option>
                          <option value="">Capturista</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Contraseña
                    </td>
                      <td>
                        <input type="password" className="form-control" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Foto
                      </td>
                      <td>
                        <div className="input-group">
                          <div className="custom-file">
                            <input type="file" className="custom-file-input" />
                            <label className="custom-file-label" />
                          </div>
                          {/* <div className="input-group-append">
                            <span className="input-group-text">Examinar</span>
                          </div> */}
                        </div>
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

export default Usuario;
