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

const User = props => {
  const { user, handleEdit, handleRemove } = props;

  const style = {
    margin: 20
  }

  return (
      <TableRow selectable={false}>
        <TableRowColumn style={{width: '30%'}}>{user.username || '-'}</TableRowColumn>
        <TableRowColumn style={{width: '20%'}}>{user.role || '-'}</TableRowColumn>
        <TableRowColumn style={{width: '20%'}}>{user.preferedHoursPerDay || '-'}</TableRowColumn>
        <TableRowColumn style={{width: '25%'}}>{user.createdAt || '-'}</TableRowColumn>
        <TableHeaderColumn style={{width: '25%'}}>
            <RaisedButton primary={true} onClick={() => handleEdit(user)} label="Edit" />
            <RaisedButton secondary={true} onClick={() => handleRemove(user._id)} label="Remove" />
        </TableHeaderColumn>
      </TableRow>
  );
};

export default User;
