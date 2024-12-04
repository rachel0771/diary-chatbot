import React, { useState } from "react";
import Modal from "react-modal";
import { sendMessageToChatbot } from "../services/api"; // API function to interact with the backend

const customModalStyles = {
    content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        borderRadius: "15px",
        width: "400px",
        height: "auto",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#fdfbf3",
        textAlign: "center",
    },
};

Modal.setAppElement("#root");

const Chatbot = () => {
    const [message, setMessage] = useState(""); // User input message
    const [response, setResponse] = useState(""); // Chatbot's response
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    // Handle sending the message
    const handleSendMessage = () => {
        if (message.trim().toLowerCase() === "hello") {
            sendMessageToChatbot(message)
                .then((data) => {
                    setResponse(data.response || "No response from the chatbot.");
                    setIsModalOpen(true);
                })
                .catch((err) => {
                    console.error("Error communicating with the chatbot:", err);
                    setResponse("Failed to communicate with the chatbot. Please try again.");
                    setIsModalOpen(true);
                });
        } else {
            setResponse("Please type 'hello' to get a motivational message.");
            setIsModalOpen(true);
        }
        setMessage(""); // Clear the input field
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: "0",
                width: "100%",
                backgroundColor: "#f5f5f5",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                borderTop: "1px solid #ccc",
            }}
        >
            <input
                type="text"
                value={message}
                placeholder="Type a message (e.g., hello)"
                onChange={(e) => setMessage(e.target.value)}
                style={{
                    flex: "1",
                    padding: "10px",
                    marginRight: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
            <button
                onClick={handleSendMessage}
                style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#007bff",
                    color: "white",
                    cursor: "pointer",
                }}
            >
                Send
            </button>

            {/* Modal to show the chatbot's response */}
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={customModalStyles}>
                <p>{response}</p>
                <button
                    onClick={() => setIsModalOpen(false)}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        marginTop: "10px",
                    }}
                >
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default Chatbot;
