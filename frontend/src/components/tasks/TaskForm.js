import React from "react";
import { withFormik, Form } from "formik";
import Yup from "yup";
import FlatButton from "material-ui/FlatButton";
import CustomTextField from "../../commons/CustomTextField";
import CustomDatePicker from "../../commons/CustomDatePicker";
import CustomSelectField from "../../commons/CustomSelectField";

let TaskForm = props => {
  const {
    users,
    currentUser,
    handleSubmit,
    handleHide
  } = props;

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

  const usersMap = users.map(e => ({ value: e._id, text: e.username }));

  return (
    <Form className="form" onSubmit={handleSubmit}>
      {currentUser.role === "ADMIN" && 
        <CustomSelectField
          floatingLabelText="To"
          options={usersMap}
          name="owner"
        />
      }
      
      <CustomTextField
        hintText="Time Spent"
        fullWidth={true}
        floatingLabelText="Time Spent"
        name="timeSpent"
      />
      <CustomDatePicker 
        hintText="date" 
        name="day" 
        autoOk={true} 
      />
      <CustomTextField
        hintText="Note"
        fullWidth={true}
        floatingLabelText="Note"
        name="note"
        multiLine={true}
        rows={2}
        rowsMax={4}
      />
      {actions}
    </Form>
  
  
  );
};

TaskForm = withFormik({
  mapPropsToValues: props => {
    let { currentUser } = props; 
    if (props.task) {
      return {
        _id: props.task._id,
        owner: props.task.owner,
        timeSpent: props.task.timeSpent,
        day: new Date(props.task.day),
        note: props.task.note
      };
    } else {
      return {
        _id: undefined,
        owner: currentUser._id,
        timeSpent: "",
        day: new Date(),
        note: ""
      };
    }
  },
  validationSchema: Yup.object().shape({
    day: Yup.date().required(),
    note: Yup.string().required().min(10),
    timeSpent: Yup.number()
      .required()
      .min(1)
      .max(24)
  }),
  handleHide: (value, { props }) => {
    props.handleHide();
  },
  handleSubmit: (values, { props }) => {
    if (values._id === undefined) {
      props.handleSave(values, props.filter);
    } else {
      props.handleUpdate(values, props.filter);
    }
  },
  displayName: "TaskForm" // helps with React DevTools
})(TaskForm);

export default TaskForm;
