import React from "react";
import User from "./User";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';

let ListUsers = props => {
  const { user } = props;

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


  let userView = user.users.map(user => (
    <User style={styles.gridList} key={user._id} {...props} user={user} />
  ));

  return (
    <div>
      <h1 style={styles.titleStyle}>User Board</h1>
      <Table selectable={false}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{width: '25%'}}>Username</TableHeaderColumn>
              <TableHeaderColumn style={{width: '25%'}}>Role</TableHeaderColumn>
              <TableHeaderColumn style={{width: '25%'}}>Prefered Hours Per Day</TableHeaderColumn>
              <TableHeaderColumn style={{width: '25%'}}>Created At</TableHeaderColumn>
              <TableHeaderColumn style={{width: '25%'}}>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
             {userView}
          </TableBody>
        </Table>


    </div>
  );
};

export default ListUsers;
