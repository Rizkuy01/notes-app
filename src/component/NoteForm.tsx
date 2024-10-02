import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { createNote, updateNote } from '../api/AuthService';

// Define Note interface
interface Note {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
}

// Define NoteFormModalProps interface
interface NoteFormModalProps {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteToEdit?: Note | null;
}

const NoteFormModal: React.FC<NoteFormModalProps> = ({ setNotes, setIsModalOpen, noteToEdit }) => {
  const [title, setTitle] = useState<string>(noteToEdit?.title ?? '');
  const [body, setBody] = useState<string>(noteToEdit?.body ?? '');
  const [charCount, setCharCount] = useState<number>(50 - (noteToEdit?.title?.length ?? 0));
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      if (noteToEdit) {
        // Update note
        const response = await updateNote(noteToEdit._id, title, body); 
        if (response) {
          setNotes(prevNotes =>
            prevNotes.map(note =>
              note._id === noteToEdit._id
                ? { ...note, title, body} 
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
        } else {
          throw new Error('Failed to update note');
        }
      } else {
        // Add new note
        const response = await createNote(title, body); 
        if (response) {
          setNotes(prevNotes => [response, ...prevNotes]);
          Swal.fire({
            icon: 'success',
            title: 'Note Added!',
            text: 'Your note has been successfully added.',
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          throw new Error('Failed to add note');
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        timer: 1500,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
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
              disabled={loading}
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
              {loading ? 'Loading...' : noteToEdit ? 'Update Note' : 'Add Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteFormModal;
