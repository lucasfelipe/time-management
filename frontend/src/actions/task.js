import { httpPost, httpGet, httpPut, httpDelete, getUrlParam } from "../utils";
import { toastr } from "react-redux-toastr"; 
import { hide } from "redux-modal";
import Constants from '../constants/index';



const updatePreferedHoursPerDay = payload => ({
  type: Constants.PREFERED_HOURS_PER_DAY,
  payload
}); 

const configureFilter = payload => ({
  type: Constants.CONFIGURE_FILTER,
  payload
}); 

const listAllTasks = payload => ({
  type: Constants.LIST_ALL_TASKS,
  payload
});

const listReportTasks = payload => ({
  type: Constants.LIST_REPORT_TASKS,
  payload
});

const filterReport = payload => ({
  type: Constants.FILTER_REPORT,
  payload
})

export const exportReport = filter => {
  return dispatch => {
    dispatch(filterReport(filter))
  }
}

export const updateTask = (task, filter) => {
  return dispatch => {
    return httpPut('tasks', task._id, { task })
      .then(response => {
        let { error } = response;
        if (error) {
          Promise.reject(error);
        } else {
          dispatch(hide('addTask'))
          toastr.success("Success", 'Altered');
          dispatch(filterByPeriod(filter))
        }
      })
  }
}
  
export const fetchTasksByUser = (idUser) => {
  return dispatch => {
    return httpGet(`/tasks/${idUser}/tasks`).then(response => {
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
      });
  }
}



export const filterByPeriod = (filter, preferedHours) => {
  return dispatch => {
    dispatch(configureFilter(filter))
    if(preferedHours) {
      dispatch(updatePreferedHoursPerDay(preferedHours))
    }

    if(!filter.from && !filter.to) {
      toastr.error("Data not found");
      return;
    }
    return httpGet(`/tasks/${getUrlParam(filter)}`)
      .then(response => {
        if(response.success.tasks[0]) {
          dispatch(listAllTasks(response.success.tasks))
        } else {
          dispatch(listAllTasks([]));
          toastr.info("Data not found");
        }
      });
  }
}
export const saveTask = (task, filter) => {
  return dispatch => {
    return httpPost("/tasks", { task })
      .then(response => {
        let { error } = response;
        if (error) {
          toastr.error("Error", error.message);
          return Promise.reject(response);
        } else {
          dispatch(hide('addTask'))
          toastr.success("Success", `Saved`);
          dispatch(filterByPeriod(filter))
        }
      });
  };
};


export const removeTask = (id, filter) => {
  return dispatch => {
    return httpDelete("/tasks", id)
      .then(response => {
        let { error } = response;
        if (error) {
          toastr.error("Error", error.message);
          return Promise.reject(response);
        } else {
          toastr.success("Success", `Removed.`);
          dispatch(filterByPeriod(filter))    
        }
      });
  }
}
