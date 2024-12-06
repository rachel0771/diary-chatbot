import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Chatbot from "../components/Chatbot";
import { sendMessageToChatbot } from "../services/api";

jest.mock("../services/api");

test("renders Chatbot correctly", () => {
    render(<Chatbot />);
    expect(screen.getByPlaceholderText("Type a message (e.g., hello)")).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
});

test("sends a message and receives a response", async () => {
    sendMessageToChatbot.mockResolvedValueOnce({ data: { response: "You are a kind person." } });

    render(<Chatbot />);

    fireEvent.change(screen.getByPlaceholderText("Type a message (e.g., hello)"), { target: { value: "hello" } });
    fireEvent.click(screen.getByText("Send"));

    expect(await screen.findByText("You are a kind person.")).toBeInTheDocument();
});
