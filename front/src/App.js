import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import Home from './containers/Home';

class App extends Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ router }) => ({ location: router.location });

export default connect(mapStateToProps)(App);

