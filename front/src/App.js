import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import Login from './containers/Home';

class App extends Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        <Switch location={location}>
          <Route exact path="/" component={Login} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ router }) => ({ location: router.location });

export default connect(mapStateToProps)(App);

