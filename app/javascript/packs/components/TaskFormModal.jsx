import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import TaskForm from "./TaskForm";
import PropTypes from "prop-types"

const TaskFormModal = ({
  open,
  handleClose,
  setIsLoading,
  setNewTaskAdded,
  setShowNotification,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
      <DialogContent>
        <TaskForm
          handleClose={handleClose}
          setIsLoading={setIsLoading}
          setNewTaskAdded={setNewTaskAdded}
          setShowNotification={setShowNotification}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TaskFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default TaskFormModal;
