import React from 'react';
import { showFormattedDate } from '../utilities/data';

function NoteList({ notes, onDeleteNote }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Active Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {notes.length > 0 ? (
                    notes.map(note => (
                        <div key={note.id} className="bg-white p-4 shadow rounded">
                            <h3 className="text-lg font-bold text-gray-800">{note.title}</h3>
                            <p className="text-gray-500 text-sm">{showFormattedDate(note.createdAt)}</p>
                            <p className="mt-2 text-gray-700">{note.body}</p>
                            <button
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => onDeleteNote(note.id)}
                            > </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Notes is Empty</p>
                )}
            </div>
        </div>
    );
}

export default NoteList;
