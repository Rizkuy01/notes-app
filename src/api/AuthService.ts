
const API_URL = 'https://notes-api-knacademy.vercel.app/api';

export interface Note {
  id: string;
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

  if (token) {
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
    return data;
  }

  return [];
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
};
