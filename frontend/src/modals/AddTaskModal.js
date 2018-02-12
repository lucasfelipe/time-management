import React, { Component } from "react";
import PropTypes from "prop-types";
import { connectModal } from "redux-modal";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import TaskForm from "../components/tasks/TaskForm";

class AddTaskModal extends Component {
  static propTypes = {  
    handleHide: PropTypes.func.isRequired
  };

  

  render() {
    const { show } = this.props;

    const customContentStyle = {
      width: "300px",
      maxWidth: "none"
    };

    return (
      <div>
        <RaisedButton label="Dialog" />
        <Dialog contentStyle={customContentStyle}
          title="Add Task"
          modal={true}
          open={show}>
          <TaskForm {...this.props} />
        </Dialog>
      </div>
    );
  }
}

export default connectModal({ name: "addTask" })(AddTaskModal);
