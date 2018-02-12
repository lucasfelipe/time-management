import { httpPost, httpGet, httpPut, httpDelete } from "../utils";
import { toastr } from "react-redux-toastr";
import { hide } from "redux-modal";
import Constants from "../constants";




const userRemoved = payload => ({
  type: 'USER_REMOVED',
  payload
});

export const handleRemove = id => {
  return dispatch => {
    return httpDelete("/users", id)
      .then(response => {
        let { success, error } = response;
        if (error) {
          toastr.error("Error", error);
          return Promise.reject(response);
        } else {
          dispatch(userRemoved(success.users));
          dispatch(fetchAllUsers())
          toastr.success("Success", "Removed");
          
        }
      })
      .catch(err => console.log("Error: ", err));
  }
}




const usersListed = payload => ({
  type: Constants.USER_LISTED,
  payload
});

export const fetchAllUsers = () => {
  return dispatch => {
    return httpGet("/users")
      .then(response => {
        let { success, error } = response;
        if (error) {
          toastr.error("Error", error);
          return Promise.reject(response);
        } else {
          dispatch(usersListed(success.users));
        }
      })
      .catch(err => console.log("Error: ", err));
  };
};

//USER ACTIONS

export const findUserById = id => {
  return dispatch => {
    return httpGet(`/users/${id}`)
      .then(response => {
        dispatch(setCurrentUser(response.success.user))
      })
  }
}


const setCurrentUser = payload => ({
  type: Constants.SET_CURRENT_USER,
  payload
});


export const updateUser = user => {
  return dispatch => {
    return httpPut("users", user._id, {user})
      .then(response => {

        let { success, error } = response;
        
        if (error) {
          toastr.error("Error", error);
          return Promise.reject(response);
        } else {
          dispatch(hide('addUser'))
          toastr.success("Success", `${success.user.username} updated`);
          dispatch(newUserCreated(success.user));
          dispatch(fetchAllUsers())
        }

      })
  }
}

export const NEW_USER_CREATED = "NEW_USER_CREATED";

const newUserCreated = payload => ({
  type: NEW_USER_CREATED,
  payload
});

export const saveUser = (user, shouldFetchUsers) => {
  return dispatch => {
    return httpPost("/users", { user })
      .then(response => {
        let { success, error } = response;
        if (error) {
          toastr.error("Error", error);
          return Promise.reject(response);
        } else {
          dispatch(hide('addUser'))
          toastr.success("Success", `${user.username} saved`);
          dispatch(newUserCreated(success.user));
          if(shouldFetchUsers) {
            dispatch(fetchAllUsers())
          }
        }
      })
      .catch(err => console.log("Error: ", err));
  };
};

