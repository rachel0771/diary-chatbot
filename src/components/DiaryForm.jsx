import React, { useState } from "react";
import { addDiaryEntry } from "../services/api";

const DiaryForm = () => {
    const [content, setContent] = useState("");
    const [advantage, setAdvantage] = useState("");
    const [person, setPerson] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addDiaryEntry({ content, advantage, person, date: new Date().toISOString() })
            .then(() => {
                alert("Diary entry added!");
                setContent("");
                setAdvantage("");
                setPerson("");
            })
            .catch((error) => console.error("Error adding diary entry:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Diary Entry</h2>
            <input
                type="text"
                value={content}
                placeholder="What happened today?"
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <input
                type="text"
                value={advantage}
                placeholder="Advantage tag"
                onChange={(e) => setAdvantage(e.target.value)}
                required
            />
            <input
                type="text"
                value={person}
                placeholder="Who said this?"
                onChange={(e) => setPerson(e.target.value)}
                required
            />
            <button type="submit">Add Entry</button>
        </form>
    );
};

export default DiaryForm;
