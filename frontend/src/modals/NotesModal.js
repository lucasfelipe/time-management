import React, { Component } from "react";
import PropTypes from "prop-types";
import { connectModal } from "redux-modal";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import NoteForm from "../components/tasks/NoteForm";
import {List, ListItem} from 'material-ui/List';

class NoteModal extends Component {
  static propTypes = {
    handleHide: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired
  };

  render() {
    const { show, handleHide, task, handleUpdate } = this.props;

    const currentTask = this.props.tasks.find(e => e._id === task._id);

    const actions = [
       <FlatButton 
          label="Save" 
          primary={true} 
          onClick={() => handleUpdate(currentTask)} 
        />,
      <FlatButton 
        label="Close" 
        secondary={true} 
        onClick={handleHide} 
      />
    ];

    let notes = currentTask.notes.map((note, idx) => <ListItem key={idx} primaryText={note} />)

    return (

      <div>
        <RaisedButton label="Dialog" />
        <Dialog
          title="Add Note"
          modal={true}
          actions={actions}
          open={show}
          onRequestClose={this.handleClose}
        >
        <NoteForm {...this.props} />
        <List>
          {notes}
        </List>
        </Dialog>
      </div>
    );
  }
}

export default connectModal({ name: "showNotes" })(NoteModal);
