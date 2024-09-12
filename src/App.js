import React, { useState } from "react";
import { getInitialData } from "./utilities/data";
import NoteForm from "./component/NoteForm.jsx";
import NoteList from "./component/NoteList.jsx";

function App() {
  const [data, setData] = useState(getInitialData());
  const [searchData, setSearchData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = data.filter(data =>
    data.title.toLowerCase().includes(searchData.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header text-center">
        <h1 className="font-bold text-4xl">Note List</h1>
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

      <NoteList data={filteredData} setData={setData} />

      {isModalOpen && (
        <NoteForm setNotes={setData} setModalOpen={setIsModalOpen} />
      )}
    </div>
  );
}

export default App;
