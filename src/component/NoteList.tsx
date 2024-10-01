import { useNavigate } from 'react-router-dom';

interface Note {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
}

interface NoteListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onEditNote: (note: Note) => void;
  isArchived: boolean;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
}

function NoteList({ notes, onDeleteNote, onToggleArchive, onEditNote, isArchived }: NoteListProps) {
  const navigate = useNavigate();
  


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {notes.length > 0 ? (
        notes.map(note => (
          <div
            key={note._id}
            className={`bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg transform transition duration-300 hover:scale-105 cursor-pointer ${
              isArchived ? 'opacity-70' : 'opacity-100'
            }`}
            onClick={() => navigate(`/notes/${note._id}`)}
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">{note.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{formatDate(note.createdAt)}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{note.body}</p>

            <div className="flex justify-between">
                {/* button edit */}
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                  onClick={(e) => {e.stopPropagation();onEditNote(note);}}
                >
                  Edit
                </button>
                {/* button delete */}
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    onClick={(e) => { e.stopPropagation(); onDeleteNote(note._id); }}
                >
                    Delete
                </button>
                {/* buttom archive */}
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    onClick={(e) => { e.stopPropagation(); onToggleArchive(note._id); }}
                >
                    {isArchived ? 'Move to Active' : 'Archive'}
                </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No {isArchived ? 'archived' : 'active'} notes available.</p>
      )}
    </div>
  );
}

export default NoteList;
