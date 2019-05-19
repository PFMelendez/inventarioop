import React, { Component } from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import api from '../../services/api';
import helpers from '../../services/helpers';

const { antibind } = helpers;

class ListaUsuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      usuarios: [],
      lastPage: false
    }
    this.loadUsers = this.loadUsers.bind(this);
    this.handleApiErrors = this.handleApiErrors.bind(this);
    this.loadNext = this.loadNext.bind(this);
    this.loadLast = this.loadLast.bind(this);
  }

  componentDidMount() {
    const { page } = this.state;
    api.usuarios.list(page)
      .then(antibind(this.loadUsers, page))
      .catch(this.handleApiErrors)
  }

  loadUsers(response, page) {
    const { usuarios } = response.data;

    if (usuarios.length === 0) {
      const { usuarios: oldUsers } = this.state;

      this.setState({ lastPage: true });

      if (page === 0) {
        this.setState({ usuarios: [] });
      }

      if (oldUsers.length > 0) {
        alert('No hay mas usuarios que cargar');
      }
    } else if (usuarios.length < 10) {
      this.setState({ usuarios, lastPage: true, page });
    } else {
      this.setState({ usuarios, page });
    }
  }

  handleApiErrors(err) {
    console.log(err);
    alert('Hubo un error al cargar los usuarios');
  }

  loadNext() {
    const page = this.state.page + 1;
    api.usuarios.list(page)
      .then(antibind(this.loadUsers, page))
      .catch(this.handleApiErrors)
  }

  loadLast() {
    const page = this.state.page - 1;
    if (page >= 0) {
      api.usuarios.list(page)
        .then(antibind(this.loadUsers, page))
        .catch(this.handleApiErrors)
    }
  }

  editUser = (e, id) => {
    const { navigate } = this.props;
    navigate(`/admin/usuarios/${id}`);
  }

  deleteUser = (e, id) => {
    const conf = confirm('Confirme el eliminar al usuario del sistema.');
    if (conf) {
      const that = this;
      api.usuarios.delete(id)
        .then(() => {
          const { page } = that.state;
          api.usuarios.list(page)
            .then(antibind(that.loadUsers, page))
            .catch(that.handleApiErrors);
        })
        .catch(that.handleApiErrors);
    }
  }

  render() {
    const { page, usuarios, lastPage } = this.state;
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header text-center">
                <h4>
                  <button className="btn btn-info mr-5" style={{ float: 'left' }} onClick={this.loadLast} disabled={!page}>
                    Anterior
                  </button>
                  <button className="btn btn-info" style={{ float: 'left' }} onClick={this.loadNext} disabled={lastPage}>
                    Siguiente
                  </button>
                  <span>Usuarios</span>
                </h4>
              </div>
              <div className="container-fluid" style={{ marginTop: 50, textAlign: 'center' }}>

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
                    {usuarios.map(item => (
                      <tr key={item.id}>
                        <td>
                          {`${item.nombre} ${item.apellidos}`}
                        </td>
                        <td>
                          {item.TipoUsuario.display}
                        </td>
                        <td>
                          <button type="button" className="btn btn-primary mr-3" onClick={antibind(this.editUser, item.id)}>Editar</button>
                          <button type="button" className="btn btn-danger" onClick={antibind(this.deleteUser, item.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
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

const dispatcher = dispatch => ({ navigate: url => dispatch(push(url)) })

export default connect(null, dispatcher)(ListaUsuarios);
