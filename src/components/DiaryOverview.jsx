import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { fetchDiaryEntries, addDiaryEntry } from "../services/api";  // 确保引入正确的 API 函数

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
    },
};

Modal.setAppElement("#root");

const DiaryOverview = () => {
    const [diaryPosts, setDiaryPosts] = useState([]);  // Initial state to store diary posts
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPost, setNewPost] = useState({ content: "", advantage: "", person: "" });

    // Fetch diary entries from the backend when the component mounts
    useEffect(() => {
        fetchDiaryEntries()
            .then((response) => setDiaryPosts(response.data))
            .catch((error) => console.error("Failed to fetch diary entries:", error));
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSaveEntry = () => {
        addDiaryEntry(newPost)
            .then(() => {
                alert("New post created successfully!");
                closeModal();
                // Update the diary posts list to include the new post
                setDiaryPosts([...diaryPosts, newPost]);
                setNewPost({ content: "", advantage: "", person: "" });
            })
            .catch((error) => {
                console.error("Failed to create new post:", error);
                alert("Failed to create new post. Please try again.");
            });
    };

    return (
        <div style={{ padding: "20px", display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
            {diaryPosts.map((post, index) => (
                <div
                    key={index}
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "15px",
                        padding: "20px",
                        width: "250px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                    }}
                >
                    <p>{post.content}</p>
                    <p>
                        <strong>Advantage:</strong> {post.advantage}
                    </p>
                    <p>
                        <strong>Person:</strong> {post.person}
                    </p>
                </div>
            ))}
            <div
                style={{
                    border: "2px dashed #ccc",
                    borderRadius: "15px",
                    padding: "20px",
                    width: "250px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    cursor: "pointer",
                    backgroundColor: "#f5d5cb",
                    color: "#fff",
                }}
                onClick={openModal}
            >
                +
            </div>

            <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customModalStyles}>
                <h3 style={{ color: "#a8c3a1" }}>Create a New Post</h3>
                <input
                    type="text"
                    placeholder="Content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Advantage"
                    value={newPost.advantage}
                    onChange={(e) => setNewPost({ ...newPost, advantage: e.target.value })}
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Person"
                    value={newPost.person}
                    onChange={(e) => setNewPost({ ...newPost, person: e.target.value })}
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />
                <button onClick={closeModal} style={{ marginRight: "10px", padding: "10px 20px", backgroundColor: "#f5d5cb", border: "none", color: "#fff", borderRadius: "5px" }}>
                    Cancel
                </button>
                <button
                    onClick={handleSaveEntry}
                    style={{ padding: "10px 20px", backgroundColor: "#a8c3a1", border: "none", color: "#fff", borderRadius: "5px" }}
                >
                    Save
                </button>
            </Modal>
        </div>
    );
};

export default DiaryOverview;
