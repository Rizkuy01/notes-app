import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import AppRoutes from './routes/Routes';
import './index.css';

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

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <div className={isDarkMode ? 'dark' : ''}>
            <AppRoutes notes={notes} setNotes={setNotes} />
            {/* Button Ubah Tema */}
            <button
              className="fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
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
