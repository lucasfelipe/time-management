import React, { Component } from "react";
import { withFormik, Field } from "formik";
import Yup from "yup";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import CustomSelectField from "../../commons/CustomSelectField";
import CustomTextField from "../../commons/CustomTextField";

let UserForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    handleHide,
    signUp
  } = props;

  const actions = [
    <FlatButton
      key="cancel"
      label="Cancel"
      secondary={true}
      onClick={handleHide}
    />,
    <FlatButton key="submit" label="Submit" primary={true} type="submit" />
  ];

  const options = [
    { value: "ADMIN", text: "Administrator" },
    { value: "MANAGER", text: "Manager" },
    { value: "USER", text: "User" }
  ];

  return (
    <form className="form" onSubmit={handleSubmit}>
      <CustomTextField
        fullWidth={true}
        hintText="Username"
        floatingLabelText="Username"
        name="username"
      />
      <CustomTextField
        hintText="Password"
        fullWidth={true}
        floatingLabelText="Password"
        name="password"
        type="password"
      />
      {(!signUp || props.user.profile != 'USER') && 
        <CustomSelectField
          floatingLabelText="Role"
          options={options}
          name="profile"
        />
      }
      
      <CustomTextField
        hintText="Prefered Hours Per Day"
        fullWidth={true}
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
    profile: props.user.profile || "USER",
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