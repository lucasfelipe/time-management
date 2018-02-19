import React from "react";
import { Field } from "formik";
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'


const MaterialSelectField = ({
  field: { name, value },
  form: { touched, errors, setFieldValue, setFieldTouched },
  onChange,
  ...otherProps
}) => {
  const handleChange = (event, key, data) => {
    setFieldTouched(name, true);
    setFieldValue(name, data);
 
    if (onChange) {
      onChange(event, key, data);
    }
  };

  return (
    <SelectField
      errorText={touched[name] && errors[name]}
      value={value}
      onChange={handleChange}
      {...otherProps}
    />
  );
};

export default ({
  field,
  ...props
}) => (
  <Field
  component={MaterialSelectField}
  {...props}
>
  {props.options.map(e => {
    return (
      <MenuItem
      key={e.value}
      value={e.value}
      primaryText={e.text}
    />
    )
  })}
</Field>
)