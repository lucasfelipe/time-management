import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ListTasks from "../components/tasks/ListTasks";
import { fetchAll, 
  saveTask, 
  fetchAllUsers, 
  updateTask, 
  removeTask,
  addNote } from "../actions/index";
import { show , handleHide} from "redux-modal";
import NotesModal from "../modals/NotesModal";
import AddTaskModal from "../modals/AddTaskModal"
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";


const style = {
    right: 20,
    bottom: 20,
    position: 'fixed'
};

class TaskPage extends Component {
  componentDidMount() {
    this.props.fetchAll();
  }

  render() {
    const { tasks, handleAddTask } = this.props;
    return (
      <div>
        <FloatingActionButton onClick={handleAddTask} style={style}>
          <ContentAdd />
        </FloatingActionButton>
        <AddTaskModal name="addTask" {...this.props} />
        {tasks && <ListTasks {...this.props} />}
        <NotesModal name="showNotes" {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    tasks: state.task.tasks 
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAll: () => {
    dispatch(fetchAll());
  },
  handleNotes: (task) => {
    dispatch(show("showNotes", { task }));
  },
  handleAddNote: (task, note) => {
    dispatch(addNote(task, note))
  },
  handleUpdate: (task) => {
    console.log('atualizadno')
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
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TaskPage)
);
