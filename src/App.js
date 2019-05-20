import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import Navigation from './components/Layout/navegation';
// import Home from './containers/Home';
import Login from './containers/Login';
// import Tags from './containers/Tags';
import Admin from './containers/Admin'
import Objeto from './components/Objetos/FormularioCrearObjeto';
import ListaObjetos from './containers/ListaObjetos';

// import DetalleObjeto from './containers/Objeto';
// import Usuario from './containers/Usuario';
// import EditarUsuario from './containers/EditarUsuario';
// import ListaUsuarios from './containers/ListaUsuarios';
// import Subcategoria from './containers/Subcategoria';
// import ListaSubcategorias from './containers/ListaSubcategorias';
import loginActions from './containers/Login/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { bindActionCreators } from 'redux';

class App extends Component {
  componentDidMount() {
    const { autoLogin } = this.props;
    autoLogin();
  }

  render() {
    const { location, loggedIn, loading, tipoUsuario } = this.props;

    if (loading) return <div>Cargando... Espere por favor.</div>;

    return loggedIn ? (
      <div>
        <Navigation tipoUsuario={tipoUsuario} />
        <Switch location={location}>
          <Route exact path="/objetos/crear" component={Objeto} />
          <Route exact path="/objetos/:id" component={Objeto} />
          <Route exact path="/objetos" component={ListaObjetos} />
          {/* <Route exact path="/objetos/donar" component={ListaDonarObjetos} /> */}
          {/* <Route exact path="/usuario/crear" component={Usuario} /> */}
          {/* <Route exact path="/usuario/:id" component={EditarUsuario} /> */}
          {/* <Route exact path="/usuarios" component={ListaUsuarios} /> */}
          {/* <Route exact path="/subcategoria/crear" component={Subcategoria} /> */}
          {/* <Route exact path="/subcategoria/:id" component={Subcategoria} /> */}
          {/* <Route exact path="/subcategorias" component={ListaSubcategorias} /> */}
          {tipoUsuario === 'admin' && <Route path="/admin" component={Admin} />}
          <Route exact path="/" component={ListaObjetos} />
          <Redirect to="/" />
        </Switch>
      </div>
    ) : <Login />;
  }
}

const mapStateToProps = ({
  router: { location },
  login: {
    status: loggedIn,
    loading,
    user: {
      tipoUsuarioId,
      TipoUsuario: {
        nombre: tipoUsuario
      } = {}
    }
  }
}) => ({ location, loggedIn, loading, tipoUsuarioId, tipoUsuario });

const mapDispatchToProps = dispatch => {
  const { autoLogin } = loginActions;
  return bindActionCreators({ autoLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
