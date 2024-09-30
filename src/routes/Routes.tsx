import { Route, Routes } from 'react-router-dom';
import AuthPage from '../component/AuthPage';
import NotePage from '../component/NotePage';
import NoteDetailPage from '../component/NoteDetailPage';

interface Note {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
}

interface RoutesProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const AppRoutes = ({ notes, setNotes }: RoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/notes" element={<NotePage notes={notes} setNotes={setNotes} />} />
      <Route path="/notes/:noteId" element={<NoteDetailPage notes={notes} />} />
    </Routes>
  );
};

export default AppRoutes;
