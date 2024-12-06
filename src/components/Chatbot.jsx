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

// Set the root element for accessibility purposes
Modal.setAppElement("#root");

const Chatbot = () => {
    const [message, setMessage] = useState(""); // User input message
    const [response, setResponse] = useState(""); // Chatbot's response
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    // Handle sending the message to the backend chatbot API
    const handleSendMessage = async () => {
        // Check if the input message is empty
        if (message.trim().length === 0) {
            setResponse("Please type a message.");
            setIsModalOpen(true);
            return;
        }

        try {
            // Send message to the backend chatbot API
            const { data } = await sendMessageToChatbot(message);
            // Check if the response contains the 'response' field
            if (data && data.response) {
                setResponse(data.response);
            } else {
                setResponse("No response from the chatbot.");
            }
        } catch (err) {
            console.error("Error communicating with the chatbot:", err);
            setResponse("Failed to communicate with the chatbot. Please try again.");
        }

        // Open the response modal
        setIsModalOpen(true);
        // Clear the input field
        setMessage("");
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
