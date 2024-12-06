// import axios
import axios from 'axios';

// import API URL
const API_BASE_URL = "https://diary-chatbot.onrender.com";


export const fetchDiaryEntries = () => axios.get(`${API_BASE_URL}/diary`);
export const addDiaryEntry = (data) => axios.post(`${API_BASE_URL}/diary`, data);
export const sendMessageToChatbot = (message) => axios.post(`${API_BASE_URL}/chatbot`, { message });