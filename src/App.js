import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import Navigation from './components/navegation';
import Home from './containers/Home';
import Login from './containers/Login';
import Tags from './containers/Admin';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        <Navigation />
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin/tags" component={Tags} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ router }) => ({ location: router.location });

export default connect(mapStateToProps)(App);
