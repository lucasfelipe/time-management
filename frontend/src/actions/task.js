import { httpPost, httpGet, httpPut, httpDelete, getUrlParam } from "../utils";
import { toastr } from "react-redux-toastr"; 
import { hide } from "redux-modal";
import Constants from '../constants/index';


export const updateTask = task => {
  return dispatch => {
    return httpPut('tasks', task._id, { task })
      .then(response => {
        let { error } = response;
        if (error) {
          Promise.reject(error);
        } else {
          dispatch(hide('addTask'))
          toastr.success("Success", 'Altered');
          dispatch(fetchAll())
        }
      })
  }

}


const filterReport = payload => ({
  type: Constants.FILTER_REPORT,
  payload
})

export const exportReport = filter => {
  return dispatch => {
    dispatch(filterReport(filter))
  }
}

const listAllTasks = payload => ({
  type: LIST_ALL_TASKS,
  payload
});

const listReportTasks = payload => ({
  type: Constants.LIST_REPORT_TASKS,
  payload
});

export const fetchAll = () => {
  return dispatch => {
    return httpGet("/tasks").then(response => {
      let { success, error } = response;
      if (error) {
        toastr.error("Error", error);
        return Promise.reject(response);
      } else {
        dispatch(listAllTasks(success.tasks));
      }
    });
  };
};

export const filterReportByPeriod = filter => {
  return dispatch => {
    return httpGet(`/tasks/${getUrlParam(filter)}`)
      .then(response => {
        dispatch(listReportTasks(response.success.tasks));
        //console.log('respondeu tranquilo e suss', response.success.tasks)
      });
  }
}

export const filterByPeriod = filter => {
  return dispatch => {
    return httpGet(`/tasks/${getUrlParam(filter)}`)
      .then(response => {
        dispatch(listAllTasks(response.success.tasks));
        //console.log('respondeu tranquilo e suss', response.success.tasks)
      });
  }
}
export const saveTask = task => {
  return dispatch => {
    return httpPost("/tasks", { task })
      .then(response => {
        let { success, error } = response;
        if (error) {
          toastr.error("Error", error.message);
          return Promise.reject(response);
        } else {
          dispatch(hide('addTask'))
          toastr.success("Success", `${success.task.taskname} saved`);
          dispatch(fetchAll())
        }
      })
      .catch(err => console.log("Error: ", err));
  };
};



export const NEW_TASK_CREATED = "NEW_TASK_CREATED";
export const LIST_ALL_TASKS = "LIST_ALL_TASKS";
export const NOTE_ADDED = "NOTE_ADDED";
export const ADD_NOTE = "ADD_NOTE";

export const addNote = (task, note) => {
  return {
    type: ADD_NOTE,
    payload: {task, note}
  }
}

export const removeTask = id => {
  return dispatch => {
    return httpDelete("/tasks", id)
      .then(response => {
        let { success, error } = response;
        if (error) {
          toastr.error("Error", error.message);
          return Promise.reject(response);
        } else {
          toastr.success("Success", `${success.message} removed.`);
          dispatch(fetchAll())    
        }
      })
      .catch(err => console.log("Error: ", err));
  }
}
