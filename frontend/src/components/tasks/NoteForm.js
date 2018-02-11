import React, { Component } from "react";
import { connectModal } from "redux-modal";
import { withFormik } from "formik";
import Yup from "yup";
import FlatButton from "material-ui/FlatButton";
import CustomTextField from "../../commons/CustomTextField"

let NoteForm = props => {
  const { values, errors, touched, handleSubmit, handleHide } = props;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <CustomTextField 
        hintText="Note"
        fullWidth={true}
        floatingLabelText="Note" 
        name="note" />
      <FlatButton
        type="submit"
        label="Add Note"
        secondary={true}
        onClick={handleSubmit}
      />
    </form>
  );
};

NoteForm = withFormik({
  mapPropsToValues: () => ({
    note: ""
  }),
  validationSchema: Yup.object().shape({
    note: Yup.string().required("Note is required")
  }),
  handleHide: (_, { props }) => {
    props.handleHide();
  },
  handleSubmit: (values, { props }) => {
    props.handleAddNote(props.task, values.note);
  },
  displayName: "NoteForm"
})(NoteForm);

export default NoteForm;
