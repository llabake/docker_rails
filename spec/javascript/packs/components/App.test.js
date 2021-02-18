import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "components/App";
import axios from "axios";

jest.mock("axios");
describe("App", () => {
  const tasks = [
    {
      id: 1,
      description: "Test description",
      avatar_url: "https://loremflickr.com/100/100",
      completed: true,
      completed_at: new Date(),
    },
    {
      id: 2,
      description: "Test description 2",
      avatar_url: "https://loremflickr.com/100/100",
      completed: false,
      completed_at: null,
    },
  ];

  test.only("renders App component", async () => {
    await act(async () => {
      await axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: tasks })
      );

      render(<App />);
    });

    expect(screen.getByText("Tasks")).toBeInTheDocument();
    expect(screen.getByLabelText("add")).toBeInTheDocument();

    const listElement = screen.getByRole("list");
    const listItems = screen.getAllByRole("listitem");
    expect(listElement).toBeInTheDocument();
    expect(listItems.length).toEqual(2);

    tasks.forEach((task) => {
      expect(screen.getByText(task.description)).toBeInTheDocument();
    });
  });
});
