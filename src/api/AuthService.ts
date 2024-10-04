const API_URL = 'https://notes-api-knacademy.vercel.app/api';

export interface Note {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
}

interface DeleteResponse {
  success: boolean;
  message: string;
}

// Register
export const register = async (username: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error('Failed to register');
  }

  const data = await response.json();

  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};

// Login
export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  const data = await response.json();

  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  console.log(email);
  return data;
};

// Get user data
export const getUser = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data;
  }

  return null;
};

// Get user's notes
export const getUserNotes = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token is missing');
    return []; 
  }

  const response = await fetch(`${API_URL}/notes`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }

  const data = await response.json();
  return data.notes || []; 
};

// Create Note function
export const createNote = async (title: string, body: string): Promise<Note> => {
  const token = localStorage.getItem('token');
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
  const token = localStorage.getItem('token');
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
  const token = localStorage.getItem('token');

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

// Get Archived Notes
export const getArchivedNotes = async () => {
  const token = localStorage.getItem('token');

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
    throw new Error('Failed to fetch archived notes');
  }

  const { data } = await response.json();
  return data.notes || [];
};

// Toggle Archive Note
export const toggleArchiveNote = async (_id: string) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${API_URL}/notes/${_id}/archive`, {
    method: 'PUT',
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

// Logout
export const logout = () => {
  localStorage.removeItem('token');
};
