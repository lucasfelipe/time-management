import React from "react";
import { withFormik, Field, Form } from "formik";
import Yup from "yup";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import CustomTextField from "../../commons/CustomTextField";
import DatePicker from "material-ui/DatePicker";
import CustomDatePicker from "../../commons/CustomDatePicker";
import CustomSelectField from "../../commons/CustomSelectField";

let TaskForm = props => {
  const {
    values,
    handleReset,
    handleSubmit,
    handleChange,
    handleBlur,
    handleHide
  } = props;

  const styles = {
    formFilter: {
      flexWrap: 'wrap'
    }
  }

  return (
    <Form className="form" style={styles.formFilter} onSubmit={handleSubmit}>
      <CustomDatePicker 
        hintText="date" 
        name="from" 
        autoOk={true} 
      />
      <CustomDatePicker 
        hintText="date" 
        name="to" 
        autoOk={true} 
      />
       <FlatButton
        key="submit_button"
        type="submit"
        label="Filter"
        primary={true}
        keyboardFocused={true}
    />
    </Form>
  );
};
TaskForm = withFormik({
  mapPropsToValues: props => {
      return {
        from: "",
        to: ""
      };
  },
  handleSubmit: (values, { props }) => {


    props.filterByPeriod(values);
    // console.log(values);
    // if (values._id === undefined) {
    //   props.handleSave(values);
    // } else {
    //   props.handleUpdate(values);
    // }
  },
  displayName: "FilterForm" // helps with React DevTools
})(TaskForm);

export default TaskForm;
