import { useState } from 'react';
import NoteDetailPage from './component/NoteDetailPage';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './component/AuthPage';
import NotePage from './component/NotePage';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

// Define Note type
interface Note {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // function darkmode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <div className={isDarkMode ? 'dark' : ''}>
            <Routes>
              <Route path="/" element={<AuthPage />} />
              {/* Notes */}
              <Route path="/notes" element={<NotePage notes={notes} setNotes={setNotes} />} />
              {/* Detail Notes */}
              <Route path="/notes/:noteId" element={<NoteDetailPage notes={notes} />} />
            </Routes>
            <button
              className="fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
