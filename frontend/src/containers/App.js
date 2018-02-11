import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import NavBar from "../commons/NavBar";
import { loginUser } from "../actions";
import LoginPage from "../containers/LoginPage";
import { withRouter, Route } from "react-router-dom";
import TaskPage from "./TaskPage";
import UserPage from "./UserPage";
import Switch from "react-router-dom/Switch";
import PrivateRouteContainer from "./PrivateRouteContainer";


class App extends Component {
  render() {
    const { dispatch, isAuthenticated, sideBarOpened, visibleRoutes } = this.props;
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
          </Switch>
        </div>
    );
  }
}

// App.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool.isRequired
// }

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  sideBarOpened: state.sidebar.opened,
  visibleRoutes: state.auth.authenticatedUser.visibleRoutes
});

export default withRouter(connect(mapStateToProps)(App));
