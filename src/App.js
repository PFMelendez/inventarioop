import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import Navigation from './components/Layout/navegation';
import Home from './containers/Home';
import Login from './containers/Login';
import Tags from './containers/Admin';
import Objetos from './components/Objetos/FormularioCrearObjeto';
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
          {/* <Route exact path="/login" component={Login} /> */}
          <Route exact path="/admin/tags" component={Tags} />
          <Route exact path="/objetos" component={Objetos} />
          <Route exact path="/" component={Home} />
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
