import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* <Link className="navbar-brand" to="/">Menú</Link> */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="navbar-brand" to="/">Home</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="navbar-brand" to="/busquedas">Busquedas</Link>
            </li> */}
            <li class="nav-item">
              <Link className="navbar-brand" to="/objetos">Objetos</Link>
            </li>
            <li class="nav-item">
              <Link className="navbar-brand" to="/admin/tags">Etiquetas</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Navigation;