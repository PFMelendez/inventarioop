import React, { Component } from 'react';

class DetalleObjeto extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header"> Detalle del objeto </div>
              <div className="container" style={{ marginTop: 50, textAlign: 'center' }}> 
              <h4> Nombre del Objeto</h4>
              <hr />
              <img src='https://screenshotlayer.com/images/assets/placeholder.png'></img>
              <hr />
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr><th>Característica</th><th>Descripción</th></tr>
                </thead>
                <tbody>
                  <tr><th>Categoría</th><th>Electrónica</th></tr>
                  <tr><th>Subcategoría</th><th>Celulares</th></tr>
                  <tr><th>Etiquetas</th><th>Tag1, Tag2, Tag3, Tag4, Tag5</th></tr>
                  <tr><th>Lugar donde se encontró </th><th> Edificio E</th></tr>
                  <tr><th>Estado</th><th>Bueno</th></tr>
                  <tr><th>Hora</th><th>13:00 hrs</th></tr>
                  <tr><th>Nombre de quién lo encontró</th><th>Celulares</th></tr>
                  <tr><th>Descripción</th><th>Iphone 4 color negro. Pantalla rayada</th></tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetalleObjeto;
