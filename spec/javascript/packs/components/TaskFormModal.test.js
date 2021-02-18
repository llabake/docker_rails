import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import TaskFormModal from "components/TaskFormModal";

describe("TaskFormModal", () => {
  const handleClose = jest.fn();
  const open = true;
  let setIsLoading;
  let setNewTaskAdded;
  it("should render correctly", function () {
    const { getByText } = render(
      <TaskFormModal
        handleClose={handleClose}
        open={open}
        setIsLoading={setIsLoading}
        setNewTaskAdded={setNewTaskAdded}
      />
    );
    expect(getByText("Task Description")).toBeInTheDocument();
  });

  it("calls handleClose prop when clicked", () => {
    render(
      <TaskFormModal
        handleClose={handleClose}
        open={open}
        setIsLoading={setIsLoading}
        setNewTaskAdded={setNewTaskAdded}
      />
    );

    fireEvent.click(screen.getByText(/cancel/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
