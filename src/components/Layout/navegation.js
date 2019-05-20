import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loginActions from '../../containers/Login/actions';


class Navigation extends Component {
  render() {
    const { triggerLogout, tipoUsuario } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* <Link className="navbar-brand" to="/">Menú</Link> */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="navbar-brand" to="/objetos">Lista de Objetos</Link>
            </li>
            <li class="nav-item">
              <Link className="navbar-brand" to="/objetos/crear">Registrar Objeto</Link>
            </li>
            {tipoUsuario === 'admin' && <li className="nav-item">
              <Link className="navbar-brand" to="/admin">Admin</Link>
            </li>}
            <li className="nav-item">
              <button className="btn btn-danger" onClick={triggerLogout}>Cerrar Sesión</button>
            </li>

          </ul>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  const { triggerLogout } = loginActions;
  return bindActionCreators({ triggerLogout }, dispatch);
}

export default connect(null, mapDispatchToProps)(Navigation);