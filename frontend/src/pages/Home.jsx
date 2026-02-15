import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Note.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getNotes();
  }, []);

  const startEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const getNotes = () => {
    api
      .get("notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`notes/delete/${id}`)
      .then((res) => {
        if (res.status === 204) alert("note was deleted");
        else alert("Faield to delete note");
        if (id === editingId) {
          setContent("");
          setTitle("");
          setEditingId(null);
        }
        getNotes();
      }) // revvert titile and content and editing id
      .catch((err) => alert(err));
  };

  const updateNote = (e) => {
    e.preventDefault();
    api
      .put(`notes/update/${editingId}`, { title, content })
      .then((res) => {
        if (res.status === 200) {
          alert("Note has been updated");
          setContent("");
          setTitle("");
          setEditingId(null);
          getNotes();
        } else {
          alert("Faield to update note.");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note has been created!");
          setContent("");
          setTitle("");
        } else alert("Faield to make note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <div className="todo-container">
        <h2>Create Note</h2>
        <form onSubmit={editingId ? updateNote : createNote}>
          <label htmlFor="title">
            <b>Title:</b>
          </label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            required
            className="form-input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <br />
          <label htmlFor="content">
            <b>Content:</b>
          </label>
          <br />

          <textarea
            name="content"
            id="content"
            required
            className="form-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <br />
          <input type="submit" value="Submit" className="form-button" />
        </form>
      </div>

      <div>
        {notes.map((note) => (
          <Note
            note={note}
            deleteNote={deleteNote}
            startEdit={startEdit}
            key={note.id}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
