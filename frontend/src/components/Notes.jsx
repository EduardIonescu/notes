import React, { useEffect, useState } from 'react';

function Notes() {
    const [notes, setNotes] = useState([{
        title: '',
        content: ''
    }])

    useEffect(() => {
        fetch('/notes').then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setNotes(jsonRes));
    }, []);

    return <div className='container'>
        <h1>Notes page</h1>
        {notes.map((note, i) =>
            <div key={i}>
                <h1>{note.title}</h1>
                <p>{note.content}</p>
            </div>
        )}
    </div>

}

export default Notes;