import React, { useState, useEffect } from 'react';
import NoteList from './NoteList';
import Footer from './Footer';
import Swal from 'sweetalert2';
import { useLanguage } from '../context/LanguageContext';
import HeroImage from '../aset/hero.png';
import { AiOutlineSearch } from 'react-icons/ai';
import NoteFormModal from './NoteForm';
import { useNavigate } from 'react-router-dom';
import { deleteNote as deleteNoteAPI , toggleArchiveUnarchiveNote as ArchiveNote} from '../api/NoteService';
import { toast, ToastContainer } from 'react-toastify';


const NotePage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchData, setSearchData] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const activeNotes = notes ? notes.filter(note => !note.archived) : [];
  const archivedNotes = notes ? notes.filter(note => note.archived) : [];

  const filteredActiveNotes = activeNotes.filter(note =>
    (note.body?.toLowerCase() || '').includes(searchData.toLowerCase())
  );

  const filteredArchivedNotes = archivedNotes.filter(note =>
    (note.body?.toLowerCase() || '').includes(searchData.toLowerCase())
  );

  // useEffect to fetch notes from API
  useEffect(() => {
    const fetchNotesFromAPI = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://notes-api-knacademy.vercel.app/api/notes', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const { data } = await response.json();
        console.log(data);
        setNotes(data.notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
        Swal.fire({
          icon: 'error',
          title: language === 'id' ? 'Gagal' : 'Failed',
          text: language === 'id' ? 'Tidak dapat mengambil catatan dari server.' : 'Unable to fetch notes from server.'
        });
      }
    };

    fetchNotesFromAPI();
  }, [setNotes, language]);

  // Delete note function with API call
  const handleDeleteNote = async (id: string) => {
    const result = await Swal.fire({
      title: language === 'id' ? 'Apakah Anda yakin?' : 'Are you sure?',
      text: language === 'id' ? 'Anda tidak akan dapat mengembalikannya!' : "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: language === 'id' ? 'Ya, hapus!' : 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        toast.info(language === 'id' ? 'Menghapus catatan...' : 'Deleting note...', { autoClose: false });
        await deleteNoteAPI(id); 
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));

        toast.dismiss();
        toast.success(language === 'id' ? 'Catatan berhasil dihapus!' : 'Note deleted successfully!');

        Swal.fire({
          icon: 'success',
          title: language === 'id' ? 'Dihapus!' : 'Deleted!',
          text: language === 'id' ? 'Catatan Anda telah dihapus.' : 'Your note has been deleted.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        toast.dismiss();
        console.error('Error deleting note:', error);

        toast.error(language === 'id' ? 'Gagal menghapus catatan.' : 'Failed to delete note.');

        Swal.fire({
          icon: 'error',
          title: language === 'id' ? 'Gagal Menghapus' : 'Failed to Delete',
          text: language === 'id' ? 'Tidak dapat menghapus catatan.' : 'Unable to delete note.',
        });
      }
    }
  };

  const toggleArchiveUnarchiveNote = async (id: string, uri: 'archive' | 'unarchive') => {
    try {
      toast.info(language === 'id' ? `Mengubah status catatan...` : 'Toggling note status...', { autoClose: false });
      const response = await ArchiveNote(id, uri);
      if (response) {
        setNotes(prevNotes => prevNotes.map(note => (note._id === id ? { ...note, archived: !note.archived } : note)));
        toast.dismiss();
        toast.success(language === 'id' ? `Catatan berhasil di${uri === 'archive' ? 'arsipkan' : 'kembalikan'}.` : `Note ${uri === 'archive' ? 'archive' : 'unarchived'} successfully!`);
      } else {
        throw new Error('Failed to toggle note');
      }
    } catch (error) {
      toast.dismiss();
      console.error('Error toggling note archive status:', error);
      toast.error(language === 'id' ? 'Gagal mengubah status catatan.' : 'Failed to change note status.');
    }
  };

  const handleEditNote = (note: Note) => {
    if (note) {
      setNoteToEdit(note);
      setIsModalOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    Swal.fire({
      icon: 'success',
      title: language === 'id' ? 'Keluar' : 'Logged Out',
      text: language === 'id' ? 'Anda telah berhasil keluar.' : 'You have been logged out successfully.',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate('/auth');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-5 dark:bg-blue-950">
      <header className="relative mb-6 md:mb-10">
        <img
          src={HeroImage}
          alt="Notes App Banner"
          className="w-full h-[40vh] md:h-[60vh] object-cover rounded-lg shadow-lg"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
          <div className="text-center text-white px-4 md:px-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 opacity-80">Notes App</h1>
            <p className="text-base md:text-lg">Wrote anything you think here!</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-center p-2 mb-5 bg-green-600">
        <button
          className="px-4 py-2 md:px-6 md:py-3 bg-white text-green-600 rounded-lg shadow-lg hover:bg-gray-300 focus:ring-4 focus:ring-green-300 transition-transform transform hover:scale-105 mb-4 md:mb-0"
          onClick={() => {
            setNoteToEdit(null);
            setIsModalOpen(true);
          }}
        >
          + Add Notes
        </button>

        <div className="relative w-full md:w-auto">
          <AiOutlineSearch className="absolute left-3 top-2 text-gray-500" />
          <input
            type="text"
            className="pl-10 p-3 border border-gray-300 rounded-lg w-full md:w-72 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search notes..."
          />
        </div>
        <button
          className="mt-4 md:mt-0 ml-0 md:ml-5 px-4 py-2 md:px-6 md:py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition-transform transform hover:scale-105"
          onClick={handleLogout}
        >
          Logout
        </button>
        {/* Button Ubah Bahasa */}
        <button
          className="fixed bottom-16 right-4 p-3 mb-1 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          onClick={toggleLanguage}
        >
          {language === 'id' ? 'English' : 'Bahasa Indonesia'}
        </button>


      </div>

      {/* active notes */}
      <NoteList
        notes={filteredActiveNotes}
        onDeleteNote={handleDeleteNote}
        onToggleArchive={toggleArchiveUnarchiveNote}
        onEditNote={handleEditNote}
        isArchived={false}
      />

      {/* archived notes */}
      <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-gray-300">Archived Notes</h2>
      <NoteList
        notes={filteredArchivedNotes}
        onDeleteNote={handleDeleteNote}
        onToggleArchive={toggleArchiveUnarchiveNote}
        onEditNote={handleEditNote}
        isArchived={true}
      />

      {/* modal add notes */}
      {isModalOpen && (
        <NoteFormModal
          setNotes={setNotes}
          setIsModalOpen={setIsModalOpen}
          noteToEdit={noteToEdit}
        />
      )}

      <Footer />
      <ToastContainer />

    </div>
  );
};

export default NotePage;
