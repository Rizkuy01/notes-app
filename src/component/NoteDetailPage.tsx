import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showFormattedDate } from "../utilities/data";


interface Note {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    archived: boolean;
    }

interface NoteDetailPageProps {
    notes: Note[];
}

const NoteDetailPage: React.FC<NoteDetailPageProps> = ({ notes }) => {
    const {noteId} = useParams<{ noteId: string}> ();
    const navigate = useNavigate();

    const note = notes.find(note => note.id === noteId);

    if(!note) {
        return <p className="text-center">Note not found!</p>
    }
        return (
            <div className="min-h-screen bg-gray-50 p-5">
            <button
                className="mb-5 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                onClick={() => navigate('/notes')}
            >
                Back to Notes
            </button>
        
            <div className="bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
                <p className="text-gray-500 mb-2">{showFormattedDate(note.createdAt)}</p>
                <p className="text-gray-700">{note.body}</p>
            </div>
            </div>
        );
}

export default NoteDetailPage;