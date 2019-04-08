import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import Navigation from './components/Layout/navegation';
import Home from './containers/Home';
import Login from './containers/Login';
import Tags from './containers/Admin';
import Objetos from './components/Objetos/FormularioCrearObjeto';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    const { location, loggedIn } = this.props;

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

const mapStateToProps = ({ router, login: { status } }) => ({ location: router.location, loggedIn: status });

export default connect(mapStateToProps)(App);
