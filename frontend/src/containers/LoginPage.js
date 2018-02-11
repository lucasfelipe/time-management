import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import LoginForm from "../components/login/LoginForm";
import { withRouter } from "react-router-dom";
import { loginUser } from "../actions/index";

const mapStateToProps = state => ({
  isAuthenticated: true
});

const mapDispatchToProps = dispatch => ({
  handleLogin: credentials => {
    dispatch(loginUser(credentials));
  }
});

const LoginPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));

export default LoginPage;
