import React from "react";
import Task from "./Task";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

let ListTasks = props => {
  const { handleViewAll, handleAddNote, tasks } = props;

  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-arround'
    },
    gridList: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
    },
    titleStyle: {
      color: 'rgb(0, 188, 212)',
      textAlign: 'center'
    },
  };

  let taskView = tasks.map(task => (
    <Task key={task._id} style={styles.gridList}  {...props} task={task} />
  ));

  return (
    <div>
      <h1 style={styles.titleStyle}>Task Board</h1>
      <div style={styles.root}>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{width: '25%'}}>Date</TableHeaderColumn>
              <TableHeaderColumn style={{width: '25%'}}>TimeSpent</TableHeaderColumn>
              <TableHeaderColumn style={{width: '25%'}}>Created At</TableHeaderColumn>
              <TableHeaderColumn style={{width: '25%'}}>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
             {taskView}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListTasks;
