import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import Styled from './index.styled';
import Tags from '../Tags';
import Usuarios from '../ListaUsuarios';
import Usuario from '../Usuario';
import Subcategorias from '../../components/Sub_categorias/Buscar_Subcategoria';
import CrearSubCategoria from '../../components/Sub_categorias/Crear_Subcategoria';
class Admin extends Component {
  render() {
    const { location } = this.props;
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-2'>
            <Styled.SideBarWrapper>
              <div style={{ marginTop: '10px' }}>
                <p style={{ marginBottom: '0px' }}>Objetos</p>
                <p><Link to="/admin/etiquetas">Etiquetas</Link></p>
              </div>
              <div style={{ marginTop: '10px' }}>
                <p style={{ marginBottom: '0px' }}>Usuarios</p>
                <p style={{ marginBottom: '0px' }}><Link to="/admin/usuarios">Listar Usuarios</Link></p>
                <p style={{ marginBottom: '0px' }}><Link to="/admin/usuarios/crear">Crear Usuario</Link></p>
              </div>
              <div style={{ marginTop: '10px' }}>
                <p style={{ marginBottom: '0px' }}>Subategorias</p>
                <p style={{ marginBottom: '0px' }}><Link to="/admin/subcategorias">Listar Subcategorias</Link></p>
                <p style={{ marginBottom: '0px' }}><Link to="/admin/subcategorias/crear">Crear Subcategoria</Link></p>
              </div>
            </Styled.SideBarWrapper>
          </div>
          <div className='col-10'>
            <Switch location={location}>
              <Route exact path="/admin/etiquetas" component={Tags} />
              <Route exact path="/admin/usuarios/crear" component={Usuario} />
              <Route exact path="/admin/usuarios/:id" component={Usuario} />
              <Route exact path="/admin/usuarios" component={Usuarios} />
              <Route exact path="/admin/subcategorias/crear" component={CrearSubCategoria} />
              <Route exact path="/admin/subcategorias/:id" component={CrearSubCategoria} />
              <Route exact path="/admin/subcategorias" component={Subcategorias} />
              <Route exact path='/admin' component={Usuarios} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default Admin;
