import React, { useState } from 'react';
import NoteList from './component/NoteList';
import NoteFormModal from './component/NoteForm';
import { getInitialData } from './utilities/data';
import HeroImage from './aset/hero.png';
import Swal from 'sweetalert2';
import { AiOutlineSearch } from 'react-icons/ai';
import Footer from './component/Footer';

function App() {
  // state data
  const [notes, setNotes] = useState(getInitialData());
  const [searchData, setSearchData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // conditional status notes
  const activeNotes = notes.filter(note => !note.archived);
  const archivedNotes = notes.filter(note => note.archived);

  // searching filter
  const filteredActiveNotes = activeNotes.filter(note =>
    note.title.toLowerCase().includes(searchData.toLowerCase())
  );
  const filteredArchivedNotes = archivedNotes.filter(note =>
    note.title.toLowerCase().includes(searchData.toLowerCase())
  );

  // swal
  const deleteNote = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your note has been deleted.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // archive notes
  const toggleArchiveNote = (id) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-5">
      <header className="relative mb-10">
        <img
          src={HeroImage}
          alt="Notes App Banner"
          className="w-full h-[60vh] object-cover rounded-lg shadow-lg"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">Notes App</h1>
            <p className="text-lg">Wrote anything you think here!</p>
          </div>
        </div>
      </header>

      <div className="flex justify-between items-center mb-5">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-transform transform hover:scale-105"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Notes
        </button>
        <div className="relative">
          <AiOutlineSearch className="absolute left-3 top-2 text-gray-500" />
          <input
            type="text"
            className="pl-10 p-3 border border-gray-300 rounded-lg w-72 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search notes..."
          />
        </div>
      </div>

      {/*  active notes */}
      <NoteList
        notes={filteredActiveNotes}
        onDeleteNote={deleteNote}
        onToggleArchive={toggleArchiveNote}
        isArchived={false}
      />

      {/*  archive notes */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Archived Notes</h2>
      <NoteList
        notes={filteredArchivedNotes}
        onDeleteNote={deleteNote}
        onToggleArchive={toggleArchiveNote}
        isArchived={true}
      />

      {/* modal add notes */}
      {isModalOpen && (
        <NoteFormModal setNotes={setNotes} setIsModalOpen={setIsModalOpen} />
      )}
      <Footer />
    </div>
  );
}

export default App;
