import React, { useState } from 'react';
import Swal from 'sweetalert2';

function NoteFormModal({ setNotes, setIsModalOpen }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [charCount, setCharCount] = useState(50);

    // initiation submit
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

        // swal
        Swal.fire({
            icon: 'success',
            title: 'Note Added!',
            text: 'Your note has been successfully added.',
            timer: 1500,
            showConfirmButton: false,
        });
    };

    // limitation notes title character
    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setTitle(value);
            setCharCount(50 - value.length);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-96 transform transition-all duration-300">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add a New Note</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-gray-700 font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Enter note title"
                            required
                        />
                        <p className="text-sm text-gray-500 mt-1 text-right">{charCount} characters left</p>
                    </div>

                    <div className="mb-5">
                        <label className="block text-gray-700 font-semibold mb-2">Body</label>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                            rows="5"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Write your note here..."
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-2 px-5 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400 transition-colors"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
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
