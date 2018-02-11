import React from "react";
import Route from "react-router-dom/Route";
import Redirect from "react-router-dom/Redirect";
import { connect } from "react-redux";
import withRouter from "react-router-dom/withRouter";
import { verifyToken }  from '../actions/index'

class PrivateRouteContainer extends React.Component {

  componentDidMount() {
    this.props.verifyToken();
  }

  render() {
    const {
      isAuthenticated,
      component: Component,
      location,
      ...props
    } = this.props;
    return (
      <Route
        {...props}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )}
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  verifyToken: () => {
    dispatch(verifyToken())
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRouteContainer));
