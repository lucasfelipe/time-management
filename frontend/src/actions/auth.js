import { httpPost, httpGet, httpPut } from "../utils";
import { push } from "react-router-redux";
import Constants from '../constants'

function requestLogout() {
  return {
    type: Constants.LOGOUT_SUCCESS,
    isAuthenticated: false
  };
}

function receiveLogout() {
  return {
    type: Constants.LOGOUT_SUCCESS,
    isAuthenticated: false
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem("access_token");
    dispatch(receiveLogout());
  };
}

export function loginUser(credentials) {
  return dispatch => {
    return httpPost("/login", credentials)
      .then(response => {
        let { user, success, token } = response;
        if (!success) {
          dispatch(loginError(user.message));
          return Promise.reject(user);
        } else {
          localStorage.setItem("access_token", token);
          localStorage.setItem("current_user", JSON.stringify(user));
          dispatch(receiveLogin(user));
          dispatch(push("/"));
        }
      })
      .catch(err => console.log("Error: ", err));
  };
}


export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

function requestLogin(credentials) {
  return {
    type: LOGIN_REQUEST,
    isAuthenticated: false,
    credentials
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    payload:  user
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isAuthenticated: false,
    message
  };
}



export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';

function tokenExpired() {
  return {
    type: TOKEN_EXPIRED,
    isAuthenticated: false
  };
}


export const TOKEN_VALID = 'TOKEN_VALID';

function tokenValid() {
  return {
    type: TOKEN_VALID,
    isAuthenticated: true 
  };
}

export function verifyToken() {
  return dispatch => {
    return httpGet("/")
      .then(response => {
        let { success } = response;
        if (!success) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("current_user");
          dispatch(tokenExpired())
          return Promise.reject(response);
        } else {
          dispatch(tokenValid());
        }
      });
  }
}


