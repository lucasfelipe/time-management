import React from "react";
import Moment from "moment";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import Toggle from "material-ui/Toggle";

const User = props => {
  const { user, handleEdit, handleRemove } = props;

  const style = {
    margin: 20
  }

  return (
      <Card style={style}>
        <CardHeader
          title={user.username}
          actAsExpander={false}
          showExpandableButton={false}
        />
        <CardText>{user.preferedHoursPerDay}</CardText>
        <CardTitle
          title="Card title"
          subtitle="Card subtitle"
          expandable={true}
        />
        <CardText expandable={true} />
        <CardActions>
          <RaisedButton primary={true} onClick={() => handleEdit(user)} label="Edit" />
          <RaisedButton secondary={true} onClick={() => handleRemove(user._id)} label="Remove" />
        </CardActions>
      </Card>
  );
};

export default User;
