import React, { useState, useEffect } from 'react';
import NoteList from './NoteList';
import Footer from './Footer';
import Swal from 'sweetalert2';
import { useLanguage } from '../context/LanguageContext';
import HeroImage from '../aset/hero.png';
import { AiOutlineSearch } from 'react-icons/ai';
import NoteFormModal from './NoteForm';
import { useNavigate } from 'react-router-dom';

// Define Note type
interface Note {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
}

interface NotePageProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NotePage: React.FC<NotePageProps> = ({ notes, setNotes }) => {
  const [searchData, setSearchData] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
  const { language, toggleLanguage } = useLanguage();

  const activeNotes = notes ? notes.filter(note => !note.archived) : [];
  const archivedNotes = notes ? notes.filter(note => note.archived) : [];

  const filteredActiveNotes = activeNotes.filter(note =>
  (note.body?.toLowerCase() || '').includes(searchData.toLowerCase())
);
const filteredArchivedNotes = archivedNotes.filter(note =>
  (note.body?.toLowerCase() || '').includes(searchData.toLowerCase())
);


  const navigate = useNavigate();

  // useEffect to fetch notes from API
  useEffect(() => {
    const fetchNotesFromAPI = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://notes-api-knacademy.vercel.app/api/notes', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header with token
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const {data} = await response.json();
        console.log(data);
        setNotes(data.notes); // Assuming the API response has a `notes` array  
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

  const deleteNote = (id: string) => {
    Swal.fire({
      title: language === 'id' ? 'Apakah Anda yakin?' : 'Are you sure?',
      text: language === 'id' ? 'Anda tidak akan dapat mengembalikannya!' : "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: language === 'id' ? 'Ya, hapus!' : 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
        Swal.fire({
          icon: 'success',
          title: language === 'id' ? 'Dihapus!' : 'Deleted!',
          text: language === 'id' ? 'Catatan Anda telah dihapus.' : 'Your note has been deleted.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const toggleArchiveNote = (id: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note._id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  const handleEditNote = (note: Note) => {
    if (note){
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
      navigate('/'); 
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-5  dark:bg-blue-950">
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
          className="px-4 py-2 md:px-6 md:py-3 bg-white text-green-600 rounded-lg shadow-lg  hover:bg-gray-300 focus:ring-4 focus:ring-green-300 transition-transform transform hover:scale-105 mb-4 md:mb-0"
          onClick={() => setIsModalOpen(true)}
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
          className="hidden mt-4 md:mt-0 ml-0 md:ml-5 px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
          onClick={toggleLanguage}
        >
          {language === 'id' ? 'English' : 'Bahasa Indonesia'}
        </button>
      </div>

      {/* active notes */}
      <NoteList
        notes={filteredActiveNotes}
        onDeleteNote={deleteNote}
        onToggleArchive={toggleArchiveNote}
        onEditNote={handleEditNote}
        isArchived={false}
      />

      {/* archived notes */}
      <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-gray-300">Archived Notes</h2>
      <NoteList
        notes={filteredArchivedNotes}
        onDeleteNote={deleteNote}
        onToggleArchive={toggleArchiveNote}
        onEditNote={handleEditNote}
        isArchived={true}
      />

      {/* modal add notes */}
      {isModalOpen && noteToEdit && (
        <NoteFormModal setNotes={setNotes} setIsModalOpen={setIsModalOpen} noteToEdit={noteToEdit} />
      )}
      <Footer />
    </div>
  );
};

export default NotePage;
