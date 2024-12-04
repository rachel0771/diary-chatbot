import React, { useEffect, useState } from "react";
import { getHighlight } from "../services/api";

const Highlight = () => {
    const [highlight, setHighlight] = useState(null);

    useEffect(() => {
        getHighlight()
            .then((response) => setHighlight(response.data))
            .catch((error) => console.error("Error fetching highlight:", error));
    }, []);

    return (
        <div>
            {highlight ? (
                <div>
                    <h2>Daily Highlight</h2>
                    <p><strong>Advantage:</strong> {highlight.advantage}</p>
                    <p><strong>Person:</strong> {highlight.person}</p>
                </div>
            ) : (
                <p>Loading highlight...</p>
            )}
        </div>
    );
};

export default Highlight;
