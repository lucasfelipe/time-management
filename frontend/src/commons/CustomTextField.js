import React from "react";
import { Field } from "formik";
import TextField from 'material-ui/TextField'

const MaterialInputComponent = ({
  field, 
  form: { touched, errors },
  ...props
}) => (
  <div>
    <TextField {...field} {...props} errorText={
        touched[field.name] &&
      errors[field.name] && 
      errors[field.name]
      } />
  </div>
);

export default ({
  field,
  ...props
}) => (
  <Field {...field} {...props} component={MaterialInputComponent} />
)
