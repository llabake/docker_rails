import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Container,
  CircularProgress,
  Box,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import TaskList from './TaskList';

import Nav from './Nav';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    description: '',
    avatar_url: '',
    completed: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newTaskAdded, setNewTaskAdded] = useState(false);
  const [showNotification, setShowNotification] = useState({
    status: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);
    axios
      .get('/tasks')
      .then((res) => {
        setIsError(false);
        setTasks(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });

    return () => (isSubscribed = false); // unmounting the component
  }, [task, newTaskAdded]);

  useEffect(() => {
    if (newTaskAdded) {
      setNewTaskAdded(false);
    }
  }, [isLoading, newTaskAdded]);

  const handleSnackbarClose = () => {
    setShowNotification({ ...showNotification, status: false });
  };

  const handleCheck = (selectedTask) => {
    const updatedSelectedTask = {
      ...selectedTask,
      completed: !selectedTask.completed,
    };
    axios.put(`/tasks/${selectedTask.id}`, updatedSelectedTask).then((res) => {
      setTask(updatedSelectedTask);
      setShowNotification({
        ...showNotification,
        status: true,
        message: 'Task successfully updated',
      });
    });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Nav
          setIsLoading={setIsLoading}
          setNewTaskAdded={setNewTaskAdded}
          setShowNotification={setShowNotification}
        />
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <TaskList tasks={tasks} handleCheck={handleCheck} />
        )}
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showNotification.status}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={showNotification.severity || 'success'}
          >
            {showNotification.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default App;
