import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DiaryOverview from "../components/DiaryOverview";
import { fetchDiaryEntries, addDiaryEntry } from "../services/api";

jest.mock("../services/api");

test("renders DiaryOverview correctly and shows latest diary entries", async () => {
    fetchDiaryEntries.mockResolvedValueOnce({
        data: [
            { content: "First Entry", advantage: "Creative", person: "Alice" },
            { content: "Second Entry", advantage: "Kind", person: "Bob" },
        ],
    });

    render(<DiaryOverview />);

    expect(await screen.findByText("First Entry")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
});

test("adds a new diary entry", async () => {
    fetchDiaryEntries.mockResolvedValueOnce({ data: [] });
    addDiaryEntry.mockResolvedValueOnce({});

    render(<DiaryOverview />);

    fireEvent.click(screen.getByText("+"));
    fireEvent.change(screen.getByPlaceholderText("Content"), { target: { value: "New Content" } });
    fireEvent.change(screen.getByPlaceholderText("Advantage"), { target: { value: "Friendly" } });
    fireEvent.change(screen.getByPlaceholderText("Person"), { target: { value: "Alex" } });

    fireEvent.click(screen.getByText("Save"));

    expect(await screen.findByText("New Content")).toBeInTheDocument();
});
