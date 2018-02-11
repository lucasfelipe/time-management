import Constants from "../constants";

const initialState = {
  users: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Constants.USER_LISTED:
      console.log('ACTION USER', action)
      return { ...state, users: action.payload };
    default:
      return state;
  }
}
