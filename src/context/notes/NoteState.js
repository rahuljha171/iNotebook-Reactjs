//import react from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const notesInitialize = []
  
  const [notes, setnotes] = useState(notesInitialize)

  const getallNotes = async () => {

    //API call
    const response = await fetch(`${host}/api/notes/fetchallnote`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5NjRiYzg4YTc5YjdlOGE2Mzg5MDVjIn0sImlhdCI6MTYzNzIzOTc1Mn0.6ZrSkA3n0Vjk4hZzM0CTzLcZKhJE3K-DB8OyB-QhJoY'

      },
     // body: JSON.stringify({title,description,tag})
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
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5NjRiYzg4YTc5YjdlOGE2Mzg5MDVjIn0sImlhdCI6MTYzNzIzOTc1Mn0.6ZrSkA3n0Vjk4hZzM0CTzLcZKhJE3K-DB8OyB-QhJoY'
  
        },
        body: JSON.stringify({title,description,tag})
      });
   //   const json = response.json();

    console.log("Adding a new note");
    const note = {
      "_id": "6198e970fee5fe9d669def86",
      "user": "61964bc88a79b7e8a638905c",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-11-20T12:26:24.073Z",
      "__v": 0
    };
    setnotes(notes.concat(note))//push the note in notes and update the states

  }


  //Delete Note
  const deleteNote = (id) => {
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5NjRiYzg4YTc5YjdlOGE2Mzg5MDVjIn0sImlhdCI6MTYzNzIzOTc1Mn0.6ZrSkA3n0Vjk4hZzM0CTzLcZKhJE3K-DB8OyB-QhJoY'

      },
      body: JSON.stringify({title,description,tag})
    });
    //const json= response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }


    }

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getallNotes }}>
      {props.children}

    </NoteContext.Provider>
  )
}
export default NoteState;