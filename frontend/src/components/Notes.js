// src/components/Notes.js
import React, { useState } from "react";

const Notes = ({ notes, onCreate, onDelete, upgradeNeeded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (upgradeNeeded) return alert("Upgrade to Pro to add more notes!");
    onCreate(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <>
      <style>{`
        .notes-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 600px;
          margin-bottom: 30px;
          font-family: Arial, sans-serif;
        }

        .notes-form input,
        .notes-form textarea {
          padding: 12px 15px;
          font-size: 16px;
          border: 1.5px solid #cbd5e1;
          border-radius: 6px;
          resize: vertical;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          font-weight: 500;
          color: #1f2937;
          background-color: #f9fafb;
        }

        .notes-form input::placeholder,
        .notes-form textarea::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        .notes-form input:focus,
        .notes-form textarea:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 8px rgba(79, 70, 229, 0.4);
          background-color: #fff;
          outline: none;
        }

        .notes-form textarea {
          min-height: 100px;
        }

        .notes-form button {
          align-self: flex-start;
          padding: 12px 20px;
          background: #4f46e5;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
        }

        .notes-form button:hover {
          background: #4338ca;
          box-shadow: 0 6px 16px rgba(67, 56, 202, 0.6);
        }

        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          max-width: 900px;
          margin: auto;
        }

        .note-card {
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: Arial, sans-serif;
        }

        .note-card h4 {
          margin: 0 0 10px 0;
          font-weight: 700;
          color: #1e293b;
        }

        .note-card p {
          flex-grow: 1;
          color: #374151;
          margin-bottom: 15px;
          white-space: pre-wrap;
        }

        .note-card button {
          align-self: flex-end;
          padding: 8px 15px;
          background: #dc2626;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
          user-select: none;
        }

        .note-card button:hover {
          background: #b91c1c;
        }
      `}</style>

      <div>
        <form onSubmit={handleAdd} className="notes-form">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Add Note</button>
        </form>

        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note._id} className="note-card">
              <h4>{note.title}</h4>
              <p>{note.content}</p>
              <button onClick={() => onDelete(note._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;