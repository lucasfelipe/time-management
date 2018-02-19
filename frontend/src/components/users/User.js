import React from "react";
import { formatDate } from "../../utils"


import {
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import RaisedButton from "material-ui/RaisedButton";

const User = props => {
  const { user, handleEdit, handleRemove } = props;

  return (
      <TableRow selectable={false}>
        <TableRowColumn style={{width: '30%'}}>{user.username || '-'}</TableRowColumn>
        <TableRowColumn style={{width: '20%'}}>{user.role || '-'}</TableRowColumn>
        <TableRowColumn style={{width: '20%'}}>{user.preferedHoursPerDay || '-'}</TableRowColumn>
        <TableRowColumn style={{width: '25%'}}>{formatDate(user.createdAt) || '-'}</TableRowColumn>
        <TableHeaderColumn style={{width: '25%'}}>
            <RaisedButton primary={true} onClick={() => handleEdit(user)} label="Edit" />
            <RaisedButton secondary={true} onClick={() => handleRemove(user._id)} label="Remove" />
        </TableHeaderColumn>
      </TableRow>
  );
};

export default User;
