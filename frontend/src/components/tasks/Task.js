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

const Task = props => {

  const { task, handleNotes, handleRemove, handleEdit } = props;

  const style = {
    margin: 10
  }

  return (
    <div>
      <Card style={style}>
        <CardHeader
          title={task.taskname}
          actAsExpander={false}
          showExpandableButton={false}
        />
        <CardText>{Moment(task.timeSpent).format("MM dddd, hA")}</CardText>
        <CardTitle
          title="Card title"
          subtitle="Card subtitle"
          expandable={true}
        />
        <CardActions>
          <RaisedButton 
            primary={true} 
            label="EDIT" 
            onClick={() => handleEdit(task)} />
          <RaisedButton 
            secondary={true} 
            label="REMOVE" 
            onClick={() => handleRemove(task._id)} />
        </CardActions>
      </Card>
    </div>
  );
};

export default Task;
