import axios from "axios";

const API_URL = 'https://notes-api-knacademy.vercel.app/api';

export interface Notes {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    archived: boolean;
}

// REVIEW: KALO GA KE PAKE HAPUS FILENYA