import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DiaryForm from "../components/DiaryForm";
import { addDiaryEntry } from "../services/api";

jest.mock("../services/api");

test("renders DiaryForm correctly", () => {
    render(<DiaryForm />);
    expect(screen.getByPlaceholderText("What happened today?")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Advantage tag")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Who said this?")).toBeInTheDocument();
});

test("submits new diary entry", async () => {
    addDiaryEntry.mockResolvedValueOnce({});

    render(<DiaryForm />);

    fireEvent.change(screen.getByPlaceholderText("What happened today?"), { target: { value: "My diary content" } });
    fireEvent.change(screen.getByPlaceholderText("Advantage tag"), { target: { value: "Hardworking" } });
    fireEvent.change(screen.getByPlaceholderText("Who said this?"), { target: { value: "Jane" } });

    fireEvent.click(screen.getByText("Add Entry"));

    expect(addDiaryEntry).toHaveBeenCalledWith({
        content: "My diary content",
        advantage: "Hardworking",
        person: "Jane",
        date: expect.any(String),
    });
});
