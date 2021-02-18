import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Checkbox,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const renderCheckBox = (task, handleCheck) => {
  return (
    <Checkbox
      id="completed"
      name="completed"
      edge="end"
      onChange={() => handleCheck(task)}
      checked={task.completed}
      inputProps={{ "aria-labelledby": task.id }}
    />
  );
};

const TaskList = ({ tasks, handleCheck }) => {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {tasks.map((task) => {
        const labelId = `checkbox-list-secondary-label-${task.id}`;
        return (
          <ListItem key={task.description} button>
            <ListItemAvatar>
              <Avatar alt={`Avatar`} src={task.avatar_url} />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={task.description} />
            <ListItemSecondaryAction>
              {task.completed
                ? moment(task.completed_at).format("h: mm A")
                : renderCheckBox(task, handleCheck)}
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  handleCheck: PropTypes.func.isRequired,
};

export default TaskList;
