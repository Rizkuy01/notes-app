import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <LanguageProvider>
      <ThemeProvider>
          <div className={isDarkMode ? 'dark' : ''}>
            < Outlet />
            {/* Button Ubah Tema */}
            <button
              className="fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>

          </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
