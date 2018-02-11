import React from "react";
import Moment from "moment";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from "material-ui/RaisedButton";
import Toggle from "material-ui/Toggle";

const Task = props => {

  const { task, handleNotes, handleRemove, handleEdit } = props;

  const style = {
    margin: 10
  }

  return (
      <TableRow selectable={false}>
        <TableRowColumn style={{width: '30%'}}>{task.day || '-'}</TableRowColumn>
        <TableRowColumn style={{width: '20%'}}>{task.timeSpent || '-'}</TableRowColumn>
        <TableRowColumn style={{width: '25%'}}>{task.createdAt || '-'}</TableRowColumn>
        <TableHeaderColumn style={{width: '25%'}}>
            <RaisedButton 
              primary={true} 
              label="EDIT" 
              onClick={() => handleEdit(task)} />
            <RaisedButton 
              secondary={true} 
              label="REMOVE" 
              onClick={() => handleRemove(task._id)} />
        </TableHeaderColumn>
      </TableRow>
  );
};

export default Task;
