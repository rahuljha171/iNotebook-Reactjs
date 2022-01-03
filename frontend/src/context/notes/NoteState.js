//import react from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://noteappmern.herokuapp.com"

  const notesInitialize = []

  const [notes, setnotes] = useState(notesInitialize)

  const getallNotes = async () => {

    //API call
    const response = await fetch(`${host}/api/notes/fetchallnote`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    setnotes(json)

  }
  //Add Note
  const addNote = async (title, description, tag) => {

    //API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    //   const json = response.json();

    //console.log("Adding a new note");
    const note = await response.json();
    setnotes(notes.concat(note))//push the note in notes and update the states

  }


  //Delete Note
  const deleteNote = async (id) => {
      //API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    const newNote = notes.filter((note) => { return note._id !== id })

    setnotes(newNote);
  }

  //Edit Note

  const editNote = async (id, title, description, tag) => {
    //API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    let newNote= JSON.parse(JSON.stringify(notes))//note after updating the notes
    //logic to edit/update the note
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;

      }
    }
    setnotes(newNote)

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getallNotes }}>
      {props.children}

    </NoteContext.Provider>
  )
}
export default NoteState;