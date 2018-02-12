import React from "react";
import { withFormik, Form } from "formik";

import FlatButton from "material-ui/FlatButton";
import CustomDatePicker from "../../commons/CustomDatePicker";

let FilterTaskForm = props => {
  const {
    values,
    handleSubmit,
    handleExport,
    tasks
  } = props;

  console.log(props)

  const styles = {
    formFilter: {
      flexWrap: 'wrap'
    }
  }

  return (
    <Form className="form" style={styles.formFilter} onSubmit={handleSubmit}>
      <CustomDatePicker 
        hintText="From" 
        name="from" 
        autoOk={true} 
      />
      <CustomDatePicker 
        hintText="To" 
        name="to" 
        autoOk={true} 
      />
       <FlatButton
          type="submit"
          label="Filter"
          primary={true}
          keyboardFocused={true}
      />
      {tasks && 
        <FlatButton
            label="Export"
            type="button"
            secondary={true}
            onClick={() => handleExport(values)}
            keyboardFocused={true}
        />
      }   
    </Form>
  );
};
FilterTaskForm = withFormik({
  mapPropsToValues: props => {
      return {
        from: undefined,
        to: undefined
      };
  },
  handleSubmit: (values, { props }) => {
    props.filterByPeriod(values);
  },
  displayName: "FilterForm" // helps with React DevTools
})(FilterTaskForm);

export default FilterTaskForm;
