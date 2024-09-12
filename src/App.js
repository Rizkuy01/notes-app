import React, { useState } from 'react';
import NoteList from './component/NoteList';
import NoteFormModal from './component/NoteForm';
import { getInitialData } from './utilities/data';
import HeroImage from './aset/hero.png';

function App() {
  const [notes, setNotes] = useState(getInitialData());
  const [searchData, setSearchData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchData.toLowerCase())
  );

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <header className="text-center mb-10">
        <img
          src={HeroImage}
          alt="Notes App Banner"
          className="w-full h-[60vh] object-cover"
        />
        <h1 className="text-3xl font-bold text-gray-800 py-3">Notes App</h1>
        <p className="text-gray-700">Wrote anything in your mind here!</p>
      </header>

      <div>
        <div className='addNotes text-center'>
          <button
            className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Notes
          </button>
        </div>

        <div className="flex justify-end mb-5">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-64"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>

      <NoteList notes={filteredNotes} setNotes={setNotes} onDeleteNote={deleteNote} />

      {isModalOpen && (
        <NoteFormModal setNotes={setNotes} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
}

export default App;
