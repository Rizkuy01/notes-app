const API_URL = 'https://notes-api-knacademy.vercel.app/api';

export interface Note {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
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
    return []; // Kembalikan array kosong jika tidak ada token
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
  return data.notes || []; // Mengembalikan data notes, atau array kosong jika tidak ada
};



// Create Note
export const createNote = async (title: string, body: string) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body }),
  });

  if (!response.ok) {
    throw new Error('Failed to create note');
  }

  const data = await response.json();
  return data;
};

// Edit Note
// export const updateNote = async (noteId: string, title: string, body: string) => {
//   const token = localStorage.getItem('accessToken');
//   const response = await axios.patch(
//     `https://notes-api-knacademy.vercel.app/notes/${noteId}`,
//     { title, body },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return response.data;
// };

// Update Note
export const updateNote = async (noteId: string, title: string, body: string) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token is missing');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/notes/${noteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body }), // Mengirim kedua title dan body
    });

    const result = await response.json();

    if (response.ok) {
      return result; // Mengembalikan respons dari API
    } else {
      console.error('Failed to update note:', result.message);
      return null;
    }
  } catch (error) {
    console.error('Error while updating note:', error);
    return null;
  }
};



// Logout
export const logout = () => {
  localStorage.removeItem('token');
};
