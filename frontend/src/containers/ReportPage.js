import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { filterReportByPeriod } from "../actions";
import ListReportTasks from "../components/tasks/ListReportTasks"

// const style = {
//     right: 20,
//     bottom: 20,
//     position: 'fixed'
// };

 const titleStyle =  {
      color: 'rgb(0, 188, 212)',
      textAlign: 'center'
}

class ReportPage extends Component {
  componentDidMount() {
    
    const { getReport, filter} = this.props;
    
    getReport(filter);
  
}

  render() {
    let {tasks, preferedHours} = this.props;
    return (
      <div>
        <h1 style={titleStyle}>My Report page</h1>
        {tasks && <ListReportTasks preferedHours={preferedHours} tasks={tasks} />}
      </div>
    );
  }
}

const mapStateToProps = ({ task }) => ({
  filter: task.filter,
  preferedHours: task.preferedHours,
  tasks: task.tasksReport,
});

const mapDispatchToProps = dispatch => ({
  getReport: filter => {
    dispatch(filterReportByPeriod(filter));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReportPage)
);
