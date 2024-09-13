import React from 'react';
import { showFormattedDate } from '../utilities/data';

function NoteList({ notes, onDeleteNote, onToggleArchive, isArchived }) {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {notes.length > 0 ? (
                    notes.map(note => (
                        <div key={note.id} className="bg-white p-6 shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{note.title}</h3>
                            <p className="text-gray-500 text-sm mb-4">{showFormattedDate(note.createdAt)}</p>
                            <p className="text-gray-700 mb-4">{note.body}</p>

                            <div className="flex justify-between">
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                    onClick={() => onDeleteNote(note.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                    onClick={() => onToggleArchive(note.id)}
                                >
                                    {isArchived ? 'Move to Active' : 'Archive'}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No {isArchived ? 'archived' : 'active'} notes available.</p>
                )}
            </div>
        </div>
    );
}

export default NoteList;
