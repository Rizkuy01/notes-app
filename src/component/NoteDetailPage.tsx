import { useParams, useNavigate } from "react-router-dom";
import { Note, fetchNoteDetail } from "../api/NoteService";
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";


const NoteDetailPage = () => {
    const noteId = useParams<{ noteId: string }>().noteId ?? "";
    const navigate = useNavigate();
    const [note, setNote] = useState<Note>();

    useEffect(() => {
        (async () => {
            const response = await fetchNoteDetail(noteId);

            setNote(response.data.note)
        })()
    }, [noteId])

    const handleBackClick = () => {
        const toastId = toast.loading('Navigating back...');
        setTimeout(() => {
            toast.dismiss(toastId);
            navigate('/notes');
        }, 1000); 
    };

    if (!note) {
        return <p className="text-center">Note not found!</p>;
    }

    return (
        <div className="min-h-screen bg-gray-500 p-5 dark:bg-blue-950">
            <button
                className="mb-5 px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition"
                onClick={handleBackClick}
            >
                Back to Notes
            </button>

            <div className="bg-white p-6 shadow-lg rounded-lg min-h-500">
                <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
                <p className="text-gray-500 dark:text-gray-800 mb-2">{note.createdAt}</p>
                <p className="text-gray-700">{note.body}</p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default NoteDetailPage;
