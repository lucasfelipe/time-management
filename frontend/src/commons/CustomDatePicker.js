import React from "react";
import { Field } from "formik";
import DatePicker from "material-ui/DatePicker/DatePicker";


const DatePickerField = ({
  field: { name, value },
  form: { touched, errors, setFieldValue, setFieldTouched },
  onChange,
  ...otherProps
}) => {
  const handleChange = (event, data) => {
    
    setFieldTouched(name, true);
    setFieldValue(name, data);
    
    if (onChange) {
      console.error('onchange  wrong')
      onChange(event, data);
    }

  };

  return (
    <DatePicker
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
  <Field component={DatePickerField} {...props}/>
)