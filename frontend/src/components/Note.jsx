import React from "react";

function Note({ note, deleteNote }) {
  
  const date = new Date(note.create_at);

  return (
    <>
      <div className="note-card">
        <h3 className="note-title">{note.title}</h3>
        <p className="note-content">{note.content}</p>
        <p className="note-date">{date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
        <button className="delete-button" onClick={() => deleteNote(note.id)}>
          Delete
        </button>
      </div>
    </>
  );
}

export default Note;
