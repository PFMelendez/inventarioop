import React, { Component } from 'react';


class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Menú</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Busquedas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../../components/Objetos/FormularioBuscarObjetos">Objetos</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Navigation;