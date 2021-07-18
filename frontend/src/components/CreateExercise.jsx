import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './LogExercise.css';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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

        // Appends new set/array to the old array of sets
        if (reps && weight) {
            setCompletedSets(oldArray => [...oldArray, [reps, weight]]);

            // Reset inputs' values after entering set, kinda useless
            /* 
            document.getElementById('reps').value = '';
            document.getElementById('weight').value = '';
            */

            if (completedSets.length === 0 &&
                document.getElementById('completedTitle').innerHTML === '') {
                document.getElementById('completedTitle').innerHTML +=
                    `<div class='col-12 log-title'>COMPLETED
                </div>
                <hr />`;
            }

        } else {
            alert('Please add reps/weight!');
        }

    }

    addSet();

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
    if (completedSets.length > 0) {
        removeAndDeleteSet();
    }

    function addSet() {
        if (completedSets.length > 0) {
            document.getElementById('completedSets').innerText = '';
            return (completedSets.map((set, i) => {
                return (
                    document.getElementById('completedSets').innerHTML +=
                    `<div class='div-sets row'>
                    <div class='col-11'>
                    <span class='number-sets'>SET ${i + 1}
                    </span> : ${set[0]} Reps @ ${set[1]}kg </div>
                    <div class='col-1'><span class='closed'>x</span></div>
                </div>`)
            })
            );
        }
    }

    function removeAndDeleteSet() {
        var closebtns = document.getElementsByClassName('closed');

        for (let i = 0; i < closebtns.length; i++) {
            closebtns[i].addEventListener('click', () => {
                closebtns[i].parentElement.parentElement.style.display = 'none';
                removeSet(i);
            });
        }
    }

    function removeSet(i) {
        let array = completedSets;

        array.splice(i, 1);
        console.log(i);
        setCompletedSets(array);
        console.dir(completedSets);
    }

    function deleteAllSets(e) {
        e.preventDefault();
        document.getElementById('completedTitle').innerHTML = '';
        document.getElementById('completedSets').innerHTML = '';
        setCompletedSets([]);
    }

    function Example() {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
                <Button
                    id='btn-trash'
                    className='btn btn-circle btn-sm'
                    onClick={handleShow}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Delete all?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete all sets? This cannot be undone!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={deleteAllSets}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
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
                    id='completedTitle'
                    className='col-12'
                ></div>
                <div
                    id='completedSets'
                    className='col-12'
                ></div>

                <Example />

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