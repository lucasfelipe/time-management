import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { saveUser, fetchAllUsers, handleRemove, updateUser } from "../actions/index";
import { connect } from "react-redux";
import ListUsers from "../components/users/ListUsers";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import AddUserModal from "../modals/AddUserModal";
import { show } from "redux-modal";

const style = {
    right: 20,
    bottom: 20,
    position: 'fixed'
};

class UserPage extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
    const { user, handleAddUser } = this.props;
    return (
      <div>
        {user && <ListUsers {...this.props} />}
        <FloatingActionButton onClick={handleAddUser} style={style}>
          <ContentAdd />
        </FloatingActionButton>
        <AddUserModal name="addUser" {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = ({ user, auth }) => ({
  user,
  currentUserRole: auth.authenticatedUser.role
});

const mapDispatchToProps = dispatch => ({
  handleSaveUser: user => {
    dispatch(saveUser(user, true));
  },
  fetchAllUsers: () => {
    dispatch(fetchAllUsers());
  },
  handleAddUser: user => {
    dispatch(show("addUser", { message: `This is a user modal` }));
  },
  handleEdit: user => {
    console.log(user);
    dispatch(show("addUser", {user: user}))
  },
  handleUpdate: user => {
    console.log(user);
    dispatch(updateUser(user));
  },
  handleRemove: id => {
    dispatch(handleRemove(id))
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserPage)
);
