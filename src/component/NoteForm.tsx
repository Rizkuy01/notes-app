import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { createNote, updateNote } from '../api/AuthService';

interface NoteFormModalProps {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteToEdit?: Note;
}

interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
}

const NoteFormModal: React.FC<NoteFormModalProps> = ({ setNotes, setIsModalOpen, noteToEdit }) => {
  const [title, setTitle] = useState<string>(noteToEdit ? noteToEdit.title : '');
  const [body, setBody] = useState<string>(noteToEdit ? noteToEdit.body : '');
  const [charCount, setCharCount] = useState<number>(50 - (noteToEdit ? noteToEdit.title.length : 0));
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (noteToEdit) {
      // Edit note
      try {
        setLoading(true);
        const response = await updateNote(noteToEdit.id, title, body);  // Panggil fungsi updateNote
        
        setNotes(prevNotes =>
          prevNotes.map(note =>
            note.id === noteToEdit.id
              ? { ...note, title: response.title, body: response.body } // Perbarui state notes
              : note
          )
        );

        Swal.fire({
          icon: 'success',
          title: 'Note Updated!',
          text: 'Your note has been successfully updated.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to update note. Please try again.',
          timer: 1500,
          showConfirmButton: false,
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Add new note
      try {
        setLoading(true);
        const response = await createNote(title, body);  // Panggil fungsi createNote
        
        setNotes(prevNotes => [response, ...prevNotes]); // Tambahkan note baru ke daftar notes

        Swal.fire({
          icon: 'success',
          title: 'Note Added!',
          text: 'Your note has been successfully added.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to add note. Please try again.',
          timer: 1500,
          showConfirmButton: false,
        });
      } finally {
        setLoading(false);
      }
    }

    setIsModalOpen(false); // Tutup modal setelah selesai
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setTitle(value);
      setCharCount(50 - value.length);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 transform transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {noteToEdit ? 'Edit Note' : 'Add a New Note'}
        </h2>
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
              disabled={loading} // Disable saat loading
            />
            <p className="text-sm text-gray-500 mt-1 text-right">{charCount} characters left</p>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">Body</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your note here..."
              required
              disabled={loading} 
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-5 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400 transition-colors"
              onClick={() => setIsModalOpen(false)}
              disabled={loading} 
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
              disabled={loading} 
            >
              {loading ? 'Loading...' : (noteToEdit ? 'Update Note' : 'Add Note')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteFormModal;
