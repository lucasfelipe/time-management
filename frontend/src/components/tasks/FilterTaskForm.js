import React from "react";
import { withFormik, Form } from "formik";
import Yup from "yup";
import FlatButton from "material-ui/FlatButton";
import CustomDatePicker from "../../commons/CustomDatePicker";
import CustomSelectField from "../../commons/CustomSelectField";

let FilterTaskForm = props => {
  const {
    values,
    users,
    currentUser,
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

  const usersMap = users.map(e => ({ value: e._id, text: e.username }));

  return (
    <Form className="form" style={styles.formFilter} onSubmit={handleSubmit}>
      <CustomDatePicker 
        hintText="Start" 
        name="from" 
        autoOk={true} 
      />
      <CustomDatePicker 
        hintText="End" 
        name="to" 
        autoOk={true} 
      />
      {/* roles to show or hide*/}
      {currentUser.role === 'ADMIN' && 
        <CustomSelectField
          floatingLabelText="User"
          options={usersMap}
          name="owner"
        />
      }
      
      <br />
      <FlatButton
          type="submit"
          label="Filter"
          primary={true}
          keyboardFocused={true}
      />
      {tasks && tasks[0] &&
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
    let { currentUser } = props;
    return {
      from: undefined,
      to: undefined,
      owner: currentUser._id
    };
  },
  validationSchema: Yup.object().shape({
    from: Yup.date().required(),
    to: Yup.date().required()
  }),
  handleSubmit: (values, { props }) => {
    let user = props.users.find(e => e._id === values.owner)
    props.filterByPeriod(values, user.preferedHoursPerDay);
  },
  displayName: "FilterForm" // helps with React DevTools
})(FilterTaskForm);

export default FilterTaskForm;
