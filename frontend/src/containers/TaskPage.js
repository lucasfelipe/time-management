import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ListTasks from "../components/tasks/ListTasks";
import { fetchAll, 
  saveTask, 
  fetchAllUsers, 
  updateTask, 
  removeTask,
  filterByPeriod,
  exportReport,
  addNote } from "../actions/index";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { show } from "redux-modal";
import AddTaskModal from "../modals/AddTaskModal"
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import FilterTaskForm from "../components/tasks/FilterTaskForm";
import { push } from "react-router-redux";



const styles = {
    floatButton: {
      right: 20,
      bottom: 20,
      position: 'fixed'
    },
    container: {
      width: '90%',  
      height: '90%'
    },
    titleStyle: {
      color: 'rgb(0, 188, 212)',
      textAlign: 'center',
      padding: '30px'
    },
    filterPosition: {
      textAlign: 'center',
      margin: '30px'
    }
  };


class TaskPage extends Component {
  componentDidMount() {
    //this.props.fetchAll();
    this.props.fetchAllUsers();
  }

  render() {
    const { tasks, handleAddTask } = this.props;
    return (
      <div>
        <FloatingActionButton onClick={handleAddTask} style={styles.floatButton}>
          <ContentAdd />
        </FloatingActionButton>
        <Paper style={styles.container} zDepth={2}>
          <AddTaskModal name="addTask" {...this.props} />
            <h1 style={styles.titleStyle}>Task Board</h1>
          <div style={styles.filterPosition}>
            <FilterTaskForm {...this.props} />
          </div>
          <Divider />
          {tasks && <ListTasks {...this.props} />}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    tasks: state.task.tasks,
    users: state.user.users
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAll: () => {
    dispatch(fetchAll());
  },
  fetchAllUsers: () => {
    dispatch(fetchAllUsers())
  },
  handleNotes: (task) => {
    dispatch(show("showNotes", { task }));
  },
  handleAddNote: (task, note) => {
    dispatch(addNote(task, note))
  },
  handleUpdate: (task) => {
    dispatch(updateTask(task))
  },
  handleRemove: (taskId) => {
    dispatch(removeTask(taskId))
  },
  handleSave: task => {
    dispatch(saveTask(task))
  },
  handleEdit: (task) => {
    dispatch(show("addTask", { task } ))
  },
  handleAddTask: (task) => {
      dispatch(show("addTask"));
  },
  filterByPeriod: (filter) => {
    dispatch(filterByPeriod(filter))
  },
  handleExport: (value) => {
    dispatch(exportReport(value));
    dispatch(push(`/report`))
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TaskPage)
);
