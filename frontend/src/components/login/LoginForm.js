import React from "react";
import { withFormik, Form } from "formik";
import CustomTextField from "../../commons/CustomTextField";
import Yup from "yup";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";
import Paper from 'material-ui/Paper';


let LoginForm = props => {
  let { handleSubmit } = props;
  const styles = {
    
    titleStyle: {
      color: 'rgb(0, 188, 212)',
      textAlign: 'center'
    },
    form: {
      textAlign: 'center'
    }
  };
  return (
    <div>
        <h1 style={styles.titleStyle}>Login</h1>
        <Form className="form" style={styles.form} onSubmit={handleSubmit}>
          <CustomTextField
            hintText="Username"
            floatingLabelText="Username"
            name="username"
          />
          <CustomTextField
            hintText="Password"
            floatingLabelText="Password"
            name="password"
            type="password"
          />
          <RaisedButton
            key="submit_button"
            type="submit"
            label="Sign In"
            primary={true}
            keyboardFocused={true}
          />
        </Form>
      </div>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    username: "",
    password: ""
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required().min(5)
  }),
  handleSubmit: (values, { props }) => {
    props.handleLogin(values);
  },
  displayName: "NoteForm"
})(LoginForm);
