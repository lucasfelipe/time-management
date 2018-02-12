import React from "react";
import { withFormik } from "formik";
import Yup from "yup";
import RaisedButton from "material-ui/RaisedButton";

import CustomSelectField from "../../commons/CustomSelectField";
import CustomTextField from "../../commons/CustomTextField";

let UserForm = props => {
  const {
    handleSubmit,
    handleHide,
    user,
    fullWidth = true,
    signUp
  } = props;

  const actions = [
    <RaisedButton
      key="cancel"
      label="Cancel"
      secondary={true}
      onClick={handleHide}
    />,
    <RaisedButton key="submit" label={user && user._id ? 'Update' : 'Submit'} primary={true} type="submit" />
  ];

  const options = [
    { value: "ADMIN", text: "Administrator" },
    { value: "MANAGER", text: "Manager" },
    { value: "USER", text: "User" }
  ];

  return (
    <form className="form" onSubmit={handleSubmit}>
      <CustomTextField
        fullWidth={fullWidth}
        hintText="Username"
        floatingLabelText="Username"
        name="username"
      />
      <CustomTextField
        hintText="Password"
        fullWidth={fullWidth}
        floatingLabelText="Password"
        name="password"
        type="password"
      />
      {(!signUp && props.user.role !== 'USER') && 
        <CustomSelectField
          floatingLabelText="Role"
          options={options}
          fullWidth={fullWidth}
          name="role"
        />
      }
      <CustomTextField
        hintText="Prefered Hours Per Day"
        fullWidth={fullWidth}
        type="number"
        floatingLabelText="Prefered Hours Per Day"
        name="preferedHoursPerDay"
      />
      {actions}
    </form>
  );
};

UserForm = withFormik({
  mapPropsToValues: props => ({
    _id: props.user._id || undefined,
    username: props.user.username || "",
    password: props.user.password || "",
    confirmPassword: "",
    role: props.user.role || "USER",
    preferedHoursPerDay: props.user.preferedHoursPerDay || ""
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string()
      .required()
      .min(5),
    preferedHoursPerDay: Yup.number()
      .required()
      .min(1)
      .max(24)
  }),
  handleHide: (_, { props }) => {
    props.handleHide();
  },
  handleSubmit: (values, { props, isEditing }) => {
    if(values._id === undefined) {
      props.handleSaveUser(values);
    } else {
      props.handleUpdate(values);
    }
  },
  displayName: "UserForm" // helps with React DevTools
})(UserForm);

export default UserForm;