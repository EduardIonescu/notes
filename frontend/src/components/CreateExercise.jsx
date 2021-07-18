import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './LogExercise.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CreateExercise() {
    const [completedSets, setCompletedSets] = useState([]);
    const [input, setInput] = useState({
        title: '',
        content: '',
    });

    const [startDate, setStartDate] = useState(new Date());

    function handleChange(event) {
        const { name, value } = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    function addCompletedSet(e) {
        e.preventDefault();
        const reps = document.getElementById('reps').value;
        const weight = document.getElementById('weight').value;

        setCompletedSets(oldArray => [...oldArray, [reps, weight]]);
        console.log(completedSets);
        document.getElementById('reps').value = '';
        document.getElementById('weight').value = '';
    }

    async function handleClick(event) {
        event.preventDefault()
        if (input.title !== '') {
            const result = await fetch('http://localhost:9000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: startDate,
                    title: input.title,
                    sets: completedSets,
                    content: input.content
                })
            }).then((res) => res.json())

            if (result.status === 'ok') {
                //everything went fine
                alert('Success');
            } else {
                alert(result.error);
            }
        } else {
            alert('Please enter exercise');
        }
    }
    return (
        <div className='container'>
            <h1>Log Exercise</h1>
            <form>
                <div className="col-12 log-title">DATE</div>
                <hr />
                <div className='form-group'>
                    <DatePicker
                        className='form-control'
                        dateFormat='dd/MM/yyyy'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)} />
                </div>
                <div className="col-12 log-title">EXERCISE</div>
                <hr />
                <div className='form-group'>
                    <input
                        onChange={handleChange}
                        className='form-control'
                        name='title'
                        value={input.title}
                        autoComplete='off'
                        placeholder='Exercise'></input>
                </div>
                <div className="col-12 log-title">SET</div>
                <hr />
                <div className="form-group row">
                    <div className="col">
                        <input
                            id='reps'
                            type="number"
                            className='form-control'
                            placeholder='Reps' />
                    </div>
                    <div className="col-1">reps @</div>
                    <div className="col">
                        <input
                            id='weight'
                            type="number"
                            className='form-control'
                            placeholder='Weight' />
                    </div>
                    <div className="col-1 text-center">
                        <button
                            className='btn btn-circle btn-sm'
                            onClick={addCompletedSet}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
                <div
                    id='completedSets'
                    className='col-12'
                ></div>
                <div className="col-12 log-title">NOTE</div>
                <hr />
                <div className='form-group'>
                    <textarea
                        onChange={handleChange}
                        className='form-control'
                        name='content'
                        value={input.content}
                        autoComplete='off'></textarea>
                </div>
                <button
                    onClick={handleClick}
                    className='btn btn-lg btn-submit'>
                    ADD EXERCISE</button>

            </form>
        </div>
    )
}

export default CreateExercise;