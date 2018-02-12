import React from "react";
import { withFormik, Form } from "formik";

import FlatButton from "material-ui/FlatButton";
import CustomDatePicker from "../../commons/CustomDatePicker";

let TaskForm = props => {
  const {
    handleSubmit,
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
