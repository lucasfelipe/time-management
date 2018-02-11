import React from "react";
import User from "./User";

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
      
      <div style={styles.root}>{userView}</div>

    </div>
  );
};

export default ListUsers;
