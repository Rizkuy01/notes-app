// src/components/NoteFormModal.js

import React, { useState } from 'react';

function NoteFormModal({ setNotes, setIsModalOpen }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [charCount, setCharCount] = useState(50);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = {
            id: "SHP" + new Date(),
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
        };
        setNotes(prevNotes => [newNote, ...prevNotes]);
        setIsModalOpen(false);
    };

    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setTitle(value);
            setCharCount(50 - value.length);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Add Note</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={title}
                            onChange={handleTitleChange}
                            required
                        />
                        <p className="text-sm text-gray-500 mt-1">{charCount} characters left</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Body</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="4"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NoteFormModal;
