import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ActivityTable } from "../ActivityTable";
import { ActivityData } from "../../../backend/types";

describe("ActivityTable", () => {
  const mockActivities: ActivityData[] = [
    {
      user_id: "123",
      application_id: "795630",
      end_time: "2020-02-02 09:30:07",
      time_span: 9,
      window_title_id: "26079668",
      end_date: "2020-02-02",
      task_id: "0",
      entry_id: "0",
    },
    {
      user_id: "123",
      application_id: "795630",
      end_time: "2020-02-02 09:30:11",
      time_span: 4,
      window_title_id: "23745620",
      end_date: "2020-02-02",
      task_id: "0",
      entry_id: "0",
    },
  ];

  it("renders activity table with data", () => {
    render(<ActivityTable activities={mockActivities} />);

    expect(screen.getByText(/Activity Data/i)).toBeInTheDocument();
    expect(screen.getByText("2 records")).toBeInTheDocument();
  });

  it("displays all column headers", () => {
    render(<ActivityTable activities={mockActivities} />);

    expect(screen.getByText("User ID")).toBeInTheDocument();
    expect(screen.getByText("Application ID")).toBeInTheDocument();
    expect(screen.getByText("End Time")).toBeInTheDocument();
    expect(screen.getByText(/Time Span/i)).toBeInTheDocument();
    expect(screen.getByText("Window Title ID")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Task ID")).toBeInTheDocument();
    expect(screen.getByText("Entry ID")).toBeInTheDocument();
  });

  it("displays activity data in table rows", () => {
    render(<ActivityTable activities={mockActivities} />);

    expect(screen.getByText("2020-02-02 09:30:07")).toBeInTheDocument();
    expect(screen.getByText("2020-02-02 09:30:11")).toBeInTheDocument();
    expect(screen.getByText("26079668")).toBeInTheDocument();
    expect(screen.getByText("23745620")).toBeInTheDocument();
  });

  it("shows message when no activities match search", () => {
    render(<ActivityTable activities={[]} />);

    expect(
      screen.getByText(/No activities match your search criteria/i),
    ).toBeInTheDocument();
  });
});
