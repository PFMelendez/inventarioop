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
import DetalleObjeto from './containers/Objeto';
import Usuario from './containers/Usuario';
import ListaUsuarios from './containers/ListaUsuarios';
import Subcategoria from './containers/Subcategoria';
import ListaSubcategorias from './containers/ListaSubcategorias';
import loginActions from './containers/Login/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { bindActionCreators } from 'redux';

class App extends Component {
  componentDidMount() {
    const { autoLogin } = this.props;
    autoLogin();
  }

  render() {
    const { location, loggedIn, loading } = this.props;

    if (loading) return <div>Cargando... Espere por favor.</div>;

    return loggedIn ? (
      <div>
        <Navigation />
        <Switch location={location}>
          <Route exact path="/objeto/crear" component={Objeto} />
          <Route exact path="/objeto/:id" component={Objeto} />
          <Route exact path="/objetos" component={ListaObjetos} />
          <Route exact path="/detalle/objeto" component={DetalleObjeto} />
          <Route exact path="/usuario/crear" component={Usuario} />
          <Route exact path="/usuario/:id" component={Usuario} />
          <Route exact path="/usuarios" component={ListaUsuarios} />
          <Route exact path="/subcategoria/crear" component={Subcategoria} />
          <Route exact path="/subcategoria/:id" component={Subcategoria} />
          <Route exact path="/subcategorias" component={ListaSubcategorias} />
          <Route path="/admin" component={Admin} />
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
    loading
  }
}) => ({ location, loggedIn, loading });

const mapDispatchToProps = dispatch => {
  const { autoLogin } = loginActions;
  return bindActionCreators({ autoLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
