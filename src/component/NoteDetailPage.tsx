import { useParams, useNavigate } from "react-router-dom";
import { Note } from "../api/AuthService";

interface NoteDetailPageProps {
    notes: Note[];
}

const NoteDetailPage: React.FC<NoteDetailPageProps> = ({ notes }) => {
    const { noteId } = useParams<{ noteId: string }>();
    const navigate = useNavigate();
    const note = notes.find(note => note._id === noteId);

    if (!note) {
        return <p className="text-center">Note not found!</p>;
    }

    return (
        <div className="min-h-screen bg-gray-500 p-5 dark:bg-blue-950">
            <button
                className="mb-5 px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition"
                onClick={() => navigate('/notes')}
            >
                Back to Notes
            </button>

            <div className="bg-white p-6 shadow-lg rounded-lg min-h-500">
                <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
                <p className="text-gray-500 mb-2">{note.createdAt}</p>
                <p className="text-gray-700">{note.body}</p>
            </div>
        </div>
    );
};

export default NoteDetailPage;
