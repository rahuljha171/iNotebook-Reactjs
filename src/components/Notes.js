import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = () => {

    const context = useContext(noteContext)
    const { notes, getallNotes } = context;
    useEffect(() => {
        getallNotes()
    }, [])

    return (
        <>
            <AddNote />
            <div className="row">
                <h2>your Notes</h2>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes
