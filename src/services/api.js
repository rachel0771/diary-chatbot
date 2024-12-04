const API_BASE_URL = "http://127.0.0.1:5000";

export const fetchDiaryEntries = () =>
    fetch(`${API_BASE_URL}/diary`)
        .then((res) => res.json())
        .catch((err) => console.error("Error fetching diary entries:", err));

export const addDiaryEntry = (data) =>
    fetch(`${API_BASE_URL}/diary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((err) => console.error("Error adding diary entry:", err));

export const sendMessageToChatbot = (message) =>
    fetch(`${API_BASE_URL}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    })
        .then((res) => res.json())
        .catch((err) => {
            console.error("Error sending message to chatbot:", err);
            throw err;
        });
