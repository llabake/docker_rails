import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import TaskFormModal from './TaskFormModal';

const useStyles = makeStyles((theme) => ({
  tasks: {
    flex: 1,
  },
}));

const Nav = ({ setIsLoading, setNewTaskAdded, setShowNotification }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.tasks}>
            Tasks
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="add"
            size="medium"
            onClick={handleClickOpen}
          >
            <Add />
          </IconButton>
          <TaskFormModal
            open={open}
            handleClose={handleClose}
            setIsLoading={setIsLoading}
            setNewTaskAdded={setNewTaskAdded}
            setShowNotification={setShowNotification}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
