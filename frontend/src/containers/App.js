import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../commons/NavBar";
import { withRouter, Route } from "react-router-dom";
import TaskPage from "./TaskPage";
import UserPage from "./UserPage";
import MyAccountPage from "./MyAccountPage";
import Switch from "react-router-dom/Switch";


class App extends Component {
  render() {
    const { dispatch, sideBarOpened, visibleRoutes } = this.props;
    return (
      
        <div>
          <NavBar
            title={"App Managment"}
            sideBarOpened={sideBarOpened}
            visibleRoutes={visibleRoutes}
            dispatch={dispatch}
          />
          <Switch>
            <Route exact path="/" component={TaskPage} />
            <Route path="/users" component={UserPage} />
            <Route path="/my-account" component={MyAccountPage} />
          </Switch>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  sideBarOpened: state.sidebar.opened,
  visibleRoutes: state.auth.authenticatedUser.visibleRoutes
});

export default withRouter(connect(mapStateToProps)(App));
