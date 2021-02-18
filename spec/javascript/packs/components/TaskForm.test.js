import React from "react";
import axios from "axios";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import TaskForm from "components/TaskForm";

const handleClose = jest.fn();
const data = {
  id: 1,
  description: "Test Description",
  avatar_url: "https://loremflickr.com/100/100",
  completed: false,
  completed_at: null,
};

const open = true;
const setNewTaskAdded = jest.fn(() => true);
const setIsLoading = jest.fn(() => true);
const setShowNotification = jest.fn(() => {});
jest.mock("axios");

const setup = () => {
  const utils = render(
    <TaskForm
      handleClose={handleClose}
      open={open}
      setIsLoading={setIsLoading}
      setNewTaskAdded={setNewTaskAdded}
      setShowNotification={setShowNotification}
    />
  );
  const description_input = utils.getByLabelText(/description/i);
  const avatar_url_input = utils.getByLabelText(/Avatar URL/i);
  return {
    description_input,
    avatar_url_input,
    ...utils,
  };
};

describe("TaskForm", () => {
  it("should submit the form after inputs have been added", async () => {
    const { description_input, avatar_url_input, getByText } = setup();
    await userEvent.type(description_input, "test description");
    await userEvent.type(avatar_url_input, "https://loremflickr.com/100/100");

    expect(description_input.value).toBe("test description");
    expect(avatar_url_input.value).toBe("https://loremflickr.com/100/100");

    const addButton = getByText(/ADD/i);
    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    userEvent.click(addButton);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });
});
