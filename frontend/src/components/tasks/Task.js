import React from "react";
import moment from "moment";

import {
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from "material-ui/RaisedButton";

const Task = props => {

  const { task, handleRemove, handleEdit } = props;

  const formatDate = (date) => moment(date).format("DD.MM.YYYY");

  return (
      <TableRow selectable={false} style={{backgroundColor: 'pink'}}>
        <TableRowColumn style={{width: '15%'}}>{formatDate(task.day) || '-'}</TableRowColumn>
        <TableRowColumn style={{width: '15%'}}>{task.timeSpent || '-'}</TableRowColumn>
        <TableRowColumn style={{width: '15%'}}>{formatDate(task.createdAt) || '-'}</TableRowColumn>
        <TableRowColumn style={{width: '35%'}}>{task.note || '-'}</TableRowColumn>
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
