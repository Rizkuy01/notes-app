import { apiToken } from "./NoteService";

const API_URL = 'https://notes-api-knacademy.vercel.app/api';

// Register
export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to register: ${errorMessage}`);
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Failed to register: ' + error.message);
    } else {
      throw new Error('An unknown error occurred during registration');
    }
  }
};

// Login
export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to login: ${errorMessage}`);
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Failed to login: ' + error.message);
    } else {
      throw new Error('An unknown error occurred during login');
    }
  }
};

// Get user data
export const getUser = async () => {
  const token = apiToken();

  if (token) {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch user data: ${errorMessage}`);
      }

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Failed to fetch user data: ' + error.message);
      } else {
        throw new Error('An unknown error occurred during fetching user data');
      }
    }
  }

  return null;
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
};
