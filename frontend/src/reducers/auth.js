import Constants from "../constants";

const initialState = {
  isAuthenticated: localStorage.getItem("access_token") ? true : false,
  authenticatedUser: JSON.parse(localStorage.getItem("current_user")) || {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Constants.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: action.credentials
      });
    case Constants.LOGIN_SUCCESS:
      return {
        ...state,
        authenticatedUser: action.payload,
        isAuthenticated: true
      };
    case Constants.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.message
      });
    case Constants.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false
      });
      case Constants.TOKEN_EXPIRED:
        return {...state, isAuthenticated: action.isAuthenticated};
      case Constants.TOKEN_VALID:
        return {...state, isAuthenticated: action.isAuthenticated};
    default:
      return state;
  }
}
