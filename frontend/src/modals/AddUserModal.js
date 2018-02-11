import React, { Component } from "react";
import PropTypes from "prop-types";
import { connectModal } from "redux-modal";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import UserForm from "../components/users/UserForm";

class AddUserModal extends Component {
  static propTypes = {
    handleHide: PropTypes.func.isRequired
  };

  render() {
    const { show, handleHide, handleSaveUser } = this.props;

    const customContentStyle = {
      width: "400px",
      maxWidth: "none"
    };

    return (
      <div>
        <RaisedButton label="Dialog" />
        <Dialog contentStyle={customContentStyle} title="Add User" modal={true} open={show}>
          <UserForm {...this.props} />
        </Dialog>
      </div>
    );
  }
}

export default connectModal({ name: "addUser" })(AddUserModal);