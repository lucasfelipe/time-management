import React from "react";
import { withFormik, Field, Form } from "formik";
import Yup from "yup";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import CustomTextField from "../../commons/CustomTextField";
import DatePicker from 'material-ui/DatePicker';
import CustomDatePicker from "../../commons/CustomDatePicker";

let TaskForm = props => {
  const { 
    values, 
    handleReset, 
    handleSubmit,
    handleChange,
    handleBlur,
    handleHide } = props;

  const actions = [
    <FlatButton
      key="cancel_button"
      label="Cancel"
      secondary={true}
      onClick={handleHide}
    />,

    <FlatButton
      key="submit_button"
      type="submit"
      label="Submit"
      primary={true}
      keyboardFocused={true}
    />
  ];

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <CustomTextField
        hintText="Name"
        fullWidth={true}
        floatingLabelText="Name"
        name="taskname"
      />
      <CustomTextField
        hintText="Time Spent"
        fullWidth={true}
        floatingLabelText="Time Spent"
        name="time"
      />
      <CustomDatePicker
        hintText="date"
        name="day"
        autoOk={true}
        />
      {actions}
    </Form>
  );
};

TaskForm = withFormik({
  mapPropsToValues: props => {

    
    if(props.task) {
      return {
        _id: props.task._id,
        taskname: props.task.taskname,
        time: props.task.time,
        day: props.task.day
      }
    } else {
       return {
        _id: undefined,
        taskname: "",
        time: "",
        day: new Date()
      }
    }
  },
  validationSchema: Yup.object().shape({
    taskname: Yup.string().required(),
    time: Yup.number().required().min(1).max(24)
  }),
  handleHide: (value, { props }) => {
    props.handleHide();
  },
  handleSubmit: (values, { props }) => {
    console.log('values', values);
    if(values._id === undefined) {
      props.handleSave(values);
    } else {
      props.handleUpdate(values);
    }
  },
  displayName: "TaskForm" // helps with React DevTools
})(TaskForm);

export default TaskForm;
