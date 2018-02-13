import React from "react";
import {List, ListItem} from 'material-ui/List';
import { formatDate } from "../../utils"

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

let ListTasks = props => {
  const { tasks, preferedHours } = props;

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

  let formatTotalTime = (totalTime) => `${totalTime}/ ${totalTime > 1 ? 'hs': 'h'}`

  let itemNote = (item, idx) => (<ListItem key={idx}  primaryText={item}  />)

  let taskView = tasks.map((task, i) => (
     <TableRow key={i} selectable={false} style={{backgroundColor: task.totalTime > preferedHours ? 'green': 'red'}}>
        <TableRowColumn style={{width: '25%'}}>{formatDate(task.day) || '-'}</TableRowColumn>
        <TableRowColumn style={{width: '15%'}}>{`${formatTotalTime(task.totalTime)}h` || '-'}</TableRowColumn>
        <TableRowColumn style={{width: '35%'}}>
          <List>
            {task.notes.map((e, idx) => itemNote(e, idx))}
          </List>
          </TableRowColumn>
      </TableRow>
  ));

  return (
      <div style={styles.root}>

         
        
        
        <Table selectable={false}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{width: '20%'}}>Date</TableHeaderColumn>
              <TableHeaderColumn style={{width: '20%'}}>TotalTime</TableHeaderColumn>
              <TableHeaderColumn style={{width: '35%'}}>Notes</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
             {taskView}
          </TableBody>
        </Table>
      </div>
  );
};

export default ListTasks;
