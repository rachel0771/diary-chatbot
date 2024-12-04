import React, { useState } from "react";
import Modal from "react-modal";

const customModalStyles = {
    content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        borderRadius: "15px",
        width: "400px", // 调整宽度适配网页
        height: "auto",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#fdfbf3",
    },
};

Modal.setAppElement("#root");

const DiaryOverview = () => {
    const diaryPosts = [
        {
            content: "You did a great job on the project presentation.",
            advantage: "Confident",
            person: "Alex",
        },
        {
            content: "Your kindness to help others is inspiring.",
            advantage: "Kind",
            person: "Taylor",
        },
        {
            content: "You showed incredible patience and determination.",
            advantage: "Patient",
            person: "Jordan",
        },
        {
            content: "Your creativity in designing the new layout was amazing.",
            advantage: "Creative",
            person: "Sam",
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPost, setNewPost] = useState({ content: "", advantage: "", person: "" });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
                    onClick={() => alert("New post created!")}
                    style={{ padding: "10px 20px", backgroundColor: "#a8c3a1", border: "none", color: "#fff", borderRadius: "5px" }}
                >
                    Save
                </button>
            </Modal>
        </div>
    );
};

export default DiaryOverview;
