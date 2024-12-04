import React from "react";
import DiaryOverview from "../components/DiaryOverview";
import Chatbot from "../components/Chatbot";

const HomePage = () => (
    <div style={{ fontFamily: "'Playfair Display', serif", backgroundColor: "#fdfbf3", minHeight: "100vh" }}>
        <header style={{ textAlign: "center", padding: "20px", color: "#a8c3a1" }}>
            <h1>Spring Diary Garden</h1>
            <p style={{ fontSize: "18px", color: "#555" }}>Collect moments, nurture positivity, and grow daily inspiration.</p>
        </header>
        <DiaryOverview />
        <Chatbot />
    </div>
);

export default HomePage;
