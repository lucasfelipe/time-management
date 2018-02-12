import Constants from "../constants";
import groupBy from "lodash/groupBy"

const initialState = {
  
};

const mapDate = (obj) => {
    return obj.day.substring(0,10);
}


const mapReport = (tasks) => {

    let groupedByDate = groupBy(tasks, mapDate);
    let report  = []
    for(let item in groupedByDate) {
        report.push({
            day: groupedByDate[item][0].day,
            totalTime: groupedByDate[item].reduce((acc, act) => act.timeSpent + acc, 0),
            notes: groupedByDate[item].map(e => e.note),
        })
    }
    return report;
}
export default (state = initialState, action) => {
  switch (action.type) {
    case Constants.LIST_ALL_TASKS:
      return { ...state, tasks: action.payload };
    case Constants.NOTE_ADDED:
      return { ...state, task: action.payload };
    case Constants.FILTER_REPORT: 
      return {...state, filter: action.payload}
    case Constants.LIST_REPORT_TASKS: 
      return {...state, tasksReport: mapReport(action.payload)}
    default:
      return state;
  }
};
