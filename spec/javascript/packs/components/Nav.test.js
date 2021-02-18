import React from "react";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Nav from "components/Nav";

import "@testing-library/jest-dom/extend-expect";

describe("TaskFormModal", () => {
  const handleClose = jest.fn();
  const handleClickOpen = jest.fn();
  const open = true;
  let setIsLoading;
  let setNewTaskAdded;
  it("should render correctly", () => {
    const { getByText } = render(
      <Nav
        handleClose={handleClose}
        open={open}
        handleClickOpen={handleClickOpen}
        setNewTaskAdded={setNewTaskAdded}
        setIsLoading={setIsLoading}
      />
    );
    expect(getByText("Tasks")).toBeInTheDocument();
  });

  xit("calls handleClickOpen prop when clicked", async () => {
    const { getByRole } = render(
      <Nav
        handleClose={handleClose}
        open={open}
        handleClickOpen={handleClickOpen}
        setNewTaskAdded={setNewTaskAdded}
        setIsLoading={setIsLoading}
      />
    );

    const addButton = getByRole("button", { name: /add/i });
    userEvent.click(addButton);
    expect(handleClickOpen).toHaveBeenCalledTimes(1);
  });
});
