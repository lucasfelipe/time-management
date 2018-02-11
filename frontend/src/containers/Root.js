import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import DevTools from "./DevTools";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import UserPage from "./UserPage";
import TaskPage from "./TaskPage";
import LoginPage from "../containers/LoginPage";
import { ConnectedRouter } from "react-router-redux";
import PrivateRouteContainer from "./PrivateRouteContainer";
import NavBar from "../commons/NavBar";
import ReduxToastr from "react-redux-toastr";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Snackbar from "material-ui/Snackbar"

//import RepoPage from './RepoPage'

const Root = ({ store, history }) => {
  console.log("STORE", store);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider>
        <div className="container">
          
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
          />
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRouteContainer path="/" component={App} />
          </Switch>
          {/*<DevTools />*/}
          
        </div>
        <Snackbar
          open={true}
          message="Event added to your calendar"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};
Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
