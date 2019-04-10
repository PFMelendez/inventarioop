import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loginActions from '../../containers/Login/actions';


class Navigation extends Component {
  render() {
    const { triggerLogout } = this.props;
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