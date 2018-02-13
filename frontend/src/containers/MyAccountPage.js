import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { updateUser, findUserById } from "../actions/index";
import { connect } from "react-redux";
import UserForm from "../components/users/UserForm";

import Paper from "material-ui/Paper"
import Divider from "material-ui/Divider"

const styles = {
  paper: {
    width: '350px',
    height: '90%'
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
    textAlign: 'center'
  },
};

class MyAccountPage extends Component {

  componentDidMount() {
    let { id } = this.props
    this.props.findUserById(id);
  }

  render() {  
    return (
      <div style={styles.body}>
        <Paper style={styles.paper}>
          <h1 style={styles.titleStyle}>My Account</h1>
          <Divider />
          <div style={{margin: '45px'}}>
          {this.props.user && <UserForm removeCancelButton={true} fullWidth={false} {...this.props}/>}
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({
  user: user.currentUser,
  id: auth.authenticatedUser._id
});

const mapDispatchToProps = dispatch => ({
  handleUpdate: user => {
    dispatch(updateUser(user));
  },
  findUserById: id => {
    dispatch(findUserById(id))
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyAccountPage)
);
