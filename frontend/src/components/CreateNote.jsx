import React, { useState } from 'react';

function CreateNote() {
    const [input, setInput] = useState({
        title: '',
        content: ''
    })

    function handleChange(event) {
        const { name, value } = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    async function handleClick(event) {
        event.preventDefault()
        const result = await fetch('http://localhost:9000/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: input.title,
                content: input.content
            })
        }).then((res) => res.json())

        if (result.status === 'ok') {
            //everything went fine
            alert('Success');
        } else {
            alert(result.error);
        }
    }
    return (
        <div className='container'>
            <h1>Create Note page</h1>
            <form >
                <div className='form-group'>
                    <input
                        onChange={handleChange}
                        className='form-control'
                        name='title'
                        value={input.title}
                        autoComplete='off'
                        placeholder='Note Title'></input>
                </div>
                <div className='form-group'>
                    <textarea
                        onChange={handleChange}
                        className='form-control'
                        name='content'
                        value={input.content}
                        autoComplete='off'
                        placeholder='Note Content'></textarea>
                </div>
                <button
                    onClick={handleClick}
                    className='btn btn-lg btn-info'>
                    ADD NOTE</button>

            </form>
        </div>
    )
}

export default CreateNote;