import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import LoginForm from "../components/login/LoginForm";
import { withRouter } from "react-router-dom";
import { loginUser } from "../actions/index";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";
import FlatButton from "material-ui/FlatButton/FlatButton";
import { show } from "redux-modal";
import AddUserModal from "../modals/AddUserModal";
import { saveUser, fetchAllUsers, handleRemove, updateUser } from "../actions/index";

class LoginPage extends Component {
  render() {

    let { handleSignUp } = this.props

    const styles = {
      
      button: {
        textAlign: 'center',
        marginTop: '20px'
      }
    };
    
    return (
      <div>
        <LoginForm {...this.props}/>
        <div style={styles.button}>
        <FlatButton
          key="submit_button"
          type="submit"
          label="Create new account"
          onClick={handleSignUp}
          primary={true}
          keyboardFocused={true}
        />
        </div>
        <AddUserModal name="addUser" {...this.props} />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  isAuthenticated: true
});

const mapDispatchToProps = dispatch => ({
  handleLogin: credentials => {
    dispatch(loginUser(credentials));
  },
  handleSignUp: () => {
    dispatch(show('addUser', { signUp: true, user: {}}))
  },
  handleSaveUser: user => {
    dispatch(saveUser(user, false));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
