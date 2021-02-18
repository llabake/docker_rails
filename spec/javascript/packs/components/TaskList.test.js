import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TaskList from "components/TaskList";

describe("TaskList", () => {
  const handleCheck = jest.fn();
  const tasks = [
    {
      id: 1,
      description: "Test Description 1",
      avatar_url: "https://loremflickr.com/100/100",
      completed: true,
      completed_at: new Date(),
    },
    {
      id: 2,
      description: "Test Description 2",
      avatar_url: "https://loremflickr.com/100/100",
      completed: false,
      completed_at: null,
    },
  ];

  it("should render correctly", function () {
    const { getByRole, getByText, getAllByRole } = render(
      <TaskList handleCheck={handleCheck} tasks={tasks} />
    );
    const listElement = getByRole("list");
    const listItems = getAllByRole("listitem");
    expect(listElement).toBeInTheDocument();
    expect(listItems.length).toEqual(2);
    tasks.forEach((task) => {
      expect(getByText(task.description)).toBeInTheDocument();
    });
  });

  it("it calls handle check", () => {
    const { getByRole, rerender } = render(
      <TaskList handleCheck={handleCheck} tasks={tasks} />
    );
    const checkbox = getByRole("checkbox", { value: "" });
    userEvent.click(checkbox);
    expect(handleCheck).toHaveBeenCalledTimes(1);
  });
});
