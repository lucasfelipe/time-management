import React, { Component } from "react";
import PropTypes from "prop-types";
import { connectModal } from "redux-modal";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import UserForm from "../components/users/UserForm";

class AddUserModal extends Component {
  static propTypes = {
    handleHide: PropTypes.func.isRequired
  };

  render() {
    const { show, user } = this.props;

    const customContentStyle = {
      width: "400px",
      maxWidth: "none"
    };

    return (
      <div>
        <RaisedButton label="Dialog" />
        <Dialog contentStyle={customContentStyle} title={user._id ? 'Edit User' : 'Add User'} modal={true} open={show}>
          <UserForm {...this.props} />
        </Dialog>
      </div>
    );
  }
}

export default connectModal({ name: "addUser" })(AddUserModal);
