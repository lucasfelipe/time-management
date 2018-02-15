import Constants from "../constants";

const initialState = {
  users: [],
  currentUser: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Constants.USER_LISTED:
      return { ...state, users: action.payload };
    case Constants.SET_CURRENT_USER:
      return {...state, currentUser: action.payload}
    default:
      return state;
  }
}
