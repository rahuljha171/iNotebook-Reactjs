import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = () => {

    const context = useContext(noteContext)
    const { notes, getallNotes,editNote } = context;
    const [note, setnote] = useState({ id:"", etitle: "", edescription: "", etag: "" })

    useEffect(() => {
        getallNotes()
        // eslint-disable-next-line 
    }, [])
    const ref = useRef(null);
    const refclose = useRef(null);


    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({id:currentNote._id, etitle:currentNote.title , edescription:currentNote.description, etag:currentNote.tag});
    }
    // eslint-disable-next-line
    const handleclick = (e) => {
        //e.preventDefault();
        console.log("update the note",note);
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refclose.current.click();
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })

    }
    return (
        <>
            <AddNote />
            {/* <!-- Button trigger modal --> */}

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-etitle" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h2>your Notes</h2>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes
