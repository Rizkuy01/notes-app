//done REVIEW: PINDAHIN KE .env
import { Note } from "../models/NoteModels"
const API_URL = 'https://notes-api-knacademy.vercel.app/api';

// REVIEW: ini pisah ke folder Models dan hapus Interface Note dari sini

// export interface Note {
//   _id: string;
//   title: string;
//   body: string;
//   createdAt: string;
//   archived: boolean;
// }

interface DeleteResponse {
  success: boolean;
  message: string;
}

// Get user's notes
export const getUserNotes = async () => {
  const token = apiToken();

  if (!token) {
    console.error('Token is missing');
    return []; 
  }

  const response = await fetch(`${API_URL}/notes`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }

  const data = await response.json();
  return data.notes || []; 
};

// Create Note
export const createNote = async (title: string, body: string): Promise<Note> => {
  const token = apiToken();
    if (!token) {
      throw new Error('User not authenticated');
    }

  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body }),
  });
    if (!response.ok) {
      const errorMessage = await response.text(); 
      throw new Error(`Failed to create note: ${errorMessage}`);
    }
  const {data} = await response.json();
    if (!data.note || !data.note._id || !data.note.title || !data.note.body) {
      throw new Error('Invalid response format from server');
    }

  return data.note as Note;
};

// Delete Note
export const deleteNote = async (_id: string): Promise<DeleteResponse> => {
  const token = apiToken();
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${API_URL}/notes/${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to delete note: ${errorMessage}`);
  } else {
    console.log('Making request to:', `${API_URL}/notes/${_id}`);
  }

  const data = await response.json();
  if (!data) {
    throw new Error('Failed to delete note. Server did not confirm the deletion.');
  }

  return data as DeleteResponse;
};

// Update Note
export const updateNote = async (_id: string, title: string, body: string) => {
  const token = apiToken();

  if (!token) { 
    console.error('Token is missing');
    return;
  }

    const response = await fetch(`${API_URL}/notes/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      mode: 'cors',
      body: JSON.stringify({ title, body }), 
    });
    console.log('Response status:', response.status);

    if (!response.ok) {
      console.error('Error status:', response.status);
    }

    const result = await response.json();
    console.log('API response:', result);

    if (response.ok) {
      return result; 
    } else {
      console.error('Failed to update note:', result.message);
      return null;
    }
};

// Detail Note
export const fetchNoteDetail = async (noteId: string) => {
  const token = apiToken();

  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${API_URL}/notes/${noteId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to fetch note details: ${errorMessage}`);
  }

  const data = await response.json();
  return data; 
};


// Get Archived Notes
export const getArchivedNotes = async () => {
  const token = apiToken();

  if (!token) {
    console.error('Token is missing');
    return [];
  }

  const response = await fetch(`${API_URL}/notes/archived`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed tcatatano fetch archived notes');
  }

  const { data } = await response.json();
  return data.notes || [];
};

// Toggle unArchive Note
export const toggleArchiveUnarchiveNote = async (_id: string, uri : 'archive' | 'unarchive') => {
  const token = apiToken();

  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${API_URL}/notes/${_id}/${uri}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to toggle archive status: ${errorMessage}`);
  }

  const data = await response.json();
  return data;
};

// Toggle Archive Note
export const toggleArchiveNote = async (_id: string) => {
  const token = apiToken();

  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${API_URL}/notes/${_id}/archive`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to toggle archive status: ${errorMessage}`);
  }

  const data = await response.json();
  return data;
};

// REVIEW: BEST Practice, anda bisa memisahkan logika untuk localStorage ke Service Terpisah contoh 'CommonService'
// token
export const apiToken = () => {
  return localStorage.getItem('token');
}
