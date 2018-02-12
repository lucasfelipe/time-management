import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFormik, Field } from "formik";
import Yup from "yup";
import { saveUser, fetchAllUsers, handleRemove, updateUser } from "../actions/index";
import { connect } from "react-redux";
import UserForm from "../components/users/UserForm";
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

class ReportPage extends Component {
  componentDidMount() {
      //TODO: getReport
    //this.props.getReport();
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

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  showDateByParameter: user => {
    dispatch(saveUser(user, true));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReportPage)
);
