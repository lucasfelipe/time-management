import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { updateUser } from "../actions/index";
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
   // this.props.fetchAllUsers();
  }

  render() {
    
    return (
      <div style={styles.body}>
        <Paper style={styles.paper}>
          <h1 style={styles.titleStyle}>Task Board</h1>
          <Divider />
          <div style={{margin: '45px'}}>
          <UserForm fullWidth={false} {...this.props}/>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.authenticatedUser
});

const mapDispatchToProps = dispatch => ({
  handleUpdate: user => {
    dispatch(updateUser(user));
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyAccountPage)
);
