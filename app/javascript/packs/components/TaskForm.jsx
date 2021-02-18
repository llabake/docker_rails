import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  addButtonContainer: {
    marginTop: '20px',
  },
}));

const TaskForm = ({
  handleClose,
  setIsLoading,
  setNewTaskAdded,
  setShowNotification,
}) => {
  const styles = useStyles();
  const [task, setTask] = useState({ description: '', avatar_url: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    handleSubmit(task);
  };

  const handleSubmit = (task) => {
    setIsLoading(true);

    axios
      .post(
        '/tasks',
        {
          task,
        },
        { withCredentials: true },
      )
      .then((res) => {
        setShowNotification({
          status: true,
          message: 'New task successfully added',
          severity: 'success',
        });
        handleClose();
        setIsLoading(false);
        setNewTaskAdded(true);
        setTask({ description: '', avatar_url: '' });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <TextField
          label="Task Description"
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          fullWidth
          inputProps={{ minLength: 3 }}
          required
        />
        <TextField
          label="Avatar URL"
          id="avatar_url"
          name="avatar_url"
          value={task.avatar_url}
          onChange={handleChange}
          inputProps={{ type: 'url' }}
          fullWidth
          required
        />
        <Box textAlign="center" className={styles.addButtonContainer}>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
export default TaskForm;
